import React from 'react';
import { observer } from 'mobx-react-lite';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { headerCell, tableHeaderStyles } from '../../../style/task/taskStyle.js';

const TaskTableHeader = observer(({ columns, order, orderBy, handleSort }) => {
    return (
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.field} sx={{...headerCell, ...tableHeaderStyles[column.field]}}>
              <TableSortLabel
                active={orderBy === column.field}
                direction={orderBy === column.field ? order : 'asc'}
                onClick={() => handleSort(column.field)}
              >
                {column.headerName}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  });
  
  export default TaskTableHeader;
