import { useQuery } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const getBookResult = async (bookingID: string): Promise<any> => apiClient.get(`${apiUrls.getBookResult}${bookingID}`);

const QUERY_KEY = ['BookResult'];

export const useGetBookResult = (bookingID: string, config?: any) =>
  useQuery({ queryKey: QUERY_KEY, queryFn: () => getBookResult(bookingID), ...config });
