import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { globalInputStyle } from '../../../style/Main.js';

const TaskSelectField = ({ label, value, onChange, items, disabled = false, fieldName = 'name' }) => (
  <FormControl fullWidth margin="normal">
    <InputLabel >{label}</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      sx={globalInputStyle}
      disabled={disabled}
    >
      {items.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item[fieldName]}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default TaskSelectField;
