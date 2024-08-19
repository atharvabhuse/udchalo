import { useMutation } from 'react-query';
import { apiClient } from '../../api-client';
import { apiUrls } from '../../api-endpoints';
import { postRequest } from '../../api';

const postNPSSurveyAdd = async (params: any): Promise<any> => apiClient.post(apiUrls.npsSurveyAdd, params);

const QUERY_KEY = ['NPSSurveyAdd'];

export const usePostNPSSurveyAdd = (addData: any) =>
  useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: () => postNPSSurveyAdd(addData),
  });
