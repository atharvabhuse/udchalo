import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { getRequest } from '../../api';
import { cmsUrls } from '../../api-endpoints';
import { IFlightBannerDetailsResponse } from '../../models/api.models';

const getBannerDetails = async (): Promise<IFlightBannerDetailsResponse> => {
  const data: AxiosResponse = await getRequest(cmsUrls.getBannerDetails, { withCredentials: false });
  return data.data as IFlightBannerDetailsResponse;
};

const QUERY_KEY = ['BannerDetails'];

export const useGetBannerDetails = () =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getBannerDetails(),
  });
