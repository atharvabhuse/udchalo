import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const fetchFlightCabinList = async (): Promise<any> => apiClient.get(apiUrls.getCabins);

const QUERY_KEY = ['FlightsCabins'];

export const useGetFlightCabins = () =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchFlightCabinList,
  });
