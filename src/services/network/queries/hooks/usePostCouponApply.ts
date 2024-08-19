import { useMutation, useQuery } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const postCouponApply = (params: any): Promise<any> => apiClient.post(apiUrls.postCouponApply, params);

const QUERY_KEY = ['postCouponApply'];

export const usePostCouponApply = () =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: (payload: any) => postCouponApply(payload),
  });
