import { useState, useMemo, useContext, useCallback } from 'react';
import { login as loginUser, registration } from "../http/userAPI";
import { Context } from "..";

export const useAuthForm = () => {
    const { user } = useContext(Context); // Получаем контекст пользователя

    const [formState, setFormState] = useState({
        email: '',
        password: '',
        username: '',
        isLogin: true,
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const isFormValid = useMemo(() => {
        const { email, password, username, isLogin } = formState;
        return isLogin
            ? username && password
            : email && password && username;
    }, [formState]);

    const authenticateUser = useCallback(async () => {
        const { isLogin, email, password, username } = formState;
        return isLogin
            ? loginUser(username, password)  // Логин
            : registration(email, password, username);  // Регистрация
    }, [formState]);

    const handleSubmit = async (event) => {
        event?.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const data = await authenticateUser();
            user.setUser(data.user); // Устанавливаем данные пользователя
            user.setIsAuth(true);  // Устанавливаем аутентификацию
        } catch (error) {
            setErrorMessage(error.message || 'Произошла ошибка');
        } finally {
            setLoading(false);
        }
    };

    return {
        formState,
        loading,
        errorMessage,
        isFormValid,
        handleChange,
        handleSubmit,
        setFormState,
    };
};
