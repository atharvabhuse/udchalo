import { apiClient } from '@uc/services/network';
import { useQuery } from 'react-query';
import { apiUrls } from '../../api-endpoints';

const getRewardTransactionsFuc = (): Promise<any> => apiClient.get(apiUrls.getRewardTransactions);
// return apiClient.get("https://payments-stage-api-preprod.udchalo.com/reward/transactions",{},{ Udchalotoken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNmE4YWFlMS1mMGMzLTRmNGEtYTExMi1kYmU1MWQ4MzcyNDMiLCJleHAiOjE3MDk1MzI3MDUsImF1ZCI6Im5aeDJ4alJMWkJHWi9qL25LTlVPVWZNQjJ5U1pFNlV6ZHF1YzliNElLdUN4bWxHVXJlOUpncjJyMnpBWDNENS9JR2RIVW5nSkxaWjRRZXI5L0JUaXd3PT0iLCJpc3MiOiJmblBZYXhHZGVmNlZWU0dmRVNaMUFjSDZMWG5LdkZycXBpV3pmSDcyN3g4UlZRVDN4aStUVExHYWVTSG9ReC96cm5XV0t4WWxwVi9iclM0Tmlwam41UT09IiwianRpIjoiSU9vTUFFNWg4VVRsdFMzbTB0QjhNWFhGVGFBSWdqQjYvVldoK3k5QUQzd0FrLzNueDUrbDlqYkJLVEpjTjFEQkJOSDk0ekVxOGZTQWUxV1hmYnAwMXc9PSJ9.p6RYFZ4wSId0ZHpbTDdIxq1ifaMSDgqJ4G4D9d8vXXs" });
const QUERY_KEY = ['GetRewardTransactions'];

export const useGetRewardTransactions = (config: any = {}) =>
  useQuery({ queryKey: QUERY_KEY, queryFn: getRewardTransactionsFuc, ...config });
