import { $host } from ".";

export const createTask = async (task) => {
  try {
    const { data } = await $host.post('api/tasks', task);
    return data;
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    throw error;  // Пробрасываем ошибку дальше
  }
};

export const getTask = async () => {
  try {
    const { data } = await $host.get('api/tasks');
    return data;
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    throw error;
  }
};

export const getStatus = async () => {
  try {
    const { data } = await $host.get('api/tasks/statuses');
    return data;
  } catch (error) {
    console.error("Ошибка при получении статусов:", error);
    throw error;
  }
};

export const getPriority = async () => {
  try {
    const { data } = await $host.get('api/tasks/priorities');
    return data;
  } catch (error) {
    console.error("Ошибка при получении приоритетов:", error);
    throw error;
  }
};

export const putTask = async (task) => {
  console.log(task);
  try {
    const { data } = await $host.put(`api/tasks/${task.id}`, task);
    return data;
  } catch (error) {
    console.error("Ошибка при обновлении задач:", error);
    throw error;
  }
};
