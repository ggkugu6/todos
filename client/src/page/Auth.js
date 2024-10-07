import React from 'react';
import { Box, Typography, Container, Button, CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useAuthForm } from '../hooks/useAuthForm';
import ErrorNotification from '../components/error/ErrorNotification';
import AuthForm from '../components/auth/AuthForm';
import {
    globalContainerStyle,
    authContainerStyle,
    logoStyle,
    titleStyle,
    toggleButtonStyle,
} from '../style/auth/AuthStyles';

const Auth = observer(() => {
    const {
        formState,
        loading,
        errorMessage,
        isFormValid,
        handleChange,
        handleSubmit,
        setFormState
    } = useAuthForm();

    const toggleFormMode = () => {
        setFormState(prevState => ({
            ...prevState,
            isLogin: !prevState.isLogin,
        }));
    };
    const renderTitle = () => formState.isLogin ? 'Войдите' : 'Регистрация';
    const renderToggleButtonText = () => formState.isLogin ? 'Зарегистрироваться' : 'Войти';

    return (
        <Container maxWidth="sm" sx={globalContainerStyle}>
            <ErrorNotification errorMessage={errorMessage} />
            
            <Box sx={authContainerStyle}>
                <Box component="img" src="wizard-svgrepo-com.svg" alt="Logo" sx={logoStyle} />
                
                <Typography variant="h5" gutterBottom sx={titleStyle}>
                    {renderTitle()}
                </Typography>

                <AuthForm
                    formState={formState}
                    loading={loading}
                    isFormValid={isFormValid}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
                
                <Button
                    sx={toggleButtonStyle}
                    onClick={toggleFormMode}
                >
                    {renderToggleButtonText()}
                </Button>

                {loading && <CircularProgress />}
            </Box>
        </Container>
    );
});

export default Auth;
