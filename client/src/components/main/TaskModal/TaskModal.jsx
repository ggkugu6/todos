import React, { useState, useEffect, useContext } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { Context } from '../../../index.js';
import TaskFormFields from './TaskFormFields.jsx';
import TaskModalActions from './TaskModalActions.jsx';
import { globalTextStyle } from '../../../style/Main.js';
import { modalStyle } from '../../../style/modal/ModalStyle.js'; 

const TaskModal = ({ isOpen, onClose, taskId, onSave }) => {
  const { task, user } = useContext(Context);

  const [loading, setLoading] = useState(true);

  const currentCreatorUser = user?.currentUser || [];
  const taskData = taskId ? task.tasks.find((task) => task.id === taskId) : null;
  const users = Array.isArray(user?.user) ? user.user : [];
  
  const [currentUser, setCurrentUser] = useState(null);

  // Если данные пользователя undefined, подождем загрузки
  useEffect(() => {
    if (users && user?.currentUser?.id) {
      const foundUser = users.find((usr) => usr.id === user.currentUser.id);
      if (foundUser) {
        setCurrentUser(foundUser);
      }
    }
    setLoading(false);
  }, [user.currentUser]);

  const subordinates = currentUser?.subordinates || [];
  const priorities = task?.priorities || [];
  const statuses = task?.statuses || [];
  const isAssignedToSubordinate = subordinates.some((sub) => sub.id === taskData?.assignee_id);
  const canEditTask = isAssignedToSubordinate || !taskData || taskData.creator_id === currentUser?.id;

  const initialFormValues = {
    title: '',
    description: '',
    priority_id: '',
    dueDate: null,
    assignee_id: '',
    status_id: '',
    creator_id: currentCreatorUser.id,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    if (taskData) {
      setFormValues({
        title: taskData.title || '',
        description: taskData.description || '',
        priority_id: taskData.priority?.id || '',
        dueDate: taskData.due_date ? new Date(taskData.due_date) : null,
        assignee_id: taskData.assignee_id || '',
        status_id: taskData.status?.id || '',
        creator_id: taskData.creator_id || currentUser?.id || '',
      });
    } else {
      setFormValues(initialFormValues);
    }
  }, [taskData, currentUser]);

  const handleChange = (field) => (event) => {
    const value = event.target ? event.target.value : event;
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };
  const handleSave = async () => {
    if (taskData) {
      await task.updateTask({ id: taskId, ...formValues });
    } else {
      await task.createTask(formValues);
    }
    onSave();
    onClose();
  };

  if (loading) {
    // пока данные не загрузились
    return <div>Загрузка данных...</div>;
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography sx={globalTextStyle}>
          {taskData ? 'Редактировать задачу' : 'Создать задачу'}
        </Typography>
        <TaskFormFields
          formValues={formValues}
          handleChange={handleChange}
          priorities={priorities}
          users={users}
          statuses={statuses}
          canEditTask={canEditTask}
        />
        <TaskModalActions onSave={handleSave} onClose={onClose} isEditMode={!!taskData} />
      </Box>
    </Modal>
  );
};

export default TaskModal;