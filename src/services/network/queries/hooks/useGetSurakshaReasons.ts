import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const fetchSurakshaReasons = async (surakshaId: number, config?: any): Promise<any> =>
  apiClient.get(`${apiUrls.getSurakshaReasons}/${surakshaId}`, undefined);

const QUERY_KEY = ['SurakshaReasons'];

export const useGetSurakshaReasons = (surakshaId: number, config?: any) =>
  useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => fetchSurakshaReasons(surakshaId),
    ...config,
  });
