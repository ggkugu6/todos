import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import TaskStore from "./store/TaskStore";
import { Box } from '@mui/material';
import { pageTitleStyle, globalTextStyle } from './style/Main.js'

export const Context = createContext(null) 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value = {{user: new UserStore(),
                              task: new TaskStore()}}>
    <Box sx={{ ...pageTitleStyle, ...globalTextStyle }}>
      <App />
    </Box>
  </Context.Provider>
);
