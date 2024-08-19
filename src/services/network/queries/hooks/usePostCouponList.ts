import { ICouponListPayload } from '@uc/libs/flights/trip-summary';
import { ICouponListResponse } from '@uc/services/network';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { postRequest } from '../../api';
import { apiUrls } from '../../api-endpoints';

const postCouponList = async (payload: ICouponListPayload): Promise<ICouponListResponse> => {
  const response: AxiosResponse = await postRequest(apiUrls.postCouponList, payload, { headers: { token: 'b6a2d' } });
  return response?.data as ICouponListResponse;
};
const QUERY_KEY = ['PostCouponList'];

export const usePostCouponList = (payload: ICouponListPayload, config?: any) =>
  useQuery<ICouponListResponse>({
    queryKey: QUERY_KEY,
    queryFn: () => postCouponList(payload),
    ...config,
  });
