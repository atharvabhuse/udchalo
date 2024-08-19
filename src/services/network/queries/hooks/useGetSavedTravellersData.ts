import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const getSavedTravellersDataFuc = (): Promise<any> => apiClient.get(apiUrls.getTravellersData);

const QUERY_KEY = ['GetTravellersData'];

export const useGetSavedTravellersData = (config: any = {}) =>
  useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getSavedTravellersDataFuc(),
    ...config,
  });
