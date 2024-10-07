import React, { useEffect, useState, useCallback } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, ButtonGroup } from '@mui/material';
import { globalButtonStyle, globalGroupButtonStyle } from '../../../style/Main.js';
import { appBarStyle, logoSizeStyle, positionTextStyle } from '../../../style/NavBar/NavBarStyle';
import TaskModal from '../TaskModal/TaskModal.jsx';

const Navbar = ({ onGroupChange }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState("all");
    const [isLoggedOut, setLoggedOut] = useState(false);

    const toggleModal = (isOpen) => setModalOpen(isOpen);

    const handleCreateTask = () => toggleModal(true);
    
    const handleSaveTask = () => toggleModal(false);

    const handleModeChange = (mode) => {
        setViewMode(mode);
        onGroupChange(mode);
    };

    const logOut = useCallback(() => {
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
            setLoggedOut(true);
        }
    }, []);

    useEffect(() => {
        if (isLoggedOut) {
            window.location.reload();
        }
    }, [isLoggedOut]);

    return (
        <AppBar position="static" color="inherit" sx={appBarStyle}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Box component="img" src="spellbook-svgrepo-com.svg" alt="Logo" sx={logoSizeStyle} />
                </IconButton>
                <Typography variant="h6" style={positionTextStyle}>
                    TODO list
                </Typography>
                <Button color="inherit" sx={globalButtonStyle} onClick={handleCreateTask}>
                    Новая задача
                </Button>
                <ButtonGroup sx={globalButtonStyle}>
                    <Button sx={globalGroupButtonStyle} onClick={() => handleModeChange("all")}>Все задачи</Button>
                    <Button sx={globalGroupButtonStyle} onClick={() => handleModeChange("byDate")}>По дате завершения</Button>
                    <Button sx={globalGroupButtonStyle} onClick={() => handleModeChange("byAssignee")}>По ответственным</Button>
                </ButtonGroup>
                <Button color="inherit" sx={globalButtonStyle} onClick={logOut}>
                    Выход
                </Button>
            </Toolbar>
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => toggleModal(false)}
                onSave={handleSaveTask}
            />
        </AppBar>
    );
};

export default Navbar;
