import { apiClient } from '@uc/services/network';
import { useMutation, useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const getBookingFromPNRFunc = (pnr: string): Promise<any> => apiClient.get(`${apiUrls.getBookingFromPNR}/${pnr}`);

const QUERY_KEY = ['GetBookingFromPNR'];

export const useGetBookingFromPNR = () => useMutation({ mutationKey: QUERY_KEY, mutationFn: getBookingFromPNRFunc });
