import { useQuery } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const getValidateIFSC = (IFSCCode: string) => apiClient.get(`${apiUrls.validateIFSC}/${IFSCCode}`);

const QUERY_KEY = ['validateIFSC'];

export const useGetValidateIFSC = (IFSCCode: string) =>
  useQuery<any>({
    queryKey: [...QUERY_KEY, IFSCCode],
    queryFn: () => getValidateIFSC(IFSCCode),
  });
