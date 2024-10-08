// определение цвета задачи
export const getTitleColor = (task) => {
    const now = new Date();
    const dueDate = new Date(task.due_date);
    const isOverdue = dueDate < now;
    const isCompleted = task.status?.id === 3 /*выполнено*/;
  
    if (isCompleted) {
      return 'green'; 
    } else if (!isCompleted && isOverdue) {
      return 'red'; 
    } else {
      return 'gray';
    }
  };
  