import { isToday, isThisWeek, addDays } from "date-fns";

export const groupTasksByDate = (tasks) => {
  const today = [];
  const thisWeek = [];
  const future = [];

  tasks.forEach((task) => {
    const dueDate = new Date(task.due_date);
    const currentDate = new Date();

    if (isToday(dueDate)) {
      today.push(task);
    } else if (isThisWeek(dueDate)) {
      thisWeek.push(task);
    } else if (dueDate > currentDate) {
      future.push(task);
    }
  });

  return { "Сегодня": today, "Эта неделя": thisWeek, "В будущем": future };
};

export const groupTasksByAssignee = (tasks) => {
  return tasks.reduce((groups, task) => {
    const assigneeName = `${task.assignee.first_name} ${task.assignee.last_name}`;
    if (!groups[assigneeName]) {
      groups[assigneeName] = [];
    }
    groups[assigneeName].push(task);
    return groups;
  }, {});
};