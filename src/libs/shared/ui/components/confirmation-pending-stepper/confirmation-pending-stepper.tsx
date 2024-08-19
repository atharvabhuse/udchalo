import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styles from './confirmation-pending-stepper.module.scss';
import { InProgressStepper, MinutesTimerIcon, NoteIcon, Pending } from '../..';

interface ConfirmationPendingStepperInterface {
  hours: number;
  remainingMinutes: number;
  summary: any;
}

function ConfirmationPendingStepper({ hours, remainingMinutes, summary }: ConfirmationPendingStepperInterface) {
  return (
    <div className={styles.confirmation_pending_container}>
      <div className={styles.confirmation_pending_icon}>
        <Pending />
      </div>

      <div className={styles.confirmation_pending_stepper}>
        <Stepper activeStep={2} orientation="vertical">
          <Step key={1}>
            <StepLabel>
              <div className={styles.confirmation_pending_stepper_label}>Payment Received</div>
            </StepLabel>
            <div className={styles.confirmation_pending_stepper_label_description}>
              Your booking request has been received
            </div>
          </Step>
          <Step key={2}>
            <StepLabel StepIconComponent={InProgressStepper}>
              <div className={styles.confirmation_pending_stepper_label}>
                Your booking for
                <b className={styles.confirmation_pending_stepper_label_coloured}>
                  {summary[0]?.origin} - {summary[0]?.destination}
                </b>
                is in progress.
              </div>
            </StepLabel>
            <div className={styles.confirmation_pending_stepper_label_description}>
              Our team is currently working on it and will notify you as soon as it is confirmed within the next 45
              minutes.
            </div>
          </Step>
        </Stepper>
      </div>

      {hours === 0 && remainingMinutes >= 0 && remainingMinutes <= 45 ? (
        <div className={styles.credits_message_container}>
          <div className={styles.credits_message_icon}>
            <MinutesTimerIcon />
          </div>
          <div className={styles.credits_message_text}>
            Our team is currently working on it, and will notify you as soon as it is confirmed within the next
            <b className={styles.credits_message_time}>
              0{hours}:{remainingMinutes} minutes.
            </b>
            <span className={styles.space}>
              If your booking is not confirmed, udChalo will automatically process a refund.
            </span>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default ConfirmationPendingStepper;
