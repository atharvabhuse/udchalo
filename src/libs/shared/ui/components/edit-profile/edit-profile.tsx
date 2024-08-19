import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSharedAppStateContext } from '@uc/libs/shared/ui';
import { useGetUserProfileV2 } from '@uc/services/network/queries/hooks/useGetProfileV2';
import {
  GetProfileV2Response,
  retrieveAndDecryptFromLocalStorage,
  retrieveFromLocalStorage,
} from '@uc/services/network';
import { apiUrls } from '@uc/services/network/api-endpoints';
import { Button, Snackbar, Alert } from '@mui/material';
import { UDCHALO_TOKEN } from '@uc/utils/constants';
import {EditTravelProfile} from '../edit-travel-profile/edit-travel-profile';
import {EditDefenceProfile} from '../edit-defence-profile/edit-defence-profile';
import {EditPersonalProfile} from '../edit-personal-profile/edit-personal-profile';
import styles from './edit-profile.module.scss';

export function EditProfile() {
  const { userData, setUserData } = useSharedAppStateContext();
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [showNotificationProfileUpdatedSuccess, setShowNotificationProfileUpdatedSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      gender: '',
      email: ' ',
      firstAndMiddleName: ' ',
      lastName: ' ',
      dateOfBirth: '',
      phoneNumber: ' ',
      isDefence: false,
      userCategory: ' ',
      relationToArmedForces: '',
      relation: '',
      flightTiming: '',
      hotelType: '',
      homeAirport: ' ',
      workLocation: ' ',
      isPhoneVerified: false,
      isUserCategoryVerificationRequested: false,
      isEmailVerified: false,
      isUserCategoryVerified: false,
    },
  });

  const { register, handleSubmit, formState, watch, setValue, reset } = form;
  const { errors } = formState;
  const isDefenceSelected = watch('isDefence', false);
  const isDependentSelected = watch('relationToArmedForces', '') === 'Family Member';

  const { data: profileResponse, refetch: getUserProfileV2 }: any = useGetUserProfileV2({
    enabled: localStorageLoaded,
  });

  useEffect(() => {
    const ucToken = retrieveFromLocalStorage(UDCHALO_TOKEN);
    if (ucToken) {
      setLocalStorageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (profileResponse) {
      const profileData: GetProfileV2Response = profileResponse.data;

      setUserData(profileData.response);
      setValue('gender', profileData?.response?.gender);
      setSelectedGender(profileData?.response?.gender);
      setProfilePic(profileData?.response?.upLoads?.profilePicUrl);
      setValue(
        'firstAndMiddleName',
        profileData?.response?.name?.middleName
          ? `${profileData?.response?.name?.firstName} ${profileData?.response?.name?.middleName}`
          : profileData?.response?.name?.firstName
      );
      setValue('lastName', profileData?.response?.name?.lastName);
      setValue('dateOfBirth', profileData?.response?.dateOfBirth);
      setValue('email', profileData?.response?.email);
      setValue('phoneNumber', profileData?.response?.phoneNumber);
      setValue('isDefence', profileData?.response?.isDefence);
      setValue('userCategory', profileData?.response?.userCategory);
      setValue('relationToArmedForces', profileData?.response?.relationToArmedForces);
      setValue('relation', profileData?.response?.relation);
      setValue('flightTiming', profileData?.response?.flightTiming);
      setValue('hotelType', profileData?.response?.hotelType);
      setValue('homeAirport', profileData?.response?.homeAirport);
      setValue('workLocation', profileData?.response?.workLocation);
      setValue('isPhoneVerified', profileData?.response?.account?.verification?.isPhoneVerified);
      setValue(
        'isUserCategoryVerificationRequested',
        profileData?.response?.account?.verification?.isUserCategoryVerificationRequested
      );
      setValue('isEmailVerified', profileData?.response?.account?.verification?.isEmailVerified);
      setValue('isUserCategoryVerified', profileData?.response?.account?.verification?.isUserCategoryVerified);
    }
  }, [profileResponse]);

  const resetProfileData = () => {
    setSelectedGender(userData?.gender);
    reset({
      gender: userData?.gender,
      firstAndMiddleName: userData?.name?.middleName
        ? `${userData?.name?.firstName} ${userData?.name?.middleName}`
        : userData?.name?.firstName,
      lastName: userData?.name?.lastName,
      dateOfBirth: userData?.dateOfBirth,
      email: userData?.email,
      phoneNumber: userData?.phoneNumber,
      isDefence: userData?.isDefence,
      userCategory: userData?.userCategory,
      relationToArmedForces: userData?.relationToArmedForces,
      relation: userData?.relation,
      flightTiming: userData?.flightTiming,
      hotelType: userData?.hotelType,
      homeAirport: userData?.homeAirport,
      workLocation: userData?.workLocation,
      isPhoneVerified: userData?.account?.verification?.isPhoneVerified,
      isUserCategoryVerificationRequested: userData?.account?.verification?.isUserCategoryVerificationRequested,
      isEmailVerified: userData?.account?.verification?.isEmailVerified,
      isUserCategoryVerified: userData?.account?.verification?.isUserCategoryVerified,
    });
  };

  const setDob = (newDate: any) => {
    setValue('dateOfBirth', newDate.format('DD-MM-YYYY'));
  };

  const handlerGenderClick = (gender: string) => {
    setSelectedGender(gender);
    setValue('gender', gender);
  };

  const updateProfileApiHandler = async (updatedProfileData: any) => {
    const config = {
      headers: {
        Udchalotoken: retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN),
      },
    };

    const api = await axios.post(
      apiUrls.updateProfile,
      {
        dateOfBirth: updatedProfileData?.dateOfBirth,
        title: 'mr',
        firstName: updatedProfileData?.firstAndMiddleName?.split(' ')[0],
        lastName: updatedProfileData?.lastName,
        middleName: updatedProfileData?.firstAndMiddleName?.split(' ')[1] || '',
        serviceNumber: null,
        email: updatedProfileData?.email,
        userCategory: updatedProfileData?.userCategory,
        relationToArmedForces: updatedProfileData?.relationToArmedForces,
        relation: updatedProfileData?.relation,
        phoneNumber: updatedProfileData?.phoneNumber,
        isDefence: updatedProfileData?.isDefence,
        isFaujiFamily: false,
        flightTiming: updatedProfileData?.flightTiming,
        hotelType: updatedProfileData?.hotelType,
        homeAirport: updatedProfileData?.homeAirport,
        workLocation: updatedProfileData?.workLocation,
      },
      config
    );
    if (api?.data?.success) {
      getUserProfileV2();
      setShowNotificationProfileUpdatedSuccess(true);
    }
  };

  const updateProfileHandler = (data: any) => {
    updateProfileApiHandler(data);
  };

  const handleCloseOfProfileUpdateAlert = () => {
    setShowNotificationProfileUpdatedSuccess(false);
  };

  const handleProfilePicChange = async (event: any) => {
    const uploadedPic = event?.target?.files[0];
    const formData = new FormData();
    formData.append('file', uploadedPic);
    const config = {
      headers: {
        Udchalotoken: retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN),
        'Content-Type': 'multipart/form-data',
      },
    };

    const api = await axios.post(apiUrls.updateProfilePic, formData, config);
    setProfilePic(api?.data?.response?.upLoads?.profilePicUrl);
    getUserProfileV2();
  };

  return (
    <form onSubmit={()=>handleSubmit(updateProfileHandler)}>
      <EditPersonalProfile
        profileResponse={profileResponse}
        profilePicUrl={profilePic}
        handleProfilePicChange={()=>handleProfilePicChange}
        handleSubmit={handleSubmit}
        updateProfileHandler={updateProfileHandler}
        selectedGender={selectedGender}
        handlerGenderClick={handlerGenderClick}
        register={register}
        errors={errors}
        setDob={setDob}
        setFormValue={setValue}
        watch={watch}
      />

      <EditDefenceProfile
        isDefenceSelected={isDefenceSelected}
        register={register}
        watch={watch}
        errors={errors}
        isDependentSelected={isDependentSelected}
      />

      <EditTravelProfile profileResponse={profileResponse} register={register} watch={watch} />
      <div className={styles.update_profile_button_container}>
        <Button className={styles.cancel_button} type="button" variant="outlined" onClick={resetProfileData}>
          Cancel
        </Button>
        <Button className={styles.update_profile_button} type="submit" variant="contained">
          Update Details
        </Button>
      </div>
      <Snackbar
        open={showNotificationProfileUpdatedSuccess}
        autoHideDuration={3000}
        onClose={handleCloseOfProfileUpdateAlert}>
        <Alert onClose={handleCloseOfProfileUpdateAlert} severity="success" sx={{ width: '100%' }}>
          User Profile Updated Successfully
        </Alert>
      </Snackbar>
    </form>
  );
}

export default EditProfile;
