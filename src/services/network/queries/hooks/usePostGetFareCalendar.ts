import { useQuery } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';
import { FareCalendarRequest } from '../../models/api.models';

const postGetFareCalendar = async (params: FareCalendarRequest): Promise<any> =>
  apiClient.post(apiUrls.postFareCalendar, params);

const QUERY_KEY = ['GetFareCalendar'];

export const usePostGetFareCalendar = (params: FareCalendarRequest, options: any = {}) =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => postGetFareCalendar(params),
    ...options,
  });
