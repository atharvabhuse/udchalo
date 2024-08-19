import { apiClient } from '@uc/services/network';
import { useMutation } from 'react-query';
import { FareCalendarV2Request } from '../../models/api.models';
import { apiUrls } from '../../api-endpoints';

const postGetFareCalendarV2 = async (params: FareCalendarV2Request): Promise<any> =>
  apiClient.post(apiUrls.postFareCalendarV2, params);

const QUERY_KEY = ['GetFareCalendarV2'];

export const usePostGetFareCalendarV2 = (options: any = {}) =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: postGetFareCalendarV2,
  });
