import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const flightHomePageDataList = async (): Promise<any> => apiClient.get(apiUrls.getFlightHomePageData);

const QUERY_KEY = ['FlightHomePageData'];

export const useGetFlightHomePageData = () =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: flightHomePageDataList,
    staleTime: Infinity,
  });
