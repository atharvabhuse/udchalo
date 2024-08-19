import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const getUserProfileV2Fuc = (): Promise<any> => apiClient.get(apiUrls.getProfileV2);

const QUERY_KEY = ['GetProfileV2'];

export const useGetUserProfileV2 = (config: any = {}) =>
  useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getUserProfileV2Fuc(),
    ...config,
  });
