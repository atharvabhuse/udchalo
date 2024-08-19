import { useMutation } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const addCancellation = (params: any, config: any) => apiClient.post(apiUrls.postAddCancellation, params, config);

const QUERY_KEY = ['addCancellation'];

export const usePostAddCancellation = (payload: any, config: any) =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: () => addCancellation(payload, config),
  });
