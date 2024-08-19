import { apiClient } from '@uc/services/network';
import { useMutation } from 'react-query';
import { apiUrls } from '../../api-endpoints';
import { LoginViaOtpRequest } from '../../models/api.models';

const loginViaOtpFn = (payload: LoginViaOtpRequest): Promise<any> => apiClient.post(apiUrls.loginViaOtpV2, payload);

const QUERY_KEY = ['LoginViaOTP'];

export const useLoginViaOtp = () => useMutation({ mutationKey: QUERY_KEY, mutationFn: loginViaOtpFn });
