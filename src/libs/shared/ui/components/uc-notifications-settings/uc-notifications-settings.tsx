import { Divider, FormControlLabel, FormGroup, Snackbar, Switch, Typography, Alert } from '@mui/material';
import { GetProfileV2Response, useGetUserProfileV2, retrieveAndDecryptFromLocalStorage } from '@uc/services/network';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrls } from '@uc/services/network/api-endpoints';
import { UDCHALO_TOKEN } from '@uc/utils/constants';
import styles from './uc-notifications-settings.module.scss';

/* eslint-disable-next-line */
export interface UcNotificationsSettingsProps {}

export function UcNotificationsSettings() {
  const [notificationUpdated, setNotificationUpdated] = useState(false);
  const [showNotificationSettingsUpdated, setShowNotificationSettingsUpdated] = useState(false);
  const [enableAllNotifications, setEnableAllNotifications] = useState(false);
  const [accountNotificationsActive, setAccountNotificationsActive] = useState(false);
  const [emailNewsLetterActive, setEmailNewsLetterActive] = useState(false);
  const [pushNotificationsActive, setPushNotificationsActive] = useState(false);
  const [whatsappNotificationsActive, setWhatsappNotificationsActive] = useState(false);

  const { data: profileResponse, refetch: getUserProfileV2 }: any = useGetUserProfileV2({
    enabled: true, // TODO :: change to udchaloId
  });

  useEffect(() => {
    if (profileResponse) {
      const profileData: GetProfileV2Response = profileResponse.data;

      setAccountNotificationsActive(profileData?.response?.settings.accountNotificationsActive);
      setEmailNewsLetterActive(profileData?.response?.settings?.emailNewsLetterActive);
      setPushNotificationsActive(profileData?.response?.settings?.pushNotificationsActive);
      setWhatsappNotificationsActive(profileData?.response?.settings?.whatsappNotificationsActive);

      setEnableAllNotifications(
        profileData?.response?.settings.accountNotificationsActive &&
          profileData?.response?.settings?.emailNewsLetterActive &&
          profileData?.response?.settings?.whatsappNotificationsActive
      );
    }
  }, [profileResponse]);

  const updateNotificationSettingsApiHandler = async () => {
    const config = {
      headers: {
        Udchalotoken: retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN),
      },
    };

    try {
      const api = await axios.post(
        apiUrls.updateNotificationSettings,
        {
          accountNotificationsActive,
          emailNewsLetterActive,
          pushNotificationsActive,
          whatsappNotificationsActive,
        },
        config
      );

      setShowNotificationSettingsUpdated(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const updateNotificationSettings = async () => {
      if (notificationUpdated) {
        setEnableAllNotifications(accountNotificationsActive && emailNewsLetterActive && whatsappNotificationsActive);
        await updateNotificationSettingsApiHandler();
        setNotificationUpdated(false);
      }
    };
    updateNotificationSettings();
  }, [notificationUpdated]);

  const handleEnableAllClick = (event: any, val: boolean) => {
    setAccountNotificationsActive(val);
    setWhatsappNotificationsActive(val);
    setEmailNewsLetterActive(val);
    setNotificationUpdated(true);
  };

  const handleCloseOfNotificationChangeAlert = () => {
    setShowNotificationSettingsUpdated(false);
  };

  return (
    <div className={styles.notification_settings_container}>
      <div className={styles.traveller_details_row}>
        <div className={styles.traveller_details_heading}>Notification Settings</div>
        <div className={styles.enable_all_heading}>
          <div className={styles.sm_enable_all_text}>Enable All</div>
          <div className={styles.sm_enable_all_description}>Keep all notifications active</div>
        </div>
        <div className={styles.enable_all_switch}>
          <FormGroup>
            <div className={styles.lg_enable_all_switch}>
              <FormControlLabel
                control={<Switch color="primary" checked={enableAllNotifications} onChange={handleEnableAllClick} />}
                label="Enable All"
                labelPlacement="start"
                style={{ color: 'black' }}
              />
            </div>
            <div className={styles.sm_enable_all_switch}>
              <Switch color="primary" checked={enableAllNotifications} onChange={handleEnableAllClick} />
            </div>
          </FormGroup>
        </div>
      </div>
      <div className={styles.notification_settings_panel}>
        <div className={styles.notification_setting_container}>
          <div className={styles.flex_3}>
            <div className={styles.notification_heading}>Personalized Notifications</div>
            <div className={styles.notification_description}>
              Turn on the account notifications for trips reminders, offers, cancellation, refund and flight status.
            </div>
          </div>
          <div className={styles.flex_1}>
            <Switch
              color="primary"
              checked={accountNotificationsActive}
              onChange={(event: any, val: boolean) => {
                setAccountNotificationsActive(val);
                setNotificationUpdated(true);
              }}
            />
          </div>
        </div>
        <Divider />
        <div className={styles.notification_setting_container}>
          <div className={styles.flex_3}>
            <div className={styles.notification_heading}>WhatsApp Notification</div>
            <div className={styles.notification_description}>
              Receive promotional offers and booking updates on WhatsApp
            </div>
          </div>
          <div className={styles.flex_1}>
            <Switch
              color="primary"
              checked={whatsappNotificationsActive}
              onChange={(event: any, val: boolean) => {
                setWhatsappNotificationsActive(val);
                setNotificationUpdated(true);
              }}
            />
          </div>
        </div>
        <Divider />
        <div className={styles.notification_setting_container}>
          <div className={styles.flex_3}>
            <div className={styles.notification_heading}>Newsletter, Promotional Offers and Deals</div>
            <div className={styles.notification_description}>
              Get our weekly email Newsletter for the best travel deals and latest news. We Hate spam as much as you do.
              We will never ever sell orshare your email address with spammers.
            </div>
          </div>
          <div className={styles.flex_1}>
            <Switch
              color="primary"
              checked={emailNewsLetterActive}
              onChange={(event: any, val: boolean) => {
                setEmailNewsLetterActive(val);
                setNotificationUpdated(true);
              }}
            />
          </div>
        </div>
      </div>
      <Snackbar
        open={showNotificationSettingsUpdated}
        autoHideDuration={3000}
        onClose={handleCloseOfNotificationChangeAlert}>
        <Alert onClose={handleCloseOfNotificationChangeAlert} severity="success" sx={{ width: '100%' }}>
          User Settings Updated
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UcNotificationsSettings;
