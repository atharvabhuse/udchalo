import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';
import { getRequest } from '../../api';
import { IPopularHolidaysDestinationResponse } from '../../models/api.models';

const getPopularHolidaysDestination = async (): Promise<IPopularHolidaysDestinationResponse> => {
  const response: AxiosResponse = await getRequest(apiUrls.getPopularHolidayDestination, { withCredentials: false });
  return response.data as IPopularHolidaysDestinationResponse;
};

const QUERY_KEY = ['PopularHolidaysDestination'];

export const useGetPopularHolidaysDestination = () =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getPopularHolidaysDestination(),
  });
