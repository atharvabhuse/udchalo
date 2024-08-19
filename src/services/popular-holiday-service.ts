import { AxiosResponse } from 'axios';
import { IPopularHolidaysDestinationResponse } from './network';
import { getRequest } from './network/api';
import { apiUrls } from './network/api-endpoints';

export const getPopularHolidayDestinationService = async (): Promise<IPopularHolidaysDestinationResponse> => {
  const response: AxiosResponse = await getRequest(apiUrls.getPopularHolidayDestination, { withCredentials: false });
  return (response && (response.data as IPopularHolidaysDestinationResponse)) || null;
};
