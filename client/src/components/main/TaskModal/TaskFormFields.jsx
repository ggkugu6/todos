import React from 'react';
import { TextField } from '@mui/material';
import TaskSelectField from './TaskSelectField.jsx';
import TaskDatePicker from './TaskDatePicker.jsx';
import { globalInputStyle } from '../../../style/Main.js';

const TaskFormFields = ({
  formValues,
  handleChange,
  priorities,
  users,
  statuses,
  canEditTask
}) => (
  <>
    <TextField
      fullWidth
      margin="normal"
      label="Заголовок"
      value={formValues.title}
      onChange={handleChange('title')}
      disabled={!canEditTask}
      sx={globalInputStyle}
    />
    <TextField
      fullWidth
      margin="normal"
      label="Описание"
      multiline
      rows={4}
      value={formValues.description}
      onChange={handleChange('description')}
      disabled={!canEditTask}
      sx={globalInputStyle}
    />
    <TaskSelectField
      label="Приоритет"
      value={formValues.priority_id}
      onChange={handleChange('priority_id')}
      items={priorities}
      disabled={!canEditTask}
    />
    <TaskDatePicker
      value={formValues.dueDate}
      onChange={handleChange('dueDate')}
      disabled={!canEditTask}
    />
    <TaskSelectField
      label="Ответственный"
      value={formValues.assignee_id}
      onChange={handleChange('assignee_id')}
      items={users}
      disabled={!canEditTask}
      fieldName="first_name"
    />
    <TaskSelectField
      label="Статус"
      value={formValues.status_id}
      onChange={handleChange('status_id')}
      items={statuses}
    />
  </>
);

export default TaskFormFields;
