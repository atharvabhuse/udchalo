import ShareIcon from '@uc/assets/images/share_icon.svg';
import LeftArrow from '@uc/assets/images/LeftArrow.svg';
import Info from '@uc/assets/images/info.svg';

import { ShareViaSocialMediaPopup, UcCard } from '@uc/libs/shared/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './trip-summary-header.module.scss';
/* eslint-disable-next-line */
export interface TripSummaryHeaderProps {}

function TripSummaryHeader(props: TripSummaryHeaderProps) {
  const router = useRouter();

  const backHandler = () => {
    router.push('/flights');
  };

  const [shareOpen, setShareOpen] = useState(false);
  // const [popupOpen, setPopupOpen] = useState(false);

  const shareHandler = () => {
    setShareOpen(true);
  };
  const shareHandlerWeb = () => {
    // setPopupOpen(true);
    setShowShareSocialMediaModal(true);
  };

  // const popupDetails: any = {
  //   width: '45%',
  //   height: '40%',
  //   borderRadius: '16px',
  //   padding: '20px 20px 20px 20px',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   closeButtonFixedPosition: {
  //     top: '25%',
  //     right: '28%',
  //   },
  // };
  // const closeButtonStyle: React.CSSProperties = {
  //   position: 'fixed',
  //   right: popupDetails?.closeButtonFixedPosition?.right,
  //   top: popupDetails?.closeButtonFixedPosition?.top,
  //   cursor: 'pointer',
  // };

  // const [close, setClose] = useState<number>(0);
  // const closeClickHandler = () => {
  //   setClose(close + 1);
  // };

  const [showShareSocialMediaModal, setShowShareSocialMediaModal] = useState<boolean>(false);

  return (
    <div className={styles.trip_summary_header_main}>
      <div className={styles.trip_summary_header_desktop}>
        <UcCard>
          <div className={styles.trip_summary_header}>
            <div className={styles.text_section}>
              <span className={styles.title}>Your Trip Summary</span>
              <span className={styles.sub_title}>Check your trip details</span>
            </div>
            <div className={styles.share_icon} onClick={shareHandlerWeb}>
              <ShareIcon />
            </div>
          </div>
        </UcCard>
      </div>

      <ShareViaSocialMediaPopup
        open={showShareSocialMediaModal}
        urlToShare=""
        handleClose={() => {
          setShowShareSocialMediaModal(false);
        }}
        tripSummaryShare
        openPopupCallback={(data: any) => setShowShareSocialMediaModal(data)}
      />

      <div className={styles.trip_summary_header_mobile}>
        <div className={styles.trip_summary_header}>
          <div className={styles.trip_summary_header_section1} onClick={backHandler}>
            <LeftArrow />
          </div>
          <div className={styles.trip_summary_header_section2}>
            <div className={styles.trip_summary_header_row}>
              <div className={styles.trip_summary_header_column1}>
                <div className={styles.trip_summary_header_flight}>Your Trip Summary</div>
              </div>
            </div>
          </div>
          <div className={styles.trip_summary_header_section4}>
            <ShareIcon onClick={shareHandler} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripSummaryHeader;
