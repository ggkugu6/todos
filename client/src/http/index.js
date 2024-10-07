import axios from 'axios'

const $host = axios.create({
  baseURL: 'http://localhost:8082',
});

const authInterceptor = config => {
  config.headers.authorization = `${localStorage.getItem('token')}`;
  return config;
};

$host.interceptors.request.use(authInterceptor);

// Перехватчик для обработки ошибок
const errorInterceptor = error => {
  return Promise.reject(error);
};

// Добавляем перехватчик ошибок к обоим экземплярам axios
$host.interceptors.response.use(response => response, errorInterceptor);

export {
  $host
};
