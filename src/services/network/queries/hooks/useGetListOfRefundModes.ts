import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const fetchListOfRefundModes = async (bookingID: string, config: any): Promise<any> =>
  apiClient.get(`${apiUrls.getRefundModeList}/${bookingID}`, undefined, config);

const QUERY_KEY = ['RefundList'];

export const useGetListOfRefundModes = (bookingID: string, config?: any) =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetchListOfRefundModes(bookingID, config),
    staleTime: Infinity,
    ...config,
  });
