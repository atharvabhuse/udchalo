import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const fetchEstimatedRefund = async (payLoad: any, config: any): Promise<any> =>
  apiClient.post(apiUrls.getEstimatedRefund, payLoad, config);

const QUERY_KEY = ['EstimatedRefund'];

export const useGetEstimatedRefund = (payLoad: any, config?: any) =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetchEstimatedRefund(payLoad, config),
    staleTime: Infinity,
    ...config,
  });
