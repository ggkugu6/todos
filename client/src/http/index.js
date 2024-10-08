import axios from 'axios'

const $host = axios.create({
  baseURL: 'http://localhost:8082',
});

const authInterceptor = config => {
  config.headers.authorization = `${localStorage.getItem('token')}`;
  return config;
};

$host.interceptors.request.use(authInterceptor);

const errorInterceptor = error => {
  return Promise.reject(error);
};

$host.interceptors.response.use(response => response, errorInterceptor);

export {
  $host
};
