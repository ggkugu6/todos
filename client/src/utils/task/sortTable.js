// Функция для сортировки
export const sortData = (tasks, order, orderBy) => {
    if (!order || !orderBy) return tasks;
  
    return [...tasks].sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];
  
      const isDateA = !isNaN(new Date(valueA).getTime());
      const isDateB = !isNaN(new Date(valueB).getTime());
  
      const valueToCompareA = isDateA ? new Date(valueA) : valueA;
      const valueToCompareB = isDateB ? new Date(valueB) : valueB;
  
      if (valueToCompareA === undefined || valueToCompareB === undefined) {
        return 0; 
      }
  
      if (order === 'asc') {
        return valueToCompareA < valueToCompareB ? -1 : 1;
      } else {
        return valueToCompareA > valueToCompareB ? -1 : 1;
      }
    });
  };
  
  
  // Функция для обработки смены направления сортировки
  export const handleSortChange = (column, order, orderBy, setOrder, setOrderBy) => {
    if (orderBy === column) {
      setOrder(order === 'asc' ? 'desc' : order === 'desc' ? null : 'asc');
      setOrderBy(order === 'desc' ? null : column);
    } else {
      setOrder('asc');
      setOrderBy(column);
    }
  };
  