import { Modal, Paper } from '@mui/material';
import {
  CloseIcon,
  CopyIcon,
  ShareViaFacebook,
  ShareViaGmail,
  ShareViaInstagram,
  ShareViaLinkedIn,
  ShareViaTelegram,
  ShareViaTwitterX,
  ShareViaWhatsApp,
} from '@uc/libs/shared/ui';
import copy from 'copy-to-clipboard';
import styles from './share-via-social-media-popup.module.scss';

export interface ShareViaSocialMediaPopupProps {
  urlToShare: string;
  open: boolean;
  handleOkClick?: (event: any) => void;
  handleClose?: (event: any) => void;
  tripSummaryShare: boolean;
  openPopupCallback?: (arg: any) => void;
}

export function ShareViaSocialMediaPopup({
  open,
  urlToShare,
  handleOkClick,
  handleClose,
  tripSummaryShare,
  openPopupCallback,
}: ShareViaSocialMediaPopupProps) {
  const shareOnSocialMedia = (platform: string) => {
    let shareUrl: string = '';

    switch (platform) {
      case 'WhatsApp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(urlToShare)}`;
        break;
      case 'Facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
        break;
      case 'Instagram':
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(urlToShare)}`;
        break;
      case 'X':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}`;
        break;
      case 'Gmail':
        shareUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Buddy%20Invite&body=${encodeURIComponent(
          urlToShare
        )}`;
        break;
      case 'Telegram':
        shareUrl = `https://telegram.me/share/url?url=${encodeURIComponent(urlToShare)}`;
        break;
      case 'LinkedIn':
        shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(urlToShare)}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, '_blank');
  };

  const handleModalClick = (e: any) => {
    e.stopPropagation();
  };

  const shareVia = [
    {
      icon: <ShareViaWhatsApp />,
      heading: 'WhatsApp',
    },
    {
      icon: <ShareViaFacebook />,
      heading: 'Facebook',
    },
    {
      icon: <ShareViaInstagram />,
      heading: 'Instagram',
    },
    {
      icon: <ShareViaTwitterX />,
      heading: 'X',
    },
    {
      icon: <ShareViaGmail />,
      heading: 'Gmail',
    },
    {
      icon: <ShareViaTelegram />,
      heading: 'Telegram',
    },
    {
      icon: <ShareViaLinkedIn />,
      heading: 'LinkedIn',
    },
  ];

  const closeHandler = () => {
    if (openPopupCallback) {
      openPopupCallback(false);
    }
  };

  const onCopyToClipBoard = () => {
    copy(window.location.href);
  };

  return (
    <Modal open={open} onClose={handleClose} className={styles.share_via_social_media_modal}>
      <div className={styles.share_via_social_media_modal_and_closeButton}>
        <div className="modal-content" onClick={handleModalClick}>
          <Paper className={styles.paper}>
            {tripSummaryShare ? (
              <>
                <div className={styles.share_popup_heading}>Share Flights Details</div>
                <div className={styles.share_popup_copy_row}>
                  <p className={styles.share_popup_text}>{window.location.href}</p>
                  <div className={styles.copyIcon}>
                    <CopyIcon onClick={onCopyToClipBoard} />
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.title}>
                udChalo ke saath JudChalo, Doston ke saath share karo. Use{' '}
                <span className={styles.highlighted_title}>Url with code</span>
              </div>
            )}

            <div className={styles.share_via_title}>Share Via</div>

            <div className={styles.shareVia_icons_row}>
              {shareVia.map((data: any, index: number) => (
                <div
                  key={index}
                  className={styles.shareVia_icon_container}
                  onClick={() => shareOnSocialMedia(data.heading)}>
                  {data.icon}
                  <div className={styles.shareVia_icon_heading}>{data.heading}</div>
                </div>
              ))}
            </div>
          </Paper>
        </div>
        <CloseIcon className={styles.closeButton} onClick={closeHandler} />
      </div>
    </Modal>
  );
}

export default ShareViaSocialMediaPopup;
