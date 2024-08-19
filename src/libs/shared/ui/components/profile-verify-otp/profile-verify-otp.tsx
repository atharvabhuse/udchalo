import { useEffect, useState } from 'react';
import { CloseIcon } from '@uc/libs/shared/ui';
import { Button, Link } from '@mui/material';
import OtpInput from 'react-otp-input';
import axios from 'axios';
import { apiUrls } from '@uc/services/network/api-endpoints';
import { retrieveAndDecryptFromLocalStorage, retrieveFromLocalStorage } from '@uc/services/network';
import { UDCHALO_TOKEN } from '@uc/utils/constants';
import { VerifyPhoneConstants } from './verify-phone.constants';
import { VerifyEmailConstants } from './verify-email.constants';
import { convertSecondsToFormatted } from '../uc-date-picker/uc-date-picker.utils';
import styles from './profile-verify-otp.module.scss';

interface ProfileVerifyOtpProps {
  isPhone: boolean;
  otpSentTo: string;
  closeBtnClick: () => void;
  onSuccessVerification: () => void;
  resendOtp: () => void;
}

export interface VerifyPhoneState {
  mobileNumberOrEmail?: string;
  otp?: string;
  otpError?: string;
  otpMode?: boolean;
  udChaloId?: string;
}

export function ProfileVerifyOtp(props: ProfileVerifyOtpProps) {
  const { isPhone, otpSentTo, resendOtp, closeBtnClick, onSuccessVerification } = props;

  const [userSignUpState, setUserSignUpState] = useState<VerifyPhoneState>({
    mobileNumberOrEmail: '',
    otp: '',
    otpError: '',
    otpMode: true,
    udChaloId: '',
  });

  const userSignUpScreenConfiguration = {
    btnText: isPhone ? VerifyPhoneConstants.otpBtnLable : VerifyEmailConstants.otpBtnLable,
    pageTitle: isPhone ? VerifyPhoneConstants.otpPageTitle : VerifyEmailConstants.otpPageTitle,
    pageSubTitle: isPhone ? VerifyPhoneConstants.otpPageSubTitle : VerifyEmailConstants.otpPageSubTitle,
  };

  const [isResendEnabled, setIsResendEnabled] = useState<boolean>(true);
  const [isResendTimerActive, setIsResendTimerActive] = useState<boolean>(true);
  const [seconds, setSeconds] = useState(59);

  const [enteredOTP, setEnteredOTP] = useState('');

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setIsResendTimerActive(false);
        clearInterval(countdown);
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [seconds]);

  const handleResendOtp = () => {
    if (isResendEnabled) {
      resendOtp();
      setIsResendEnabled(false);
    }
  };

  const onSubmitOtpClick = async () => {
    if (enteredOTP && enteredOTP.length === 6) {
      const config = {
        headers: {
          Udchalotoken: retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN),
        },
      };
      if (isPhone) {
        const api = await axios.get(`${apiUrls.verifyOtpForPhoneNumberVerification}/${enteredOTP}`, config);

        if (api?.status) {
          onSuccessVerification();
          closeBtnClick();
        } else {
          setUserSignUpState({
            ...userSignUpState,
            ...{
              otpError: 'Phone Number Verification Failed', // TO DO :: api?.message
            },
          });
        }
      } else {
        const api = await axios.post(
          `${apiUrls.verifyOtpForEmailVerification}`,
          {
            email: otpSentTo,
            action: 'ev',
            emailVerificationCode: enteredOTP,
          },
          config
        );

        if (api?.status) {
          onSuccessVerification();
          closeBtnClick();
        } else {
          setUserSignUpState({
            ...userSignUpState,
            ...{
              otpError: 'Phone Number Verification Failed', // TO DO :: api?.message
            },
          });
        }
      }
    }
  };

  return (
    <div className={styles.root_container}>
      <div className={styles.close_btn}>
        <CloseIcon onClick={closeBtnClick} width={27} height={25} />
      </div>
      <div>
        <div className={styles.root}>
          <div className={styles.layer_img_div} />
          <div className={styles.fields_box}>
            <div className={styles.title_box}>
              <span className={styles.title_text}>{userSignUpScreenConfiguration.pageTitle}</span>
            </div>
            <div className={styles.subtitle_box}>
              <span className={styles.subtitle_text}>
                {`${userSignUpScreenConfiguration.pageSubTitle}${otpSentTo}`}
              </span>
              {userSignUpState.otpMode && (
                <span className={styles.givenOtpNo}>{userSignUpState.mobileNumberOrEmail}</span>
              )}
            </div>
            <div className={styles.otp_container}>
              <div className={styles.otp_parent_box}>
                <div className={styles.otp_box}>
                  <OtpInput
                    shouldAutoFocus
                    value={enteredOTP}
                    onChange={setEnteredOTP}
                    numInputs={6}
                    renderInput={(props: any) => (
                      <input
                        {...props}
                        style={{
                          border: '2px solid #c5d4e3',
                          width: '3.2rem',
                          height: '50px',
                          borderRadius: '8px',
                          background: '#fff',
                          marginRight: '0.5rem',
                          padding: '1rem',
                        }}
                      />
                    )}
                  />
                </div>
                <div className={styles.resend_box}>
                  {isResendTimerActive ? (
                    <span className={styles.text}>
                      Resend OTP in
                      <span className={styles.timer}>{convertSecondsToFormatted(seconds)}</span>
                    </span>
                  ) : (
                    <span className={isResendEnabled ? styles.text_enabled : styles.text} onClick={handleResendOtp}>
                      Resend OTP
                    </span>
                  )}
                </div>
                {userSignUpState.otpError && <div className={styles.otp_error}>{userSignUpState.otpError}</div>}
              </div>
            </div>
            <div className={styles.inline_form_cta}>
              <Button
                className={enteredOTP.length === 6 ? styles.send_otp_btn : styles.send_otp_btn_disabled}
                onClick={onSubmitOtpClick}>
                {userSignUpScreenConfiguration.btnText}
              </Button>
            </div>
            <div className={styles.terms_box}>
              <div className={styles.terms}>
                By proceeding, you agree to udChalo’s
                <Link href="https://www.udchalo.com/policies/terms-of-use">
                  <span className={styles.tc}>T&C</span>
                </Link>
                and
                <Link href="https://www.udchalo.com/policies/privacy-policy">
                  <span className={styles.tc}>Privacy Policy</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileVerifyOtp;
