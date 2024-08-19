import axios from 'axios';
import { retrieveAndDecryptFromLocalStorage } from '../../utils/storage-utils';

const UDCHALO_TOKEN = 'Udchalotoken';

const isMobile = () => {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
};

const requestInterceptor = axios.interceptors.request.use(config => {
  const currentPlatform = isMobile() ? 'msite' : 'desktop';
  config.headers.set('Platform', currentPlatform);
  config.headers.set('Source', 'website');
  const token = retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN);
  if (token) {
    config.headers.set(UDCHALO_TOKEN, token);
  }
  return config;
});

const responseInterceptor = axios.interceptors.response.use(
  response => response,
  error => error
);

export const apiClient = {
  get: <T>(url: string, params?: object, headers?: object) =>
    axios.get<T>(url, {
      headers: { ...headers },
      ...params,
    }),
  post: <T>(url: string, data: unknown, headers?: object) =>
    axios.post<T>(url, data, {
      headers: { ...headers },
    }),
  patch: <T>(url: string, data: unknown, headers?: object) =>
    axios.patch<T>(url, data, {
      headers: { ...headers },
    }),
  delete: <T>(url: string, headers?: object) =>
    axios.delete<T>(url, {
      headers: { ...headers },
    }),
  put: <T>(url: string, data: unknown, headers?: object) =>
    axios.put<T>(url, data, {
      headers: { ...headers },
    }),
};
