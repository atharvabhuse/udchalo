import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const fetchAirlineRules = async (bookingID: string, pnrId: string, config: any): Promise<any> =>
  apiClient.get(`${apiUrls.getAirlineRules}/${bookingID}/${pnrId}`, undefined, config);

const QUERY_KEY = ['getAirlineRules'];

export const useGetAirlineRules = (bookingID: string, pnrId: string, config: any) =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetchAirlineRules(bookingID, pnrId, config),
    staleTime: Infinity,
  });
