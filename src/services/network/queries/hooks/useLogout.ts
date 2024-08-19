import { apiClient } from '@uc/services/network';
import { useMutation, useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const getLogoutFuc = (): Promise<any> => {
  localStorage.clear();
  return apiClient.get(apiUrls.logout, {});
};

const QUERY_KEY = ['Logout'];

export const useLogout = () =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: getLogoutFuc,
  });
