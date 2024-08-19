import { useMutation } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';

interface PayloadType {
  file: string;
  url: string;
}
const uploadFileonAws = (payload?: PayloadType) => {
  const { file, url } = payload;
  return apiClient.put(url, file);
};

const QUERY_KEY = ['upLoadFileonAws'];

export const usePostUploadDocsonAws = () => useMutation({ mutationKey: QUERY_KEY, mutationFn: uploadFileonAws });
