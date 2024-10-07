import React from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ru from 'date-fns/locale/ru';
import { TextField } from '@mui/material';
import { globalDateStyle } from '../../../style/Main.js';

const TaskDatePicker = ({ value, onChange, disabled }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru} sx={globalDateStyle}>
    <DateTimePicker
      label="Дата и время окончания"
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
      disabled={disabled}
      sx={globalDateStyle}
    />
  </LocalizationProvider>
);

export default TaskDatePicker;
