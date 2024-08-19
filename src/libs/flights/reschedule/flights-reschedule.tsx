import { useEffect, useState } from 'react';
import {
  useGetBookingDetails,
  useGetSearchRequest,
  usePostRescheduleSearchInit,
  usePostSearchInit,
} from '@uc/services/network';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import copy from 'copy-to-clipboard';
import { MSiteUcHeader, UcCard, UcFareBreakup } from '@uc/libs/shared/ui';
import { FlightLegDetails, TravellerCard } from '@uc/libs/flights/shared/ui';
import { useRouter } from 'next/navigation';
import { Alert, Snackbar } from '@mui/material';
import FlightsDatePicker from '../shared/ui/components/flights-date-picker/flights-date-picker';
import styles from './flights-reschedule.module.scss';

/* eslint-disable-next-line */
export interface FlightsRescheduleProps {
  bookingId?: string;
  flightId?: string;
  backHandler: (url: string) => void;
  onReschedule: (sessionId: string) => void;
}

export function FlightsReschedule(props: FlightsRescheduleProps) {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState<string>('');
  const searchInit = usePostRescheduleSearchInit();
  const [newDate, setNewDate] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const flightRescheduleRequest: any = {
    bookingId: `${props.bookingId}`,
    flightId: `${props.flightId}`,
    newTravelDate: {
      year: `${newDate.getFullYear()}`,
      month: `${newDate.getMonth() + 1}`,
      day: `${newDate.getDate()}`,
    },
  };

  const router = useRouter();
  const getBookingDetailsReq = {
    bookingId: `${props.bookingId}`,
    flightId: `${props.flightId}`,
  };

  const { data: getBookingDetails }: any = useGetBookingDetails({
    bookingId: props.bookingId,
    flightId: props.flightId,
  });

  const [bookingData, setBookingData] = useState<any>({});

  useEffect(() => {
    setBookingData(getBookingDetails?.data?.response);
  }, [getBookingDetails]);

  const onCopyToClipBoard = () => {
    copy(bookingData?.pnr);
  };

  const fareHandler = () => {};

  const review = {
    baseFare: bookingData?.fare?.baseTotalFare,
    taxesAndFees: bookingData?.fare?.totalFee + bookingData?.fare?.totalTax,
    conveienceFees: bookingData?.fare?.totalConvenienceFee,
  };
  const discount = {
    name: bookingData?.discount?.code,
    price: bookingData?.discount?.amount,
  };

  const setOnwardDate = (data: Date) => {
    setNewDate(data);
  };

  const searchFlights = () => {
    searchInit.mutate(flightRescheduleRequest, {
      onSuccess(data, variables, context) {
        if (data.data.success) {
          props.onReschedule(data.data.sessionId);
        } else {
          setSnackBarMsg(data.data.message);
          setSnackbarVisible(true);
        }
      },
      onError(error, variables, context) {
        setSnackBarMsg(error as string);
        setSnackbarVisible(true);
      },
    });
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarVisible}
        autoHideDuration={5000}
        onClose={hideSnackbar}>
        <Alert onClose={hideSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
      <MSiteUcHeader backHandler={props.backHandler}>
        <MSiteUcHeader.LeftContent>
          <h1>Reschedule Booking</h1>
        </MSiteUcHeader.LeftContent>
      </MSiteUcHeader>
      <div className={styles.my_bookings_root}>
        <div className={styles.left_pane}>
          <div className={styles.box}>
            <div className={styles.pnr_box}>
              <span className={styles.pnr}>PNR :{bookingData?.pnr}</span>
              <div className={styles.copy_icon} onClick={onCopyToClipBoard}>
                <ContentCopyOutlinedIcon className={styles.icon} />
              </div>
            </div>
            <div>
              <span className={styles.status}> Confirmed</span>
              {bookingData?.isDefence && (
                <div className={styles.type}>
                  <span>Defence</span>
                </div>
              )}
            </div>
          </div>
          {bookingData?.departDate && (
            <div className={styles.trip_summary}>
              <UcCard id="tripSummary">
                <FlightLegDetails
                  legDetails={bookingData}
                  departDate={bookingData?.departDate}
                  arriveDate={bookingData?.arriveDate}
                />
              </UcCard>
            </div>
          )}
          <UcCard>
            <span className={styles.date_container_title}>Please select a new Date for travel</span>
            <div className={styles.date_container}>
              <FlightsDatePicker
                placeholder=""
                minDate={new Date()}
                initialValue={newDate}
                fareData={{}}
                onDateSelect={setOnwardDate}
              />
              <button className={styles.search_flight_btn} onClick={searchFlights}>
                Search New Flight
              </button>
            </div>
          </UcCard>
        </div>
        <div className={styles.right_pane}>
          <div>
            <UcFareBreakup
              review={review}
              discount={discount}
              fareChangeCallback={fareHandler}
              seatFees={undefined}
              totalFare={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightsReschedule;
