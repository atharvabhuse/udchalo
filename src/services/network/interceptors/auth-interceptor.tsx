import { getAccessToken } from '@uc/utils/common-utils';
import { AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const AuthInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      try {
        const modConfig = { ...config };
        const accessToken = getAccessToken();

        if (accessToken) {
          modConfig.headers = {
            ...config.headers,
            Udchalotoken: `${accessToken}`,
          } as unknown as AxiosRequestHeaders;
        }

        return modConfig;
      } catch {
        return config;
      }
    },
    (error: AxiosError) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<unknown>) => response,
    (error: AxiosError) => Promise.reject(error)
  );

  return axiosInstance;
};

export default AuthInterceptor;
