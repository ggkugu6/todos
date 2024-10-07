import { makeAutoObservable } from 'mobx'
import { createTask, putTask, getTask, getStatus, getPriority } from '../http/taskAPI';
export default class TaskStore {
    constructor() {
        this._tasks = []
        this._statuses = []
        this._priorities = []
        this._error = null;
        makeAutoObservable(this)
    }

    // Сеттер и геттер для задач
    setTask(tasks) {
        this._tasks = tasks
    }
    get tasks() {
        return this._tasks
    }
    // Сеттер и геттер для статусов
    setStatuses(statuses) {
        this._statuses = statuses
    }
    get statuses() {
        return this._statuses
    }
    // Сеттер и геттер для приоритетов
    setPriorities(priorities) {
        this._priorities = priorities
    }
    get priorities() {
        return this._priorities
    }

  // Сеттер и геттер для ошибок
  setError(error) {
    this._error = error;
  }
  get error() {
    return this._error;
  }

  // Метод для создания новой задачи
  async createTask(taskData) {
    try {
      const newTask = await createTask(taskData);
      this._tasks.push(newTask); 
      this.setError(null); 
    } catch (error) {
      this.setError('Ошибка при создании задачи'); 
    }
  }

  // Метод для обновления задачи
  async updateTask(taskData) {
    try {
      const updatedTask = await putTask(taskData);
      const index = this._tasks.findIndex((task) => task.id === taskData.id);
      if (index !== -1) {
        this._tasks[index] = updatedTask;
      }
      this.setError(null);
    } catch (error) {
      this.setError('Ошибка при обновлении задачи');
    }
  }

  // Метод для загрузки всех задач
  async loadTasks() {
    try {
      const tasks = await getTask();
      this.setTask(tasks);
      this.setError(null);
    } catch (error) {
      this.setError('Ошибка при загрузке задач');
    }
  }

  // Метод для загрузки статусов
  async loadStatuses() {
    try {
      const statuses = await getStatus();
      this.setStatuses(statuses);
      this.setError(null);
    } catch (error) {
      this.setError('Ошибка при загрузке статусов');
    }
  }

  // Метод для загрузки приоритетов
  async loadPriorities() {
    try {
      const priorities = await getPriority();
      this.setPriorities(priorities);
      this.setError(null);
    } catch (error) {
      this.setError('Ошибка при загрузке приоритетов');
    }
  }
}
