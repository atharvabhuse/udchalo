import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import styles from './traveller-contact-details-card.module.scss';

/* eslint-disable-next-line */
export interface TravellerContactDetailsCardProps {}

export function TravellerContactDetailsCard({ register, formState }: any) {
  const submitHandler = () => {};
  const { errors } = formState;

  return (
    <form className={styles.contact_details_box}>
      <div className={styles.contact_details_heading}>Contact Details</div>
      <div className={styles.contact_details_desc}>Booking Details will be sent here</div>
      <div className={styles.contact_details_inp_row}>
        <div className={styles.input_box_contact_details_inp}>
          <TextField
            label="First Name"
            variant="outlined"
            id="firstname"
            className={styles.contact_details_inp}
            {...register('firstname', {
              required: { value: true, message: 'This is required field' },
            })}
            placeholder="First Name"
          />
          <p className={styles.error_message}>{errors.firstname?.message}</p>
        </div>
        <div className={styles.input_box_contact_details_inp}>
          <TextField
            id="phonenumber"
            label="Phone Number"
            variant="outlined"
            className={styles.contact_details_inp}
            {...register('phonenumber', {
              required: 'This is required field',
              pattern: {
                value: /^[789]\d{9}$/,
                message: 'Please enter valid phone number',
              },
            })}
            placeholder="Phone Number"
          />
          <p className={styles.error_message}>{errors.phonenumber?.message}</p>
        </div>
        <div className={styles.input_box_contact_details_inp}>
          <TextField
            label="Email"
            variant="outlined"
            id="email"
            className={styles.contact_details_inp}
            {...register('email', {
              required: 'This is required field',
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid Email',
              },
            })}
            placeholder="Email ID"
          />
          <p className={styles.error_message}>{errors.email?.message}</p>
        </div>
      </div>
      <div className={styles.checkbox_row}>
        <input
          id="receiveInfoOnWhatsApp"
          className={styles.contact_details_checkbox}
          type="checkbox"
          {...register('receiveInfoOnWhatsApp')}
        />
        <label htmlFor="receiveInfoOnWhatsApp" className={styles.contact_details_checkbox_desc}>
          Receive information on WhatsApp
        </label>
      </div>
    </form>
  );
}

export default TravellerContactDetailsCard;
