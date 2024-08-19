import { useQuery } from 'react-query';
import { apiClient } from '../../api-client';
import { apiUrls } from '../../api-endpoints';
import { getRequest } from '../../api';

const fetchNPSSurvey = async (): Promise<any> => getRequest(apiUrls.getNPSSurvey);

const QUERY_KEY = ['NPSSurvey'];

export const useGetNPSSurvey = () =>
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchNPSSurvey,
  });
