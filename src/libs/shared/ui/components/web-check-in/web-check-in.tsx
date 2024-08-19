import { Alert, IconButton, InputAdornment, OutlinedInput, Snackbar } from '@mui/material';
import { useState } from 'react';
import { WebChekInResponse, WebChekInResponseType, useCheckIn } from '@uc/services/network';
import { useRouter } from 'next/navigation';
import styles from './web-check-in.module.scss';
import { WebCheckinConst } from './web-chekin.constants';

/* eslint-disable-next-line */
export interface WebCheckInProps {
  heading: string;
  desc: string;
  pnr: string;
  airlineType?: string;
  departDate?: string;
  onWebCheckIn: (url: string) => void;
}

export function WebCheckIn({ heading, desc, pnr, airlineType, departDate, onWebCheckIn }: WebCheckInProps) {
  const checkIn = useCheckIn();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState<string>('');

  const handleClickShowPassword = () => {};
  const handleClose = () => {
    setOpen(false);
  };

  const onWebCheckInProcess = () => {
    let isWebCheckinEnabled = true;

    if (departDate) {
      const timeDiff = new Date(departDate).getTime() - new Date().getTime();
      const timeDiffInSec = Math.floor(timeDiff / 1000);
      if (timeDiffInSec < 0) {
        setSnackBarMsg(WebCheckinConst.flightDepartedErrorMsg);
        setOpen(true);
        isWebCheckinEnabled = false;
      } else if (timeDiffInSec < WebCheckinConst.closedWindowHrs * 60 * 60) {
        setSnackBarMsg(WebCheckinConst.airlineWebCheckinMsg);
        setOpen(true);
        isWebCheckinEnabled = false;
      } else if (timeDiffInSec > WebCheckinConst.checkinWindowHrs * 60 * 60) {
        setSnackBarMsg(WebCheckinConst.windowNotOpenMsg);
        setOpen(true);
        isWebCheckinEnabled = false;
      }
    }
    if (isWebCheckinEnabled) {
      checkIn.mutate(undefined, {
        onSuccess(data, variables, context) {
          const resp: WebChekInResponse = data.data;
          if (resp.success) {
            const selectedAirlineObj: WebChekInResponseType | undefined = resp.response.find(
              dataVar => dataVar.code === airlineType
            );
            const webCheckinUrl = selectedAirlineObj?.isWebCheckInEnabled
              ? `/flights/web-check-in/${pnr}`
              : `${selectedAirlineObj?.link}`;
            onWebCheckIn(webCheckinUrl);
          }
        },
        onError(error, variables, context) {},
      });
    }
  };
  return (
    <div className={styles.webCheckIn}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {`${snackbarMsg}`}
        </Alert>
      </Snackbar>
      <div className={styles.webCheckIn_heading}>{heading}</div>
      <div className={styles.webCheckIn_desc}>{desc}</div>
      <div className={styles.input_box}>
        <OutlinedInput
          endAdornment={
            <InputAdornment position="end" variant="outlined">
              <IconButton edge="end" onClick={handleClickShowPassword}>
                <button type='button' className={styles.btn} onClick={onWebCheckInProcess}>
                  Check-In Now
                </button>
              </IconButton>
            </InputAdornment>
          }
          className={styles.pnr_box}
          size="small"
          label="PNR"
          value={pnr}
        />
      </div>
    </div>
  );
}

export default WebCheckIn;
