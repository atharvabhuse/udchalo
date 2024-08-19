import { apiClient } from '@uc/services/network';
import { useMutation } from 'react-query';
import { apiUrls } from '../../api-endpoints';
import { GetAllBookingsRequest, GetAllBookingsResponse } from '../../models/api.models';

const getAllBookingsFuc = (payload: GetAllBookingsRequest): Promise<any> =>
  apiClient.post(apiUrls.getAllBookings, payload);

const QUERY_KEY = ['GetAllBookings'];

export const useGetAllBookings = () => useMutation({ mutationKey: QUERY_KEY, mutationFn: getAllBookingsFuc });
