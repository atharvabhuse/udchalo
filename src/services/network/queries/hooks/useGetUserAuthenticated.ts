import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { apiClient } from '../../api-client';
import { apiUrls } from '../../api-endpoints';
import { IGetUserAuthenticationResponse } from '../../models/api.models';

const getUserAuthenticated = async (): Promise<IGetUserAuthenticationResponse> => {
  const response: AxiosResponse = await apiClient.get(apiUrls?.getUserAuthenticated);
  return response && ((response?.data as IGetUserAuthenticationResponse) || null);
};
const QUERY_KEY = ['GetUserAuthenticated'];

export const useGetUserAuthenticated = (config?: any) =>
  useQuery<IGetUserAuthenticationResponse>({
    queryKey: QUERY_KEY,
    queryFn: getUserAuthenticated,
    staleTime: Infinity,
    ...config,
  });
