import { AxiosResponse } from 'axios';
import { IFlightBannerDetailsResponse, IFlightHomePageDetailsResponse, IHomePageDetailsResponse } from './network';
import { getRequest } from './network/api';
import { cmsUrls } from './network/api-endpoints';

export const getHomePageDetails = async (): Promise<IHomePageDetailsResponse> => {
  const response: AxiosResponse = await getRequest(cmsUrls.getHomePageDetails, { withCredentials: false });
  return (response && (response.data as IHomePageDetailsResponse)) || null;
};

export const getBannerDetails = async (): Promise<IFlightBannerDetailsResponse> => {
  const response: AxiosResponse = await getRequest(cmsUrls.getBannerDetails, { withCredentials: false });
  return (response && (response.data as IFlightBannerDetailsResponse)) || null;
};

export const getFlightHomePageDetails = async (): Promise<IFlightHomePageDetailsResponse> => {
  const response: AxiosResponse = await getRequest(cmsUrls.getHomePageFlightDetails, { withCredentials: false });
  return (response && (response.data as IFlightHomePageDetailsResponse)) || null;
};

export const getAllCmsServicesData = async () => {
  const homePageDetails = await getHomePageDetails();
  const bannerDetails = await getBannerDetails();
  const flightHomePageDetails = await getFlightHomePageDetails();

  const cmsServices = {
    homePageDetails,
    bannerDetails,
    flightHomePageDetails,
  };

  return cmsServices;
};
