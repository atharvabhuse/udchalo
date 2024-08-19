import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Checkbox, Container } from '@mui/material';
import styles from './contact-details-form.module.scss';
import UcButton from '../../form-controls/uc-button/uc-button';

export interface ContactDetails {
  phoneNumber: string;
  email: string;
  receiveInfoOnWhatsApp: boolean;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
}

/* eslint-disable-next-line */
export interface ContactDetailsFormProps {
  showOverlay: boolean;
  contactDetails?: ContactDetails;
  onSubmit: (user: ContactDetails) => void;
  closeDrawer: (arg: boolean) => void;
}

export function ContactDetailsForm({ showOverlay, contactDetails, onSubmit, closeDrawer }: ContactDetailsFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactDetails>({ values: contactDetails });
  const submitHandler = (data: ContactDetails) => {
    onSubmit(data);
    closeDrawer(true);
  };

  return (
    <form className={styles.contact_details_box} onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.form_content}>
        <div className={styles.contact_details_heading}>Contact Details</div>
        <div className={styles.contact_details_desc}>Booking Details will be sent here</div>
        <div className={styles.form_row}>
          <TextField
            label="First Name"
            variant="outlined"
            id="firstName"
            className={styles.form_field}
            placeholder="First Name"
            {...register('name.firstName', {
              required: { value: true, message: 'This is required field' },
            })}
            error={errors?.name?.firstName?.type === 'required'}
            helperText={errors?.name?.firstName?.message}
          />

          <TextField
            id="phoneNumber"
            label="Phone Number"
            variant="outlined"
            className={styles.form_field}
            placeholder="Phone Number"
            {...register('phoneNumber', {
              required: 'This is required field',
              pattern: {
                value: /^[789]\d{9}$/,
                message: 'Please enter valid phone number',
              },
            })}
            error={errors.phoneNumber?.type === 'required' || errors.phoneNumber?.type === 'pattern'}
            helperText={errors.phoneNumber?.message}
          />

          <TextField
            label="Email"
            variant="outlined"
            id="email"
            className={styles.form_field}
            placeholder="Email ID"
            {...register('email', {
              required: 'This is required field',
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid Email',
              },
            })}
            error={errors.email?.type === 'required' || errors.email?.type === 'pattern'}
            helperText={errors.email?.message}
          />
        </div>

        <div className={styles.checkbox_row}>
          <Checkbox sx={{ padding: 0 }} id="receiveInfoOnWhatsApp" {...register('receiveInfoOnWhatsApp')} />
          <label htmlFor="receiveInfoOnWhatsApp" className={styles.contact_details_checkbox_desc}>
            Receive information on WhatsApp
          </label>
        </div>
      </div>

      <div className={styles.button_row}>
        <UcButton variant="contained" type="submit" className={styles.add_btn}>
          Continue
        </UcButton>
      </div>

      {showOverlay && <div className={styles.form_overlay} />}
    </form>
  );
}

export default ContactDetailsForm;
