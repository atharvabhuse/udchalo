import { useQuery } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const fetchBookingDetails = async (bookingID: string, config: any): Promise<any> =>
  apiClient.get(`${apiUrls.getBookingDetails}/${bookingID}`, undefined, config);

const QUERY_KEY = ['BookingDetails'];

export const useCancellationBookingDetails = (bookingID: string, config: any, options: any = {}) =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetchBookingDetails(bookingID, config),
    staleTime: Infinity,
    ...options,
  });
