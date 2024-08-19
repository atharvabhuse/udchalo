import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, InputAdornment, Snackbar, TextField, Alert } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { ButtonShareWhatsappIcon } from '@uc/libs/shared/ui';
import { apiUrls } from '@uc/services/network/api-endpoints';
import { retrieveAndDecryptFromLocalStorage, retrieveFromLocalStorage } from '@uc/services/network';
import { UDCHALO_TOKEN } from '@uc/utils/constants';
import ShareViaSocialMediaPopup from '../share-via-social-media-popup/share-via-social-media-popup';
import styles from './buddy-invite.module.scss';
import BuddyInviteImage from '../../../../../assets/images/buddy_invite.svg';

export interface BuddyInviteProps {}

export function BuddyInvite(props: BuddyInviteProps) {
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showShareSocialMediaModal, setShowShareSocialMediaModal] = useState<boolean>(false);
  const [referralUrl, setReferralUrl] = useState('https://www.udchalo.com?buddyInvite=');
  const numberOfCoins = 2000;

  useEffect(() => {
    const ucToken = retrieveFromLocalStorage(UDCHALO_TOKEN);
    if (ucToken) {
      setLocalStorageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (localStorageLoaded) {
      getReferralCode();
    }
  }, [localStorageLoaded]);

  const getReferralCode = async () => {
    const config = {
      headers: {
        Udchalotoken: retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN),
      },
    };
    const api = await axios.get(apiUrls.getReferralCode, config);

    if (api.data.success) {
      setReferralUrl(`https://www.udchalo.com?buddyInvite=${api.data.response.code}`);
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(referralUrl);
    setIsCopied(true);
  };

  const handleCloseCopyNotificationClick = () => {
    setIsCopied(false);
  };

  const handleClickOfWhatsappShare = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(referralUrl)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  return (
    <div className={styles.buddy_invite_container}>
      <div className={styles.referral_details}>
        <div className={styles.header_image_container}>
          <BuddyInviteImage />
        </div>
        <div className={styles.referral_sharing_container}>
          <div className={styles.referral_text_wrapper}>
            <span className={styles.referral_text}>
              udChalo ke saath
              <span className={styles.referral_text_highlighted}>Jud Chalo, </span>Doston ke saath
              <span className={styles.referral_text_highlighted}>share karo.</span>
            </span>
          </div>
          <div className={styles.referral_text_container}>
            <div className={styles.referral_url}>{referralUrl}</div>
            <div className={styles.referral_copy_icon_container}>
              <ContentCopyOutlinedIcon
                onClick={handleCopyClick}
                sx={{ color: '#3398D5', cursor: 'pointer', fontSize: '20px' }}
              />
            </div>
            <Snackbar open={isCopied} autoHideDuration={4000} onClose={handleCloseCopyNotificationClick}>
              <Alert onClose={handleCloseCopyNotificationClick} severity="success" sx={{ width: '100%' }}>
                URL Copied
              </Alert>
            </Snackbar>
          </div>

          <div className={styles.share_button_container}>
            <Button
              className={styles.share_more_options_button}
              onClick={() => {
                setShowShareSocialMediaModal(true);
              }}
              variant="outlined"
              endIcon={<ShareOutlinedIcon />}>
              More Options
            </Button>
            <Button
              className={styles.share_on_whatsapp_button}
              onClick={handleClickOfWhatsappShare}
              variant="contained"
              endIcon={<ButtonShareWhatsappIcon />}>
              WhatsApp
            </Button>
            <ShareViaSocialMediaPopup
              open={showShareSocialMediaModal}
              urlToShare={referralUrl}
              handleClose={() => {
                setShowShareSocialMediaModal(false);
              }}
              tripSummaryShare={false}
              openPopupCallback={(data: any) => setShowShareSocialMediaModal(data)}
            />
          </div>
        </div>
      </div>
      <div className={styles.how_it_works_container}>
        <div>
          <span className={styles.how_it_works_heading}>How it Works?</span>
        </div>
        <div>
          <span className={styles.how_it_works_description}>
            All friends are special but your friends from the armed forces are in a league of their own. We're creating
            udChalo's Fauji Family community and we need your help to spread the word and refer your friends. Show your
            appreciation for your friends by gifting them a unique platform where they and their family members can
            enjoy exclusive discounts and unbeatable services. When your buddy from the forces verifies their profile
            and becomes a udChalo fauji family member, they will get
            {numberOfCoins} Coins in their wallet.
          </span>
        </div>
      </div>
    </div>
  );
}

export default BuddyInvite;
