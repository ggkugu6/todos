import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { getTitleColor } from "../../../../utils/task/getTitleColor.js";
import { formatDate } from '../../../../utils/task/formatDate.js';
import { tableHeaderStyles  } from '../../../../style/task/taskStyle.js';

const TaskRow = ({ task, onTaskClick }) => (
  <TableRow key={task.id} hover style={{ cursor: 'pointer' }} onClick={() => onTaskClick(task.id)}>
    <TableCell sx={tableHeaderStyles.id}>{task.id}</TableCell>
    <TableCell sx={{ ...tableHeaderStyles.title, color: getTitleColor(task) }}>{task.title}</TableCell>
    <TableCell sx={tableHeaderStyles.priority}>{task.priority?.name || ''}</TableCell>
    <TableCell sx={tableHeaderStyles.dueDate}>{formatDate(task.due_date)}</TableCell>
    <TableCell sx={tableHeaderStyles.assignee}>
      {`${task.assignee?.first_name || ''} ${task.assignee?.last_name || ''}`}
    </TableCell>
    <TableCell sx={tableHeaderStyles.status}>{task.status?.name || ''}</TableCell>
  </TableRow>
);

export default TaskRow;
