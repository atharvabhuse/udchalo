import { useMutation } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const addTraveller = (params: any) => apiClient.post(apiUrls.postAddTraveller, params);

const QUERY_KEY = ['addTraveller'];

export const usePostAddTraveller = (payload: any, config: any = {}) =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: () => addTraveller(payload),
    ...config,
  });
