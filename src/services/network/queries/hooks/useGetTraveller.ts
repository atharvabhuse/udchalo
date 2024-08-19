import { useQuery } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const getTraveller = (config: any) => apiClient.get(apiUrls.getTravellers, {}, config);

const QUERY_KEY = ['getTraveller'];

export const useGetTraveller = (config: any) =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getTraveller(config),
  });
