import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';
import { getRequest } from '../../api';

const fetchAirportsList = async (): Promise<any> => getRequest(apiUrls.getAirports);

const QUERY_KEY = ['Airports'];

export const useGetAirports = () =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchAirportsList,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
  });
