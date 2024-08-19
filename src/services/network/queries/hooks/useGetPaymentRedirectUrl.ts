import { IPaymentRedirectionApiResponse, apiClient } from '@uc/services/network';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

interface IGetPaymentRedirectLinkPayLoad {
  bookingId: string;
  sessionId: string;
  product: string;
  bankOfferMethod?: string;
  promocode?: string;
}

const getPaymentRedirectLink = async (
  payLoad: IGetPaymentRedirectLinkPayLoad
): Promise<IPaymentRedirectionApiResponse> => {
  const { bookingId = '', promocode = '', bankOfferMethod, sessionId = '', product = '' } = payLoad;
  const queryParams = bankOfferMethod && promocode ? `?bankOfferMethod=${bankOfferMethod}&promocode=${promocode}` : '';
  const response: AxiosResponse = await apiClient.get(
    `${apiUrls.getPaymentRedirectLink}/${bookingId}/${sessionId}/${product}${queryParams}`
  );
  return (response && (response?.data as IPaymentRedirectionApiResponse)) || null;
};

const QUERY_KEY = ['GetPaymentRedirectLink'];

export const useGetPaymentRedirectLink = (payLoad: IGetPaymentRedirectLinkPayLoad, config: any = {}) =>
  useQuery<IPaymentRedirectionApiResponse>({
    queryKey: QUERY_KEY,
    queryFn: () => getPaymentRedirectLink(payLoad),
    ...config,
  });
