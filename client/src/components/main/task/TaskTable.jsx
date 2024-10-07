import React, { useState, useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { TableContainer, Paper, Table } from '@mui/material';
import { tableContainer, table } from '../../../style/task/taskStyle.js';

import TaskTableHeader from './TaskTableHeader.jsx';
import TaskTableBody from './TaskTableBody/TaskTableBody.jsx';
import { sortData, handleSortChange } from '../../../utils/task/sortTable.js';
import { columnsTask } from '../../../utils/task/columnsTask.js';
import { Context } from "../../../index.js";
import { groupTasksByDate, groupTasksByAssignee } from '../../../utils/task/groupTable.js';

const TaskTable = observer(({ groupMode }) => {
  const { task } = useContext(Context);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('updatedAt');
  const [expandedGroups, setExpandedGroups] = useState({});

  const tasks = task?.tasks || [];
  const columns = columnsTask || [];

  const handleSort = (column) => {
    handleSortChange(column, order, orderBy, setOrder, setOrderBy);
  };

  const sortedTasks = useMemo(() => sortData(tasks, order, orderBy), [tasks, order, orderBy]);

  const groupedTasks = useMemo(() => {
    if (groupMode === 'byDate') {
      return groupTasksByDate(sortedTasks);
    } else if (groupMode === 'byAssignee') {
      return groupTasksByAssignee(sortedTasks);
    }
    return { "Список всех задач": sortedTasks };
  }, [groupMode, sortedTasks]);

  const toggleGroupVisibility = (groupKey) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };
  
  return (
    <TableContainer component={Paper} sx={tableContainer}>
      <Table aria-label="sortable table" sx={table}>
        <TaskTableHeader
          columns={columns}
          orderBy={orderBy}
          order={order}
          handleSort={handleSort}
        />
        <TaskTableBody
          groupedTasks={groupedTasks}
          expandedGroups={expandedGroups}
          toggleGroupVisibility={toggleGroupVisibility}
        />
      </Table>
    </TableContainer>
  );
});

export default TaskTable;
