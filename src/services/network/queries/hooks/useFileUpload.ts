import { useMutation } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

const fileUpload = (payload: any) => apiClient.post(apiUrls.fileUploadUrl, payload);

const QUERY_KEY = ['fileUpload'];

export const useFileUpload = () =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: fileUpload,
  });
