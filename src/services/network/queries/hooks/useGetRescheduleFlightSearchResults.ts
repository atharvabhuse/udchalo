import { useInfiniteQuery, useQuery } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const getRescheduleFlightSearchResults = async (sessionId: string): Promise<any> =>
  apiClient.get(`${apiUrls.getRescheduleFlightSearchResults}/${sessionId}`);

const QUERY_KEY = ['Reschedule_Flight_Search_Results'];

export const useGetRescheduleFlightSearchResults = (sessionId: string, config: any = {}) =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getRescheduleFlightSearchResults(sessionId),
    ...config,
  });
