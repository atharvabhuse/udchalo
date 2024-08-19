import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const getTravellerCountFuc = (): Promise<any> => apiClient.get(apiUrls.getTravellersCountsFlights);

const QUERY_KEY = ['GetTravellerCount'];

export const useGetTravellersCount = (config: any) =>
  useQuery({ queryKey: QUERY_KEY, queryFn: getTravellerCountFuc, ...config });
