import { IFlightPriceListAPIResponse } from '@uc/services/network';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { postRequest } from '../../api';
import { apiUrls } from '../../api-endpoints';

interface IPriceDataPayLoad {
  flightIds: string[];
  sessionId: string;
  isNewUi?: boolean;
}

const getPriceList = async (params: IPriceDataPayLoad): Promise<IFlightPriceListAPIResponse> => {
  const response: AxiosResponse = await postRequest(apiUrls.postPriceUrl, params);
  return (response && (response?.data as IFlightPriceListAPIResponse)) || null;
};

const QUERY_KEY = ['priceData'];

export const usePostPrice = (params: IPriceDataPayLoad, config: any = {}) =>
  useQuery<IFlightPriceListAPIResponse>({
    queryKey: QUERY_KEY,
    queryFn: () => getPriceList(params),
    ...config,
  });
