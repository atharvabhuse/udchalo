import { useEffect, useRef, useState } from 'react';
import { CloseIcon, useDeviceDetect } from '@uc/libs/shared/ui';
import TextField from '@mui/material/TextField';
import {
  LoginViaOtpRequest,
  LoginViaOtpResponse,
  UserLoginRequest,
  UserLoginResponse,
  useSendOtpForLogin,
  useLoginViaOtp,
  encryptAndStoreToLocalStorage,
} from '@uc/services/network';
import OtpInput from 'react-otp-input';
import Link from 'next/link';
import { UDCHALO_TOKEN } from '@uc/utils/constants';
import { SwipeableDrawer } from '@mui/material';
import { UserSignUpConstants } from './user_sign_up.constants';
import styles from './user-sign-up.module.scss';

export interface UserSignUpPropTypes {
  retrieveLoggedInUserDetails: () => void;
  closeBtnClick: () => void;
  onSuccessProfileRetrival?: (data: string) => void;
  setOverlayForMenu: () => void;
}

export interface UserSignUpScreenConfiguration {
  pageTitle: string;
  btnText: string;
  pageSubTitle: string;
}

export interface UserSignUpState {
  mobileNumberOrEmail?: string;
  otp?: string;
  otpError?: string;
  otpMode?: boolean;
  udChaloId?: string;
}

export default function UserSignUp({
  retrieveLoggedInUserDetails,
  closeBtnClick,
  onSuccessProfileRetrival,
  setOverlayForMenu,
}: UserSignUpPropTypes) {
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(true);
  const { isMobile } = useDeviceDetect();

  function formatTimer(timerVar: number) {
    const minutes = Math.floor(timerVar / 60);
    const seconds = timerVar % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  const startTimer = () => {
    setIsTimerActive(true);
    setTimer(60);
    const timerInterval = setInterval(() => {
      setTimer(prevTime => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          setIsTimerActive(false);
        }
        return prevTime === 0 ? 0 : prevTime - 1;
      });
    }, 1000);
  };

  const inputRef = useRef(null);
  const [userSignUpState, setUserSignUpState] = useState<UserSignUpState>({
    mobileNumberOrEmail: '',
    otp: '',
    otpError: '',
    otpMode: false,
    udChaloId: '',
  });
  const [userSignUpScreenConfiguration, setUserSignUpScreenConfiguration] = useState<UserSignUpScreenConfiguration>({
    btnText: UserSignUpConstants.defaultBtnLable,
    pageTitle: UserSignUpConstants.defaultPageTitle,
    pageSubTitle: UserSignUpConstants.defaultPageSubTitle,
  });

  const [enteredOTP, setEnteredOTP] = useState('');
  const userLoginfn = useSendOtpForLogin();
  const loginViaOtpfn = useLoginViaOtp();

  const userLoginRequest: UserLoginRequest = {
    isNewVersion: true,
    field: `${userSignUpState.mobileNumberOrEmail}`,
  };

  const loginViaOtpRequest: LoginViaOtpRequest = {
    isNewVersion: true,
    otp: `${enteredOTP}`,
    recaptcha: null,
    referralCode: '',
    field: `${userSignUpState.mobileNumberOrEmail}`,
  };
 
  const submitOTP = () => {
    loginViaOtpfn.mutate(loginViaOtpRequest, {
      onSuccess(data, variables, context) {
        const response: LoginViaOtpResponse = data.data;
        if (response.success) {
          const udChaloId = response.response.udchaloId;
          encryptAndStoreToLocalStorage(UDCHALO_TOKEN, udChaloId);
          //localStorage.setItem('udChaloId', response.response.udchaloId);
          setUserSignUpState({ ...userSignUpState, ...{ otpError: '' } });
          setOverlayForMenu();
          retrieveLoggedInUserDetails();
          closeBtnClick();
        } else {
          setUserSignUpState({
            ...userSignUpState,
            ...{ otpError: response.message },
          });
        }
      },
      onError(error, variables, context) { },
    });
  }
  const setOtp = (data: string) => {};
  const onSendOTPClick = () => {
    if (!userSignUpState.otpMode) {
      userLoginfn.mutate(userLoginRequest, {
        onSuccess(data, variables, context) {
          const response: UserLoginResponse = data.data;
          if (response.success) {
            setUserSignUpState({ ...userSignUpState, ...{ otpMode: true } });
            setUserSignUpScreenConfiguration({
              btnText: UserSignUpConstants.otpBtnLable,
              pageTitle: UserSignUpConstants.otpPageTitle,
              pageSubTitle: UserSignUpConstants.otpPageSubTitle,
            });
            startTimer();
          }
        },
        onError(error, variables, context) {
          setUserSignUpState({ ...userSignUpState, ...{ otpMode: false } });
        },
      });
    }
    else if (enteredOTP && enteredOTP.length === 6) {
      submitOTP();
    }
  };
  useEffect(() => {
    if (userSignUpState.otpMode && enteredOTP.length === 6) {
      submitOTP();

    }
  }, [userSignUpState.otpMode, enteredOTP])

  const resendOTP = () => {
    const newOtpRequest = { ...userLoginRequest };

    userLoginfn.mutate(newOtpRequest, {
      onSuccess(data, variables, context) {
        const response: UserLoginResponse = data.data;
        if (response.success) {
          startTimer();
        }
      },
      onError(error, variables, context) { },
    });
  };

  return (
    <div>
      {isMobile ? (
        <SwipeableDrawer
          anchor="bottom"
          open={drawerVisible}
          onClose={closeBtnClick}
          onOpen={closeBtnClick}
          PaperProps={{
            style: {
              height: '40%',
              overflowY: 'unset',
            },
          }}>
          <div className={styles.root_container}>
            <div className={styles.close_btn}>
              <CloseIcon onClick={closeBtnClick} />
            </div>
            <div>
              <div className={styles.root}>
                <div className={styles.fields_box}>
                  <div className={styles.title_box}>
                    <span className={styles.title_text}>{userSignUpScreenConfiguration.pageTitle}</span>
                  </div>
                  <div className={styles.subtitle_box}>
                    <span className={styles.subtitle_text}>{userSignUpScreenConfiguration.pageSubTitle}</span>
                    {userSignUpState.otpMode && (
                      <span className={styles.givenOtpNo}>{userSignUpState.mobileNumberOrEmail}</span>
                    )}
                  </div>
                  <div className={styles.city_search_container}>
                    {!userSignUpState.otpMode && (
                      <TextField
                        label="Mobile Number or Email Address"
                        variant="outlined"
                        className={styles.input_box}
                        value={userSignUpState.mobileNumberOrEmail}
                        onInput={(e: any) => {
                          setUserSignUpState({
                            ...userSignUpState,
                            ...{ mobileNumberOrEmail: e.target.value },
                          });
                        }}
                      />
                    )}
                    {userSignUpState.otpMode && (
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
                                  border: '1px solid #c5d4e3',
                                  width: '48px',
                                  height: '46px',
                                  borderRadius: '8px',
                                  background: '#fff',
                                  marginRight: '8px',
                                  padding: '1rem',
                                }}
                              />
                            )}
                          />
                        </div>
                        {userSignUpState.otpError && <div className={styles.otp_error}>{userSignUpState.otpError}</div>}

                        <div className={styles.timer_counter}>
                          {isTimerActive ? (
                            <div className={styles.timer_container}>
                              <div className={styles.resend_link_container}>
                                <span className={styles.in_active_resend_link}>Resend OPT in</span>
                              </div>
                              <span className={styles.active_timer}>{formatTimer(timer)}</span>
                            </div>
                          ) : (
                            <button type="button" className={styles.start_timer} onClick={resendOTP}>
                              Resend OTP
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.inline_form_cta}>
                    <button type="button" className={styles.send_otp_btn} onClick={onSendOTPClick}>
                      {userSignUpScreenConfiguration.btnText}
                    </button>
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
        </SwipeableDrawer>
      ) : (
        <div className={styles.root_container}>
          <div className={styles.close_btn}>
            <CloseIcon onClick={closeBtnClick} />
          </div>
          <div>
            <div className={styles.root}>
              <div className={styles.fields_box}>
                <div className={styles.title_box}>
                  <span className={styles.title_text}>{userSignUpScreenConfiguration.pageTitle}</span>
                </div>
                <div className={styles.subtitle_box}>
                  <span className={styles.subtitle_text}>{userSignUpScreenConfiguration.pageSubTitle}</span>
                  {userSignUpState.otpMode && (
                    <span className={styles.givenOtpNo}>{userSignUpState.mobileNumberOrEmail}</span>
                  )}
                </div>
                <div className={styles.city_search_container}>
                  {!userSignUpState.otpMode && (
                    <TextField
                      label="Mobile Number or Email Address"
                      variant="outlined"
                      className={styles.input_box}
                      value={userSignUpState.mobileNumberOrEmail}
                      onInput={(e: any) => {
                        setUserSignUpState({
                          ...userSignUpState,
                          ...{ mobileNumberOrEmail: e.target.value },
                        });
                      }}
                    />
                  )}
                  {userSignUpState.otpMode && (
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
                                width: '46px',
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
                      {userSignUpState.otpError && <div className={styles.otp_error}>{userSignUpState.otpError}</div>}

                      <div className={styles.timer_counter}>
                        {isTimerActive ? (
                          <div className={styles.timer_container}>
                            <div className={styles.resend_link_container}>
                              <span className={styles.in_active_resend_link}>Resend OPT in</span>
                            </div>
                            <span className={styles.active_timer}>{formatTimer(timer)}</span>
                          </div>
                        ) : (
                          <button type="button" className={styles.start_timer} onClick={resendOTP}>
                            Resend OTP
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.inline_form_cta}>
                  <button type="button" className={styles.send_otp_btn} onClick={onSendOTPClick}>
                    {userSignUpScreenConfiguration.btnText}
                  </button>
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
      )}
    </div>
  );
}
