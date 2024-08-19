import { useMutation } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const postNEFTAdd = async (params: any) => apiClient.post(apiUrls.NEFTAdd, params);

const QUERY_KEY = ['NEFTAdd'];

export const usePostNEFTAdd = (NEFTFormData: any) =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: () => postNEFTAdd(NEFTFormData),
  });
