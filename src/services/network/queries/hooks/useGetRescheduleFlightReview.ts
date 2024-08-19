import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const getRescheduleFlightReview = async (
  sessionId: string,
  onwardId: string,
  returnId: string,
  tripmode?: string
): Promise<any> =>
  apiClient.get(`${apiUrls.getRescheduleFlightReview}/${sessionId}?onward=${onwardId}&return=${returnId}`);

const QUERY_KEY = ['RescheduleFlightReview'];

export const useGetRescheduleFlightReview = (sessionId: string, onwardId: string, returnId: string, config: any = {}) =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getRescheduleFlightReview(sessionId, onwardId, returnId),
    ...config,
  });
