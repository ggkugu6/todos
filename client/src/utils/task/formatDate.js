import { format } from "date-fns";

// Функция для форматирования даты
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return format(date, 'yyyy-MM-dd HH:mm');
};
