import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const HolidayDestinationList = async (): Promise<any> => apiClient.get(apiUrls.getHolidayDestination);

const QUERY_KEY = ['HolidayDestination'];

export const useGetHolidayDestination = () =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: HolidayDestinationList,
    staleTime: Infinity,
  });
