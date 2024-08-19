import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const getFlightSearchRequest = (sessionId: string): Promise<any> =>
  apiClient.get<any>(`${apiUrls.getSearchRequest}${sessionId}`);

const QUERY_KEY = ['GetSearchRequest'];

export const useGetSearchRequest = (keys: string[], sessionId: string, config: any = {}) =>
  useQuery({
    queryKey: [QUERY_KEY, ...keys],
    queryFn: () => getFlightSearchRequest(sessionId),
    ...config,
  });
