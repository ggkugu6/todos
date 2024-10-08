import React from 'react';
import { TableRow, TableCell, IconButton, Collapse, Table, TableBody } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TaskRow from './TaskRow.jsx';

const TaskGroup = ({ groupLabel, tasks, isExpanded, onToggle, onTaskClick }) => (
  <React.Fragment key={groupLabel}>
    {/* Заголовок */}
    <TableRow>
      <TableCell colSpan={6} style={{ fontWeight: 'bold'}}>
        <IconButton onClick={onToggle}>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        {groupLabel}
      </TableCell>
    </TableRow>

    {/* Список задач в группе */}
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Table>
            <TableBody>
              {tasks.map((task) => (
                <TaskRow key={task.id} task={task} onTaskClick={onTaskClick} />
              ))}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  </React.Fragment>
);

export default TaskGroup;
