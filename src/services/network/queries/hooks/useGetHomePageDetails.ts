import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { cmsUrls } from '../../api-endpoints';
import { getRequest } from '../../api';
import { IHomePageDetailsResponse } from '../../models/api.models';

const getHomePageDetails = async (): Promise<IHomePageDetailsResponse> => {
  const response: AxiosResponse = await getRequest(cmsUrls.getHomePageDetails, { withCredentials: false });
  return response.data as IHomePageDetailsResponse;
};

const QUERY_KEY = ['HomePageDetails'];

export const useGetHomePageDetails = () =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getHomePageDetails(),
  });
