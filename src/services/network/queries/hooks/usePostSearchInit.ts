import { useMutation } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';
import { FlightSearchRequest } from '../../models/api.models';

const postSearchInit = async (params: FlightSearchRequest): Promise<any> =>
  apiClient.post(apiUrls.postSearchInit, params);

const QUERY_KEY = ['SearchInit'];

export const usePostSearchInit = () =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: postSearchInit,
  });
