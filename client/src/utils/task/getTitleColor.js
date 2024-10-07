// определение цвета задачи
export const getTitleColor = (task) => {
    const now = new Date();
    const dueDate = new Date(task.due_date);
    const isOverdue = dueDate < now;
    const isCompleted = task.status?.id === 3 /*выполнено*/;
  
    if (isCompleted) {
      return 'green'; // завершенные задачи  зеленым цветом
    } else if (!isCompleted && isOverdue) {
      return 'red'; // незавершенные задачи с просроченной датой  красный цвет
    } else {
      return 'gray'; // остальные задачи  серым цветом
    }
  };
  