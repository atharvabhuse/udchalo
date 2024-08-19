import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosClient from './http-service';

function handleGenericError<T>(error: unknown): Promise<AxiosResponse<T> | null> {
  // console.error('Generic error:', error);
  // Handle the generic error here (e.g., log it, display a message, etc.)
  return Promise.resolve<AxiosResponse<T> | null>(null);
}

function handleRequestError<T>(error: AxiosError<unknown>): Promise<AxiosResponse<T> | null> {
  // console.log('handleRequestError --->>>', error);

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Request error:', error.response.status);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
  }

  return Promise.resolve<AxiosResponse<T> | null>(null);
}

function handleError<T>(error: AxiosError<unknown>): Promise<AxiosResponse<T> | null> {
  console.log(error);
  if (axios.isAxiosError(error)) {
    return handleRequestError(error);
  }
  return handleGenericError(error);
}

function getRequest(URL: string, config?: AxiosRequestConfig): Promise<AxiosResponse<unknown> | null> {
  return axiosClient
    .get(`${URL}`, config)
    .then((response: AxiosResponse<unknown>) => response)
    .catch(handleError);
}

function postRequest(
  URL: string,
  payload?: unknown,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<unknown> | null> {
  return axiosClient
    .post(`${URL}`, payload, config)
    .then((response: AxiosResponse<unknown>) => response)
    .catch(handleError);
}

function putRequest(
  URL: string,
  payload?: unknown,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<unknown> | null> {
  return axiosClient
    .put(`${URL}`, payload, config)
    .then((response: AxiosResponse<unknown>) => response)
    .catch(handleError);
}

function patchRequest(
  URL: string,
  payload?: unknown,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<unknown> | null> {
  return axiosClient
    .patch(`${URL}`, payload, config)
    .then((response: AxiosResponse<unknown>) => response)
    .catch(handleError);
}

function deleteRequest(URL: string, config?: AxiosRequestConfig): Promise<AxiosResponse<unknown> | null> {
  return axiosClient
    .delete(`${URL}`, config)
    .then((response: AxiosResponse<unknown>) => response)
    .catch(handleError);
}

export { getRequest, postRequest, putRequest, patchRequest, deleteRequest };
