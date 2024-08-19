import { apiClient } from '@uc/services/network';
import { useMutation } from 'react-query';
import { apiUrls } from '../../api-endpoints';

export const rescheduleSearchInitFuc = (payload: any): Promise<any> =>
  apiClient.post(apiUrls.rescheduleSearch, payload);

export const QUERY_KEY = ['rescheduleSearch'];

export const usePostRescheduleSearchInit = () =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: rescheduleSearchInitFuc,
  });
