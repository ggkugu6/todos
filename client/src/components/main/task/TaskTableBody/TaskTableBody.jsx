import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { TableBody, TableRow, TableCell } from '@mui/material';
import TaskGroup from './TaskGroup.jsx';
import TaskModal from '../../TaskModal/TaskModal.jsx';

const TaskTableBody = observer(({ groupedTasks }) => {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Открытие/закрытие модального окна
  const handleOpenModal = (taskId) => {
    setSelectedTaskId(taskId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTaskId(null);
  };

  useEffect(() => {
    // Все группы раскрыты по дефолту
    const initialExpandedState = Object.keys(groupedTasks).reduce((acc, groupKey) => {
      acc[groupKey] = true;
      return acc;
    }, {});
    setExpandedGroups(initialExpandedState);
  }, [groupedTasks]);

  // Переключ видимости групп
  const toggleGroupVisibility = (groupKey) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  return (
    <TableBody>
      {/* Если есть данные отображаем их с групп */}
      {Object.keys(groupedTasks).length > 0 ? (
        Object.entries(groupedTasks).map(([groupLabel, tasks]) => (
          <TaskGroup
            key={groupLabel}
            groupLabel={groupLabel}
            tasks={tasks}
            isExpanded={expandedGroups[groupLabel]}
            onToggle={() => toggleGroupVisibility(groupLabel)}
            onTaskClick={handleOpenModal}
          />
        ))
      ) : (
        <TableRow>
          <TableCell align="center">Данные не найдены</TableCell>
        </TableRow>
      )}

      {/* Модалка для редактирования задачи */}
      {selectedTaskId && (
        <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} taskId={selectedTaskId} onSave={handleCloseModal} />
      )}
    </TableBody>
  );
});

export default TaskTableBody;
