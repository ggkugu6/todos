import React from 'react';
import { Button, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { globalButtonStyle } from '../../style/Main.js'
import { inputFieldStyle } from '../../style/auth/AuthStyles';

const AuthForm = observer(({ formState, loading, isFormValid, handleChange, handleSubmit }) => {
    return (
        <form autoComplete="on" onSubmit={handleSubmit}>
            {!formState.isLogin && (
                <TextField
                    name="email"
                    type="text"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formState.email}
                    onChange={handleChange}
                    sx={inputFieldStyle}
                    autoComplete="off"
                />
            )}
            
            <TextField
                name="username"
                type="text"
                label="Логин"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formState.username}
                onChange={handleChange}
                sx={inputFieldStyle}
                autoComplete="off"
            />
            
            <TextField
                name="password"
                label="Пароль"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={formState.password}
                onChange={handleChange}
                sx={inputFieldStyle}
                autoComplete="off"
            />
            
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={globalButtonStyle}
                disabled={!isFormValid || loading}
            >
                {loading ? 'Загрузка...' : formState.isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
        </form>
    );
});

export default AuthForm;
