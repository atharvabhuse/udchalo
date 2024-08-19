import { useForm } from 'react-hook-form';
import { Switch } from '@mui/material';
import CertInCertified from '@uc/assets/images/certIn_certified.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { usePostAddTraveller } from '@uc/services/network';
import styles from './add-traveler-card.module.scss';
import {GenderSelectionPanel} from '../gender-selection-panel/gender-selection-panel';

/* eslint-disable-next-line */
export interface AddTravelerCardProps {}

export function AddTravelerCard({ cancelCallback, addNewTravelerCallback }: any) {
  const form = useForm({
    defaultValues: {
      gender: '',
      firstAndMiddleName: '',
      lastname: '',
      defence: '',
    },
  });

  const [addTraveller, setAddTraveller] = useState({
    firstAndMiddleName: '',
    lastname: '',
    gender: '',
  });

  const payload = {
    title: 'mr',
    firstName: addTraveller.firstAndMiddleName?.split(' ')[0],
    lastName: addTraveller.lastname,
    middleName: addTraveller.firstAndMiddleName?.split(' ')[1],
    dateOfBirth: '1999-07-19T18:30:00.000Z',
    serviceNumber: null,
    gender: addTraveller.gender,
  };

  const addTravellerApiMutation = usePostAddTraveller(payload);
  const [selectedGenderError, setSelectedGenderError] = useState(false);

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const addTravelerHandler = async (data: any) => {
    setAddTraveller(data);
    if (data.gender === '') {
      setSelectedGenderError(true);
    } else {
      const api = await addTravellerApiMutation.mutateAsync();
      setSelectedGenderError(false);
      addNewTravelerCallback({ ...data, saveTraveler });
      cancelCallback(false);
    }
  };

  const cancelHandler = () => {
    cancelCallback(false);
  };

  const [saveTraveler, setSaveTraveler] = useState(true);

  const [selectedGender, setSelectedGender] = useState('');

  const handlerGenderClick = (gender: string) => {
    setSelectedGender(gender);
    form.setValue('gender', gender);
  };

  return (
    <form onSubmit={handleSubmit(addTravelerHandler)} className={styles.add_traveller_container} noValidate>
      <div className={styles.add_traveller_heading}>Add Traveler</div>
      <GenderSelectionPanel
        selectedGender={selectedGender}
        handlerGenderClick={handlerGenderClick}
        showCertInCertified
      />
      {selectedGenderError === true && <p className={styles.error_message}>This field is required</p>}

      <div className={styles.add_traveller_input_row}>
        <div className={styles.input_box}>
          <TextField
            id="outlined-basic"
            label="First and Middle Name"
            variant="outlined"
            className={styles.add_traveller_inp}
            {...register('firstAndMiddleName', {
              required: 'This is required field',
            })}
            placeholder="First and Middle Name"
          />
          <p className={styles.error_message}>{errors.firstAndMiddleName?.message}</p>
        </div>
        <div className={styles.input_box}>
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            className={styles.add_traveller_inp}
            {...register('lastname', {
              required: 'This is required field',
            })}
            placeholder="Last Name"
          />
          <p className={styles.error_message}>{errors.lastname?.message}</p>
        </div>

        <div className={styles.input_box}>
          <TextField
            id="outlined-basic"
            label="Defence ID"
            variant="outlined"
            className={styles.add_traveller_inp}
            {...register('defence', {
              required: 'This is required field',
              validate: val => (val.length < 5 ? 'Defence ID must be greater than equal to 5' : true),
            })}
            placeholder="Defence ID"
          />
          <p className={styles.error_message}>{errors.defence?.message}</p>
        </div>
      </div>

      <div className={styles.save_traveller_info_row}>
        <div className={styles.save_traveller_info_left}>
          <div className={styles.save_traveller_info_heading}>Save Travelers Information</div>
          <div className={styles.save_traveller_info_desc}>Save information to be prefilled next time</div>
        </div>
        <div className={styles.save_traveller_info_right}>
          <Switch checked={saveTraveler} />
        </div>
      </div>

      <div className={styles.add_traveller_buttons_row}>
        <button type="button" onClick={cancelHandler} className={styles.cancel_btn}>
          Cancel
        </button>
        <button type="submit" className={styles.add_traveller_btn}>
          Add Traveler
        </button>
      </div>
    </form>
  );
}

export default AddTravelerCard;

// function GenderSelectionPanel({selectedGender, handlerGenderClick} : any) {
//   return <div className={styles.add_traveller_gender_row_left}>
//     <div
//       className={`${styles.gender} ${selectedGender === 'male' ? styles.gender_checked : ''}`}
//       onClick={() => handlerGenderClick('male')}>
//       Male
//     </div>
//     <div
//       className={`${styles.gender} ${selectedGender === 'female' ? styles.gender_checked : ''}`}
//       onClick={() => handlerGenderClick('female')}>
//       Female
//     </div>
//     <div
//       className={`${styles.gender} ${selectedGender === 'transgender' ? styles.gender_checked : ''}`}
//       onClick={() => handlerGenderClick('transgender')}>
//       Transgender
//     </div>
//   </div>;
// }
