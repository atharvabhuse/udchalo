import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const getBookingDetailsFuc = (payload: any): Promise<any> =>
  apiClient.get(`${apiUrls.getBookingDetails}/${payload?.bookingId}/${payload?.flightId}`);
const QUERY_KEY = ['GetBookingDetails'];

export const useGetBookingDetails = (payload: any, config?: any) =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getBookingDetailsFuc(payload),
    ...config,
  });
