import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Button, IconButton, Modal, Paper, Typography } from '@mui/material';
import styles from './delete-traveler-modal.module.scss';

/* eslint-disable-next-line */
export interface DeleteTravelerModalProps {
  open: boolean;
  handleOkClick?: (event: any) => void;
  handleClose?: (event: any) => void;
}

export function DeleteTravelerModal({ open, handleOkClick, handleClose }: DeleteTravelerModalProps) {
  const handleModalClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <Modal open={open} onClose={handleClose} className={styles.delete_traveler_modal}>
      <div
  className={styles.modal_content}
  onClick={handleModalClick}
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleModalClick(event);
    }
  }}
  role="button"
  tabIndex={0}
>
        <Paper className={styles.paper}>
          <IconButton className={styles.deleteIcon}>
            <WarningAmberIcon fontSize="large" />
          </IconButton>
          <div className="main_description_container">
            <Typography className="main_description">Are you sure you want to delete the traveler?</Typography>
          </div>

          <div className={styles.add_traveller_buttons_row}>
            <div className={styles.flex_2}>
              <Button className={styles.cancel_btn} onClick={handleClose} fullWidth>
                Cancel
              </Button>
            </div>
            <div className={styles.flex_2}>
              <Button className={styles.add_traveller_btn} onClick={handleOkClick} fullWidth>
                Delete
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </Modal>
  );
}

export default DeleteTravelerModal;
