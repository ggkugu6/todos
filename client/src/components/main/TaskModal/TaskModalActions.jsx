import React from 'react';
import { Stack, Button } from '@mui/material';
import { globalButtonStyle } from '../../../style/Main.js';

const TaskModalActions = ({ onSave, onClose, isEditMode }) => (
  <Stack direction="row" spacing={2} justifyContent="flex-end">
    <Button variant="contained" color="primary" sx={globalButtonStyle} onClick={onSave}>
      {isEditMode ? 'Сохранить изменения' : 'Создать задачу'}
    </Button>
    <Button variant="contained" color="primary" sx={globalButtonStyle} onClick={onClose}>
      Отмена
    </Button>
  </Stack>
);

export default TaskModalActions;
