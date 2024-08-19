import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { cmsUrls } from '../../api-endpoints';
import { getRequest } from '../../api';
import { IFlightHomePageDetailsResponse } from '../../models/api.models';

const getFlightHomePageDetails = async (): Promise<IFlightHomePageDetailsResponse> => {
  const response: AxiosResponse = await getRequest(cmsUrls.getHomePageFlightDetails, { withCredentials: false });
  return response.data as IFlightHomePageDetailsResponse;
};

const QUERY_KEY = ['FlightHomePageDetails'];

export const useGetFlightHomePageDetails = () =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getFlightHomePageDetails(),
  });
