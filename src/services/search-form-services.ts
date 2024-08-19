import { AxiosResponse } from 'axios';
import { getRequest } from './network/api';
import { apiUrls } from './network/api-endpoints';

export const getAirports = async (): Promise<any> => {
  const response: AxiosResponse = await getRequest(apiUrls.getAirports);
  return (response && response.data) || null;
};

export const getCabins = async (): Promise<any> => {
  const response: AxiosResponse = await getRequest(apiUrls.getCabins);
  return (response && response.data) || null;
};

export const searchFormService = async (): Promise<any> => {
  const airports = await getAirports();
  const cabins = await getCabins();

  const searchFormServices = {
    getAirports: airports && airports,
    getCabins: cabins && cabins,
  };

  return searchFormServices;
};

export const getSearchInitPayloadFromSearchQuery = (searchQuery: any) => {
  const search = searchQuery?.response.search;
  const payload = { 
    adults: search.adults,
    cabin: search.cabin,
    children: search.children,
    departDate: search.departDate,
    destination: search.destination,
    destinationCountryCode: search.destinationCountryCode,
    infants: search.infants,
    isDefence: search.isDefence,
    origin: search.origin,
    originCountryCode: search.originCountryCode,
    referrer: search.referrer ?? "",
    serviceNumber: search.serviceNumber ?? "",
    tripType: search.tripType,
    userCategory: search.userCategory ?? "Retail",
  };
  return payload;
  
}
