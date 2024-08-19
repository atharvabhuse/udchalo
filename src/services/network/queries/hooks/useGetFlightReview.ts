import { apiClient } from '@uc/services/network';
import { useMutation, useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const getFlightReview = async (sessionId: string, onwardId: string, returnId: string): Promise<any> =>
  apiClient.get(`${apiUrls.getFlightReview}/${sessionId}?onward=${onwardId}&return=${returnId}`);

const QUERY_KEY = ['PostCouponList'];

export const useGetFlightReview = (sessionId: string, onwardId: string, returnId: string, config: any = {}) =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getFlightReview(sessionId, onwardId, returnId),
    ...config,
  });
