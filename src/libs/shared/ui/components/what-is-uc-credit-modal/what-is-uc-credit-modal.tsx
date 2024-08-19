import { Modal, Paper } from '@mui/material';
import { CloseIcon } from '@uc/libs/shared/ui';
import styles from './what-is-uc-credit-modal.module.scss';

/* eslint-disable-next-line */
export interface WhatIsUcCreditModalProps {
  open: boolean;
  handleClose: (event: any) => void;
}

export function WhatIsUcCreditModal({ open, handleClose }: WhatIsUcCreditModalProps) {
  return (
    <Modal open={open} onClose={handleClose} className={styles.what_is_uc_credit_modal}>
      <>
        <div className={styles.close_btn}>
          <CloseIcon onClick={handleClose} width={27} height={25} />
        </div>
        <Paper className={styles.paper}>
          <div className={styles.main_heading}>What is udChalo Credits</div>
          <div className={styles.description}>
            <div className={styles.description_point}>
              <div className={styles.circle}>1</div>
              <div className={styles.description_text}>udChalo credits can be used to book trips on udChalo.</div>
            </div>
            <div className={styles.description_point}>
              <div className={styles.circle}>2</div>
              <div className={styles.description_text}>
                It includes failed booking payments and refunds from previous trips.
              </div>
            </div>
            <div className={styles.description_point}>
              <div className={styles.circle}>3</div>
              <div className={styles.description_text}>
                No need to wait for refunds to be credited back to bank account to pay for new bookings on udChalo.
              </div>
            </div>
            <div className={styles.description_point}>
              <div className={styles.circle}>4</div>
              <div className={styles.description_text}>
                The entire credit balance can be refunded back to card/account anytime.
              </div>
            </div>
          </div>
        </Paper>
      </>
    </Modal>
  );
}

export default WhatIsUcCreditModal;
