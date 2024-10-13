import axios from 'axios'

const $host = axios.create({
  baseURL: 'https://rational-phaidra-andrey-198dd5cf.koyeb.app' || 'http://localhost:8082' || 'http://192.168.1.100:8082',
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
