import { Button, IconButton, Modal, Paper } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { CloseIcon } from '@uc/libs/shared/ui';
import styles from './delete-account-modal.module.scss';

/* eslint-disable-next-line */
export interface DeleteAccountModalProps {
  open: boolean;
  handleOkClick?: (event: any) => void;
  handleClose?: (event: any) => void;
}

export function DeleteAccountModal({ open, handleOkClick, handleClose }: DeleteAccountModalProps) {
  const handleModalClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <Modal open={open} onClose={handleClose} className={styles.delete_traveler_modal}>
      <div className={styles.modal_content} onClick={handleModalClick}>
        <div className={styles.close_btn}>
          <CloseIcon onClick={handleClose} width={27} height={25} />
        </div>
        <Paper className={styles.paper}>
          <IconButton className={styles.deleteIcon}>
            <WarningAmberIcon fontSize="large" />
          </IconButton>
          <div className={styles.main_description_container}>
            <div className={styles.main_description}>Are you sure you want to delete your account?</div>
            <div className={styles.sub_description}>
              Once deleted you will lose all your bookings history, data will be deleted.
            </div>
          </div>

          <div className={styles.add_traveller_buttons_row}>
            <div className={styles.flex_2}>
              <Button className={styles.cancel_btn} onClick={handleClose} fullWidth>
                No
              </Button>
            </div>
            <div className={styles.flex_2}>
              <Button className={styles.add_traveller_btn} onClick={handleOkClick} fullWidth>
                Yes
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </Modal>
  );
}

export default DeleteAccountModal;
