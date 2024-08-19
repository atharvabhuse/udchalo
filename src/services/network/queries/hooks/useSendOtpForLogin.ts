import { useMutation } from 'react-query';
import { apiClient } from '@uc/services/network';
import { apiUrls } from '../../api-endpoints';
import { UserLoginRequest } from '../../models/api.models';

export const sendOtpForLogin = async (payload: UserLoginRequest): Promise<any> =>
  apiClient.post(apiUrls.sendOtpForLoginV2, payload);

const QUERY_KEY = ['Get_OTP'];

export const useSendOtpForLogin = () => useMutation({ mutationKey: QUERY_KEY, mutationFn: sendOtpForLogin });
