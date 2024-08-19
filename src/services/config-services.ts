import { AxiosResponse } from 'axios';
import { getRequest } from './network/api';
import { configUrls } from './network/api-endpoints';

export const getHomePageData = async () => {
  const response: AxiosResponse = await getRequest(configUrls.getStaticHomepageData, { withCredentials: false });
  return (response && response.data) || null;
};
