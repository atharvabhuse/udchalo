import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { configUrls } from '../../api-endpoints';

const StaticHomepageDataList = async (): Promise<any> => apiClient.get(configUrls.getStaticHomepageData);

const QUERY_KEY = ['StaticHomepageData'];

export const useGetStaticHomepageData = () =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: StaticHomepageDataList,
    staleTime: Infinity,
  });
