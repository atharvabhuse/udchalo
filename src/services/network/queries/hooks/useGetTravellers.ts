import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { getRequest } from '../../api';
import { apiUrls } from '../../api-endpoints';
import { IGetTravellerResponse } from '../../models/api.models';
import { apiClient } from '../../api-client';

const getTravellers = async (): Promise<IGetTravellerResponse> => {
  const response: AxiosResponse = await apiClient.get(apiUrls.getTravellers);
  return (response && (response?.data as IGetTravellerResponse)) || null;
};

const QUERY_KEY = ['getTraveller'];

export const useGetTravellers = (config: any = {}) =>
  useQuery<IGetTravellerResponse>({
    queryKey: QUERY_KEY,
    queryFn: () => getTravellers(),
    ...config,
  });
