import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from '../..';
import Task from '../../page/Task';
import Auth from '../../page/Auth';
import { MAIN_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const { user } = useContext(Context);

    useEffect(() => {
        const checkAuth = async () => {
            await user.check();
        };
        checkAuth();
    }, [user]);

    if (user.loading) {
        return <div>Загрузка...</div>;
    }

    // Если нет авторизован или токена
    if (!user.isAuth) {
        return (
            <Routes>
                <Route path={LOGIN_ROUTE} element={<Auth />} />
                <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
            </Routes>
        );
    }

    // Если пользователь авторизован
    return (
        <Routes>
            <Route path={MAIN_ROUTE} element={<Task />} />
            <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;
