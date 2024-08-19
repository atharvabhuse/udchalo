import axios, { AxiosInstance } from 'axios';
import AuthInterceptor from './interceptors/auth-interceptor';
import PlatformInfoInterceptor from './interceptors/platform-info-interceptor';
import ErrorInterceptor from './interceptors/error-interceptor';

const axiosClient: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000,
  withCredentials: true,
});

PlatformInfoInterceptor(axiosClient);
AuthInterceptor(axiosClient);
ErrorInterceptor(axiosClient);

export default axiosClient;
