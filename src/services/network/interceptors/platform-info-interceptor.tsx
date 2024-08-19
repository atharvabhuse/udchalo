import { AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const PlatformInfoInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      try {
        const modConfig = { ...config };
        const platform = 'website';
        const webVersion = '1.0';

        modConfig.headers = {
          ...config.headers,
          platform,
          source: 'website',
          userSessionId: '',
        } as unknown as AxiosRequestHeaders;

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

export default PlatformInfoInterceptor;
