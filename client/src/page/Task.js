import React, { useEffect, useContext, useState } from 'react';
import Navbar from '../components/main/NavBar/NavBar.jsx';
import TaskList from '../components/main/task/TaskTable.jsx';
import { Context } from '..';
import { getPriority, getStatus, getTask } from '../http/taskAPI';
import { getUser, check } from '../http/userAPI';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
    const { task, user } = useContext(Context);
    const [groupMode, setGroupMode] = useState('all');
    
    useEffect(() => {
        if (!task || !user) {
            throw new Error('Ошибка при получении данных');
        }

        getTask().then(data => task.setTask(data)).catch(error => {
            console.error('Ошибка: ', error);
        });

        getUser().then(data => user.setUser(data)).catch(error => {
            console.error('Ошибка: ', error);
        });

        getStatus().then(data => task.setStatuses(data)).catch(error => {
            console.error('Ошибка: ', error);
        });

        getPriority().then(data => task.setPriorities(data)).catch(error => {
            console.error('Ошибка: ', error);
        });

        check().then(data => user.setCurrentUser(data)).catch(error => {
            console.error('Ошибка: ', error);
        })

    }, [task, user]);

    const handleGroupChange = (mode) => {
      setGroupMode(mode);
    };

    return (
        <div>
          <Navbar onGroupChange={handleGroupChange} />
          <TaskList groupMode={groupMode} />
        </div>
      );
    });

export default App;