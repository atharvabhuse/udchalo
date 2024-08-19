import { IFlightPriceAddonsConfigApiResponse, IFlightPriceListAPIResponse } from '@uc/services/network';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { postRequest } from '../../api';
import { apiUrls } from '../../api-endpoints';

interface IPriceAddonsConfigDataPayLoad {
  flightId: {
    onward: string;
    return?: string;
  };
  sessionId: string;
}

const getPriceAddonsConfig = async (
  params: IPriceAddonsConfigDataPayLoad
): Promise<IFlightPriceAddonsConfigApiResponse> => {
  const response: AxiosResponse = await postRequest(apiUrls.postPriceAddOnsConfig, params);
  return (response && (response?.data as IFlightPriceAddonsConfigApiResponse)) || null;
};

const QUERY_KEY = ['PostPriceAddons'];

export const usePostPriceAddonsConfig = (params: IPriceAddonsConfigDataPayLoad, config: any = {}) =>
  useQuery<IFlightPriceAddonsConfigApiResponse>({
    queryKey: QUERY_KEY,
    queryFn: () => getPriceAddonsConfig(params),
    ...config,
  });
