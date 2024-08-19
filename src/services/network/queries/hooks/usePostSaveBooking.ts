import { ISaveBookingApiResponse, apiClient } from '@uc/services/network';
import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const postSaveBooking = async (payLoad: any): Promise<ISaveBookingApiResponse> => {
  const response: AxiosResponse = await apiClient.post(apiUrls.postSaveBooking, payLoad);
  return (response && (response?.data as ISaveBookingApiResponse)) || null;
};

const QUERY_KEY = ['PostSaveBooking'];

export const usePostSaveBooking = (config: any = {}) =>
  useMutation<ISaveBookingApiResponse>({
    mutationKey: QUERY_KEY,
    mutationFn: payLoad => postSaveBooking(payLoad),
    ...config,
  });
