import { apiClient } from '@uc/services/network';
import { useMutation, useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const postUpdateTraveler = async (payload: any): Promise<any> =>
  apiClient.post(apiUrls.postCouponList, payload, { token: 'xx' });

const QUERY_KEY = ['PostUpdateTraveler'];

export const usePostUpdateTraveler = (keys: any[] = [], payload: any = {}, config: any = {}) =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => postUpdateTraveler(payload),
    ...config,
  });
