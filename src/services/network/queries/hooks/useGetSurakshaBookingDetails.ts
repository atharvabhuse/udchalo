import { useQuery } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const getSurakshaBookingDetails = (bookingID: any, flightID: any) =>
  apiClient.get(`${apiUrls.getSurakshaBookingDetails}/${bookingID}/${flightID}`);

const QUERY_KEY = ['getSurakshaBookingDetails'];

export const useGetSurakshaBookingDetails = (bookingID: any, flightID: any) =>
  useQuery(QUERY_KEY, () => getSurakshaBookingDetails(bookingID, flightID));
