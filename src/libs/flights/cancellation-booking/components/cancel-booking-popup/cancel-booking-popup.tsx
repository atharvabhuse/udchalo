import { UcButton, CancelBooking, CloseBlueIcon } from '@uc/libs/shared/ui';
import { Dialog } from '@mui/material';
import styles from './cancel-booking-popup.module.scss';

/* eslint-disable-next-line */
export interface CancelBookingPopupProps {
  onClose: (arg: boolean) => void;
  cancelBookingDetails: {
    bookingId: string;
    travelerDetails: string[];
    reasonOfCancellation: string;
    estimatedRefund: any;
  };
  cancelBookingPopupHandler: () => Promise<void>;
}

function CancelBookingPopup({ onClose, cancelBookingDetails, cancelBookingPopupHandler }: CancelBookingPopupProps) {
  const dialogPaperStyle = {
    width: '500px',
    height: '450px',
    maxWidth: '1400px',
    maxHeight: '800px',
    borderRadius: '16px',
    padding: '20px 20px 0px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const closeHandler = () => {
    onClose(false);
  };

  return (
      <Dialog open onClose={closeHandler} PaperProps={{ style: dialogPaperStyle }}>
        <CloseBlueIcon className={styles.close_icon} onClick={onClose} />
        <CancelBooking />

        <div className={styles.confirmation_text}>Are you sure you want to cancel your booking?</div>
        <div className={styles.booking_details_container}>
          <div className={styles.booking_detail_label}>
            Booking ID:
            <span className={styles.booking_detail_label_value}> {cancelBookingDetails?.bookingId}</span>
          </div>
          <div className={styles.booking_detail_label}>
            Travelers Details:
            <span className={styles.booking_detail_label_value}> {cancelBookingDetails?.travelerDetails?.join()}</span>
          </div>
          <div className={styles.booking_detail_label}>
            Reason of Cancelation:
            <span className={styles.booking_detail_label_value}> {cancelBookingDetails?.reasonOfCancellation}</span>
          </div>
          <div className={styles.booking_detail_label}>
            Estimated refund:
            <span className={styles.booking_detail_label_value}> {cancelBookingDetails?.estimatedRefund}</span>
          </div>
        </div>
        <div className={styles.action_container}>
          <UcButton variant="outlined" color="secondary" onClick={closeHandler} className={styles.reject_button}>
            No
          </UcButton>
          <UcButton
            variant="contained"
            color="secondary"
            onClick={cancelBookingPopupHandler}
            className={styles.confirm_button}>
            Yes
          </UcButton>
        </div>
      </Dialog>
  );
}

export default CancelBookingPopup;
