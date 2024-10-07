import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ErrorNotification = ({ errorMessage }) => {
    const [open, setOpen] = useState(!!errorMessage);

    useEffect(() => {
        if (errorMessage) {
            setOpen(true);
        }
    }, [errorMessage]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}>
            <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
        </Snackbar>
    );
};

export default ErrorNotification;
