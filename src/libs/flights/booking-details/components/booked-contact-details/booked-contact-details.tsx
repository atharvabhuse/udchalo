import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './booked-contact-details.module.scss';

export interface BookedContactDetailsPropTypes {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  isReadOnly?: boolean;
}

export function BookedContactDetails({ fullName, phoneNumber, email, isReadOnly }: BookedContactDetailsPropTypes) {
  return (
    <div className={styles.accordion_root}>
      {!isReadOnly ? (
        <Accordion className={styles.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <span className={styles.header}>Contact Details</span>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.sub_header}>Booking Details have been sent to the following contact</div>
            <div className={styles.form_name}>
              <span className={styles.label}>Full Name:</span>
              <span className={styles.value}>{fullName}</span>
            </div>
            <div className={styles.form_name}>
              <span className={styles.label}>Phone Number:</span>
              <span className={styles.value}>
                +91
                {phoneNumber}
              </span>
            </div>
            <div className={styles.form_name}>
              <span className={styles.label}>Email ID:</span>
              <span className={styles.email}>{email}</span>
            </div>
          </AccordionDetails>
        </Accordion>
      ) : (
        <div className={styles.read_only_container}>
          <span className={styles.header_read_only}>Contact Details</span>
          <div className={styles.sub_header_read_only}>Booking Details have been sent to the following contact</div>
          <div className={styles.form_name}>
            <span className={styles.read_only_label}>Full Name:</span>
            <span className={styles.read_only_value}>{fullName}</span>
          </div>
          <div className={styles.form_name}>
            <span className={styles.read_only_label}>Phone Number:</span>
            <span className={styles.read_only_value}>
              +91
              {phoneNumber}
            </span>
          </div>
          <div className={styles.form_name}>
            <span className={styles.read_only_label}>Email ID:</span>
            <span className={styles.read_only_email}>{email}</span>
          </div>
        </div>
      )}
    </div>
  );
}
export default BookedContactDetails;
