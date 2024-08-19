import { apiClient } from '@uc/services/network';
import { useMutation, useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const getCheckInFuc = (): Promise<any> => apiClient.get(apiUrls.checkIn, {});

const QUERY_KEY = ['CheckIn'];

export const useCheckIn = () =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: getCheckInFuc,
  });
