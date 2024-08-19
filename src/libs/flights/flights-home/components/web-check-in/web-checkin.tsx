import { Button, TextField } from '@mui/material';

import { useRef, useState } from 'react';
import { useGetBookingFromPNR } from '@uc/services/network';
import { useRouter } from 'next/navigation';
import styles from './web-checkin.module.scss';
import { WebCheckinConst } from './web-checkin.constant';

function WebCheckIn() {
  const getBookingFromPNR = useGetBookingFromPNR();
  const inputRef = useRef(null);

  const router = useRouter();

  const onWebCheckinBtnClick = () => {
    const pnrValue = inputRef?.current?.value;
    if (pnrValue && pnrValue.length >= 5) {
      getBookingFromPNR.mutate(pnrValue, {
        onSuccess(data, variables, context) {
          const resp = data.data.response[0];
          router.push(`./booking-details/${resp.bookingId}/${resp.flightId}`);
        },
      });
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.web_chekin_box}>
        <div className={styles.pnr_box}>
          <span className={styles.label}> {WebCheckinConst.pnrEmailLabel} </span>
          <TextField
            inputRef={inputRef}
            id="outlined-basic"
            placeholder="PNR/Booking ID"
            variant="outlined"
            className={styles.text_field}
          />
        </div>
        <div className={styles.email_box}>
          <TextField
            id="outlined-basic"
            placeholder="Traveler’s Email/Last Name"
            variant="outlined"
            className={styles.text_field}
          />
        </div>
        <div className={styles.btn_box}>
          <Button className={styles.btn} variant="contained" onClick={onWebCheckinBtnClick}>
            {WebCheckinConst.chekinBtnLabel}
          </Button>
        </div>
      </div>
      <div className={styles.covid_label_box}>
        <span className={styles.covid_label}> {WebCheckinConst.covidLabel} </span>
      </div>

      <div className={styles.readme_box}>
        <span className={styles.readme}>
          {WebCheckinConst.instruction}
          <div className={styles.readmore_box}>
            <Button href="https://pages.udchalo.com/travel-advisory/" target="_blank" className={styles.readmore}>
              {WebCheckinConst.readMore}
            </Button>
          </div>
        </span>
      </div>
    </div>
  );
}

export default WebCheckIn;
