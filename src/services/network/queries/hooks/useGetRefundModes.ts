import { useQuery } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const refundModes = (bookingID: string, flightID: string) =>
  apiClient.get(`${apiUrls.refundModes}/${bookingID}/${flightID}`);

const QUERY_KEY = ['GETRefundModes'];

export const useGetRefundModes = (bookingID: string, flightID: string) =>
  useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => refundModes(bookingID, flightID),
  });
