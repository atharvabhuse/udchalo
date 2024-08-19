import { useInfiniteQuery, useQuery } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const getFlightSearchResults = async (sessionId: string): Promise<any> =>

  apiClient.get(`${apiUrls.getFlightSearchResults}/${sessionId}`);
// return apiClient.get(`http://localhost:9500/bom-del-3.json`);

const QUERY_KEY = ['Flight_Search_Results'];

const stopRefetch = (resp: any) => {
  let stopRefetchVar = false;
  if (resp) {
    if (resp?.data?.success) {
      const remainingSuppliers = resp?.data?.response?.suppliersState[0]?.remainingSuppliers;
      stopRefetchVar = remainingSuppliers === 0;
    } else {
      stopRefetchVar = true;
    }
  }
  return stopRefetchVar;
};

export const useGetFlightSearchResults = (sessionId: string, config: any) =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getFlightSearchResults(sessionId),
    ...config,
    refetchInterval: (resp: any) => (stopRefetch(resp) ? false : 5000),
  });
