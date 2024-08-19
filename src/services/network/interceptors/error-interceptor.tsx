import { AxiosInstance } from 'axios';

const ErrorInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use( (config: any) => config);

  axiosInstance.interceptors.response.use(
    async response => {
      try {
        // Request was successful, e.g. HTTP code 200
        const responseSuccess = response?.data?.success || true;

        if (!responseSuccess) {
          let errMsg = 'Oops! Something went wrong';
          if (response?.data) {
            errMsg = response?.data;
          }

          if (response?.data?.message) {
            errMsg = response?.data?.message;
          }

          if (typeof errMsg !== 'string') {
            errMsg = JSON.stringify(errMsg);
          }

          return await Promise.reject(new Error(errMsg));
        }

        return response;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async error =>
      // Request failed, e.g. HTTP code 500
      Promise.reject(error)
  );

  return axiosInstance;
};

export default ErrorInterceptor;
