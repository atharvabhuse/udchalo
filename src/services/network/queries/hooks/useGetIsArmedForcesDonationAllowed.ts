import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { apiUrls, cmsUrls } from '../../api-endpoints';
import { getRequest } from '../../api';
import { apiClient } from '../../api-client';
import { IArmedForceDonationApiResponse } from '../../models/api.models';

const getIsArmedForcesDonationAllowed = async (): Promise<IArmedForceDonationApiResponse> => {
  const response: AxiosResponse = await apiClient.get(apiUrls.isArmedForcesDonationAllowed);
  return response && ((response?.data as IArmedForceDonationApiResponse) || null);
};

const QUERY_KEY = ['ArmedForcesDonationAllowed'];

export const useGetArmedForcesDonationAllowed = (config: any = {}) =>
  useQuery<IArmedForceDonationApiResponse>({
    queryKey: QUERY_KEY,
    queryFn: () => getIsArmedForcesDonationAllowed(),
    ...config,
  });
