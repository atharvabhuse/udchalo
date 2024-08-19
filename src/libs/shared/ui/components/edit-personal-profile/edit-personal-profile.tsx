import { useState } from 'react';
import { Avatar, FormControl, IconButton, Snackbar, TextField, Alert } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ProfileBannerEditIcon, SelectHeaderBannerModal, UcBodyPortal, ProfileVerifyOtp } from '@uc/libs/shared/ui';

import dayjs, { Dayjs } from 'dayjs';
import { apiUrls } from '@uc/services/network/api-endpoints';
import axios from 'axios';
import { retrieveAndDecryptFromLocalStorage, retrieveFromLocalStorage } from '@uc/services/network';
import { UDCHALO_TOKEN } from '@uc/utils/constants';
import { convertTimeStampToDayjs } from '../uc-date-picker/uc-date-picker.utils';
import { MyProfileConstants } from '../my-profile/my-profile.constants';
import {GenderSelectionPanel} from '../gender-selection-panel/gender-selection-panel';
import styles from './edit-personal-profile.module.scss';

/* eslint-disable-next-line */
export interface EditPersonalProfileProps {
  profileResponse: any;
  profilePicUrl: string;
  handleSubmit: any;
  errors: any;
  register: any;
  updateProfileHandler: (data: any) => void;
  selectedGender: string;
  handlerGenderClick: (gender: string) => void;
  setDob: (newDate: any) => void;
  handleProfilePicChange: (event: any) => void;
  setFormValue: any;
  watch: any;
}

export function EditPersonalProfile({
  profileResponse,
  profilePicUrl,
  handleSubmit,
  errors,
  register,
  updateProfileHandler,
  selectedGender,
  handlerGenderClick,
  setDob,
  handleProfilePicChange,
  setFormValue,
  watch,
}: EditPersonalProfileProps) {
  const [openVerifyEmailBox, setOpenVerifyEmailBox] = useState(false);
  const [openVerifyPhoneBox, setOpenVerifyPhoneBox] = useState(false);
  const [showEditBannerModal, setShowEditBannerModal] = useState(false);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);
  const isPhoneVerified = watch('isPhoneVerified');
  const isEmailVerified = watch('isEmailVerified');

  const backgroundImageUrl = '@uc/assets/images/tri-color-1.svg';

  const inlineStyles = {
    backgroundImage: `url(${backgroundImageUrl})`,
  };
  const today: Dayjs = dayjs();

  const onCloseIconClickOfVerifyEmail = () => {
    setOpenVerifyEmailBox(false);
  };

  async function callSendEmailOtpApi() {
    const config = {
      headers: {
        Udchalotoken: retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN),
      },
    };
    const api = await axios.post(
      apiUrls.sendOtpForEmailVerification,
      {
        email: watch('email'),
      },
      config
    );
    return api;
  }

  const handleOpenVerifyEmailBox = async () => {
    const api = await callSendEmailOtpApi();
    if (api?.status) {
      setOpenVerifyEmailBox(true);
    }
  };

  async function callSendPhNoOtpApi() {
    const config = {
      headers: {
        Udchalotoken: retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN),
      },
    };
    const api = await axios.post(
      apiUrls.sendOtpForPhoneNumberVerification,
      {
        phoneNumber: watch('phoneNumber'),
      },
      config
    );
    return api;
  }

  const handleOpenVerifyPhoneNumberBox = async () => {
    const api = await callSendPhNoOtpApi();
    if (api?.status) {
      setOpenVerifyPhoneBox(true);
    }
  };

  const handleClosePhNoVerifiedNotificationClick = () => {
    setIsPhoneNumberVerified(false);
  };

  const onCloseIconClickOfVerifyPhone = () => {
    setOpenVerifyPhoneBox(false);
  };

  const onSuccessPhoneVerification = () => {
    setFormValue('isPhoneVerified', true);
    setIsPhoneNumberVerified(true);
  };

  function onSuccessEmailVerification(): void {
    setFormValue('isEmailVerified', true);
    // setIsPhoneNumberVerified(true); TO DO - Change to show the email verification snack bar
  }

  const handleEditBannerIconClick = () => {
    setShowEditBannerModal(true);
  };

  const handleEditBannerModalClose = () => {
    setShowEditBannerModal(false);
  };

  return (
    <div className={styles.edit_personal_profile}>
      <div className={styles.heading_4}>Personal</div>
      <div className={styles.personal_profile_container}>
        <div className={styles.profile_header_baner} style={inlineStyles}>
          <div className={styles.profile_banner_edit_icon_container}>
            <ProfileBannerEditIcon onClick={handleEditBannerIconClick} />
            <SelectHeaderBannerModal
              open={showEditBannerModal}
              handleClose={handleEditBannerModalClose}
              handleOkClick={handleEditBannerModalClose}
            />
          </div>
          <div className={styles.profilePicContainer}>
            <Avatar
              alt="Profile Picture"
              src={profilePicUrl}
              // src="https://s3.ap-south-1.amazonaws.com/udchalo-preprod-images/client_assets/img/imgno/loggedInUser.png"
              className={styles.profilePic}
            />
            <label htmlFor="file-input" className={styles.cameraIcon}>
              {/* <IconButton className={styles.cameraIcon}> */}
              <CameraAltOutlinedIcon />
              {/* </IconButton> */}
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleProfilePicChange}
            />
          </div>
        </div>

        <div className={styles.profile_banner_form}>
          <div onSubmit={handleSubmit(updateProfileHandler)} className={styles.edit_profile_form_container}>
            <GenderSelectionPanel
              selectedGender={selectedGender}
              handlerGenderClick={handlerGenderClick}
              showCertInCertified={false}
            />

            <div className={styles.add_traveller_input_row}>
              <div className={styles.input_box}>
                <TextField
                  id="firstAndMiddleName"
                  label="First and Middle Name"
                  variant="outlined"
                  className={styles.add_traveller_inp}
                  {...register('firstAndMiddleName', {
                    required: 'This is required field',
                  })}
                  placeholder="First and Middle Name"
                />
                <p className={styles.error_message}>{errors.firstAndMiddleName?.message}</p>
              </div>
              <div className={styles.input_box}>
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  className={styles.add_traveller_inp}
                  placeholder="Last Name"
                  {...register('lastName', {
                    required: 'This is required field',
                  })}
                />
                <p className={styles.error_message}>{errors.lastName?.message}</p>
              </div>

              <div className={styles.input_box}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={convertTimeStampToDayjs(watch('dateOfBirth'))}
                      label="Date of Birth"
                      disableFuture
                      format={MyProfileConstants.DATE_FORMATTER}
                      onChange={setDob}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
              <div className={styles.input_box} style={{ position: 'relative' }}>
                <TextField
                  id="outlined-basic"
                  label="Email ID"
                  variant="outlined"
                  className={styles.add_traveller_inp}
                  placeholder="Email ID"
                  {...register('email', {
                    required: 'This is required field',
                  })}
                />
                {isEmailVerified && (
                  <IconButton
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                    <CheckCircleIcon style={{ color: 'green' }} />
                  </IconButton>
                )}
                {!isEmailVerified && (
                  <button type='button'
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: 'blue',
                    }}
                    onClick={()=>handleOpenVerifyEmailBox}>
                    Verify
                  </button>
                )}
              </div>
              <div className={styles.input_box} style={{ position: 'relative' }}>
                <TextField
                  id="outlined-basic"
                  label="Mobile Number"
                  variant="outlined"
                  className={styles.add_traveller_inp}
                  placeholder="Mobile Number"
                  {...register('phoneNumber', {
                    required: 'This is required field',
                  })}
                />
                {isPhoneVerified && (
                  <IconButton
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                    <CheckCircleIcon style={{ color: 'green' }} />
                  </IconButton>
                )}
                {!isPhoneVerified && (
                  <button type='button'
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: 'blue',
                    }}
                    onClick={()=>handleOpenVerifyPhoneNumberBox}>
                    Verify
                  </button>
                )}
                <p className={styles.error_message}>{errors.phoneNumber?.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.modal_box}>
        {openVerifyEmailBox && (
          <UcBodyPortal>
            <ProfileVerifyOtp
              isPhone={false}
              closeBtnClick={onCloseIconClickOfVerifyEmail}
              onSuccessVerification={()=>onSuccessEmailVerification}
              otpSentTo={watch('email')}
              resendOtp={()=>callSendEmailOtpApi}
            />
          </UcBodyPortal>
        )}
        {openVerifyPhoneBox && (
          <UcBodyPortal>
            <ProfileVerifyOtp
              isPhone
              closeBtnClick={onCloseIconClickOfVerifyPhone}
              onSuccessVerification={onSuccessPhoneVerification}
              otpSentTo={watch('phoneNumber')}
              resendOtp={()=>callSendPhNoOtpApi}
            />
          </UcBodyPortal>
        )}
        <Snackbar
          open={isPhoneNumberVerified}
          autoHideDuration={4000}
          onClose={handleClosePhNoVerifiedNotificationClick}>
          <Alert onClose={handleClosePhNoVerifiedNotificationClick} severity="success" sx={{ width: '100%' }}>
            Phone Number Verified
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default EditPersonalProfile;
