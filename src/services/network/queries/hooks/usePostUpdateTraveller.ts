import { useMutation } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const postUpdateTraveller = (payload: any, config: any) => apiClient.post(apiUrls.postUpdateTraveller, payload, config);

const QUERY_KEY = ['updateTraveller'];

export const usePostUpdateTraveller = (payload: any, config: any) =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: () => postUpdateTraveller(payload, config),
  });
