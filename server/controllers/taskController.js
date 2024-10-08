const { models } = require('../models/sequelize_connect');
const { tasks, users, task_statuses, task_priorities } = models;

class TaskController {
  // Создание новой задачи
  async createTask(data) {
    if (!data || !data.title || !data.priority_id || !data.status_id  || !data.assignee_id) {
      throw new Error('Не все обязательные данные предоставлены для создания задачи');
    }
    console.log(data);
    try {
      const newTask = await tasks.create({
        title: data.title,
        description: data.description || '',
        due_date: data.dueDate || null,
        priority_id: data.priority_id,
        status_id: data.status_id,
        creator_id: data.creator_id || null,
        assignee_id: data.assignee_id
      });
      return newTask;
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
      throw error;
    }
  }

  // Получение списка всех задач
  async getTasks( filter = {} ) {
    try {

      const tasksAll = await tasks.findAll({ ...filter,
        include: [
          { model: task_statuses, as: 'status' },  
          { model: task_priorities, as: 'priority' }, 
          { model: users, as: 'creator' },         
          { model: users, as: 'assignee' }           
        ]
      });
      return tasksAll;
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
      throw error;
    }
  }

  // Получение списка статусов
  async getTaskStatuses() {
    try {
      const taskStatuses = await task_statuses.findAll();
      return taskStatuses;
    } catch (error) {
      console.error("Ошибка при получении статусов задач:", error);
      throw error;
    }
  }

  // Получение списка приоритетов
  async getTaskPriorities() {
    try {
      const taskPriorities = await task_priorities.findAll();
      return taskPriorities;
    } catch (error) {
      console.error("Ошибка при получении приоритетов задач:", error);
      throw error;
    }
  }

  // Получение одной задачи по ID
  async getOneTask(id) {
    try {
      const taskData = await tasks.findByPk(id, {
        include: [
          { model: task_statuses, as: 'status' },   
          { model: task_priorities, as: 'priority' }, 
          { model: users, as: 'creator' },         
          { model: users, as: 'assignee' }     
        ]
      });
      if (!taskData) {
        throw new Error('Задача не найдена');
      }
      return taskData;
    } catch (error) {
      console.error(`Ошибка при получении задачи с ID ${id}:`, error);
      throw error;
    }
  }

  // Обновление данных задачи
  async updateTask(id, data) {
    if (!id || !data) {
      throw new Error('ID задачи или обновляемые данные не предоставлены');
    }
    try {
      const taskToUpdate = await tasks.findByPk(id);
      if (!taskToUpdate) {
        throw new Error(`Задача с ID ${id} не найдена`);
      }
      const updatedTask = await taskToUpdate.update({
        title: data.title,
        description: data.description || '',
        due_date: data.dueDate || null,
        priority_id: data.priority_id,
        status_id: data.status_id,
        creator_id: data.creator_id || '',
        assignee_id: data.assignee_id
      });
      return updatedTask;
    } catch (error) {
      console.error(`Ошибка при обновлении задачи с ID ${id}:`, error);
      throw error;
    }
  }

}

module.exports = new TaskController();
