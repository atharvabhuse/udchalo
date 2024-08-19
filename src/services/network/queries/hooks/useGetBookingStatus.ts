import { useQuery } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const getBookingStatus = async (bookingID: string): Promise<any> =>
  apiClient.get(`${apiUrls.getBookStatus}${bookingID}`);

const QUERY_KEY = ['BookStatus'];

export const useGetBookingStatus = (bookingID: string, config?: any) =>
  useQuery({ queryKey: QUERY_KEY, queryFn: () => getBookingStatus(bookingID), ...config });
