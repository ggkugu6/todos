import { $host } from ".";
import {jwtDecode} from "jwt-decode";

// Регистрация пользователя
export const registration = async (email, password, login) => {
  if (!email || !password || !login) {
    throw new Error("Email, пароль и логин должны быть предоставлены");
  }

  try {
    const { data } = await $host.post('api/registration', { email, password, login });

    if (!data) {
      throw new Error("Данные отсутствуют");
    }

    return data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(`Ошибка при регистрации пользователя: ${error.response.data.error}`);
    }

    console.error('Ошибка при регистрации пользователя:', error);
    throw error;
  }
};

// Вход пользователя
export const login = async (login, password) => {
  if (!login || !password) {
    throw new Error("Логин и пароль должны быть предоставлены");
  }

  try {
    const response = await $host.post('api/login', { login, password });
    const { data } = response;
    if (!data || !data.token) {
      throw new Error("Данные токена отсутствуют");
    }

    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Неизвестная ошибка";
    throw new Error(`Ошибка при входе пользователя: ${errorMessage}`);
  }
};

// Проверка токена пользователя
export const check = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await $host.get('api/auth', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { data } = response;
    if (!data) {
      throw new Error('Отсутствуют данные');
    }
    return jwtDecode(token);
  } catch (error) {
    localStorage.removeItem('token');
    throw new Error('Ошибка при проверке токена');
  }
};

// Получение списка пользователей
export const getUser = async () => {
  try {
    const { data } = await $host.get('api/users');
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Неизвестная ошибка";
    throw new Error(`Ошибка при получении списка пользователей: ${errorMessage}`);
  }
};
