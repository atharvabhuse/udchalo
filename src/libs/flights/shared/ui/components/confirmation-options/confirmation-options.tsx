import React from 'react';
import { MinutesTimerIcon, NoteIcon } from '@uc/assets/images';
import styles from './confirmation-options.module.scss';

interface ConfirmationOptionsInterface {
  hours: number;
  remainingMinutes: number;
  ucCredit: number;
}

function ConfirmationOptions({ hours, remainingMinutes, ucCredit }: ConfirmationOptionsInterface) {
  return (
    <div>
      {hours >= 0 && hours <= 2 && (
        <div className={styles.confirmation_options}>
          <div className={styles.confirmation_options_header}>Please choose from the following options:</div>
          <div className={styles.confirmation_options_container}>
            <div className={styles.confirmation_options_radio_container}>
              <input type="radio" name="options" className={styles.confirmation_options_radio_container_left} checked />
              <div className={styles.confirmation_options_radio_container_right}>
                <div className={styles.radio_container_heading}>Retry Booking</div>
                <div className={styles.radio_container_desc}>
                  We have temporaryily credited the paid amount of{' '}
                  <b className={styles.radio_container_bold}>₹{ucCredit} in udchalo Credits.</b> You can make a payment
                  using these credits.
                </div>
              </div>
            </div>

            <div className={styles.note_container}>
              <div className={styles.note_icon}>
                <NoteIcon />
              </div>
              <div className={styles.note_text}>
                <span>
                  <b className={styles.note_bold}>Note:</b> In the case, coupons that were applied to the original
                  booking will not be valid for reuse.
                </span>
              </div>
            </div>

            <div className={styles.confirmation_options_radio_container} style={{ borderTop: '1px solid #eaf0f6' }}>
              <input type="radio" name="options" className={styles.confirmation_options_radio_container_left} />
              <div className={styles.confirmation_options_radio_container_right}>
                <div className={styles.radio_container_heading}>Refund to source: NEFT, udChalo Credits</div>
                <div className={styles.radio_container_desc}>
                  Once your refund is approved, the amount will be reflect in your source account within{' '}
                  <b className={styles.radio_container_bold}>5 working days.</b>
                </div>
              </div>
            </div>

            <div className={styles.note_container}>
              <div className={styles.note_icon}>
                <NoteIcon />
              </div>
              <div className={styles.note_text}>
                <span>
                  <b className={styles.note_bold}>Note:</b> Applicable coupons will once again be made available for
                  reuse.
                </span>
              </div>
            </div>

            <div className={styles.my_booking_button_container}>
              <button type="button" className={styles.my_booking_button}>
                Proceed
              </button>
            </div>
          </div>
          <div className={styles.credits_message_container}>
            <div className={styles.credits_message_icon}>
              <MinutesTimerIcon />
            </div>
            <div className={styles.credits_message_text}>
              If ₹{ucCredit} credits remains unused, we will automatically initiate an auto refund in your
              credit/wallet/bank account in
              <b className={styles.credits_message_time}>
                <span className={styles.space}>0{hours}:{remainingMinutes}</span>
              </b>
              hours.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmationOptions;
