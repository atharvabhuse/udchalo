import { Accordion, AccordionSummary, AccordionDetails, Switch } from '@mui/material';
import CertInCertified from '@uc/assets/images/certIn_certified.svg';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { usePostUpdateTraveller, retrieveAndDecryptFromLocalStorage } from '@uc/services/network';
import { UDCHALO_TOKEN } from '@uc/utils/constants';
import styles from './uc-saved-traveller-card.module.scss';

/* eslint-disable-next-line */
export interface UcSavedTravellerCardProps {
  savedTraveler: any;
  addedTravelerCallback: any;
  removeTraveler: any;
}

interface UpdatedInfo {
  title: string;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  serviceNumber: any;
  gender: string;
  travellerId: any;
}

interface UpdatedData {
  firstAndMiddleName: string;
  lastname: string;
  gender: string;
  defenceID: string;
}

interface UserData {
  firstAndMiddleName: string;
  lastname: string;
  gender: string;
  defenceID: string;
}

export function UcSavedTravellerCard({
  savedTraveler,
  addedTravelerCallback,
  removeTraveler,
}: UcSavedTravellerCardProps) {
  const [checked, setChecked] = useState(false);
  const checkboxHandler = () => {
    setChecked(!checked);
  };

  const [updatedInfo, setUpdatedInfo] = useState<UpdatedInfo | undefined>();

  const config = {
    Udchalotoken: retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN),
  };

  const [userData, setUserData] = useState({
    firstAndMiddleName: '',
    lastname: '',
    gender: '',
  });

  const payload = {
    title: 'mr',
    firstName: userData?.firstAndMiddleName?.split(' ')[0],
    lastName: userData?.lastname,
    middleName: userData?.firstAndMiddleName?.split(' ')[1],
    dateOfBirth: '1999-07-19T18:30:00.000Z',
    serviceNumber: null,
    gender: userData?.gender,
    travellerId: savedTraveler?.travellerId,
  };
  const [saveTraveler, setSaveTraveler] = useState(true);

  const updateTravellerApiMutation = usePostUpdateTraveller(payload, config);
  const [toggle, setToggle] = useState(true);

  const ref = useRef<HTMLInputElement>(null);

  const [updatedData, setUpdatedData] = useState<UpdatedData | undefined>();
  const addTravelerHandler = async (data: UserData) => {
    if (toggle === true) {
      setUserData(data);
      const api = await updateTravellerApiMutation.mutateAsync();
      setUpdatedInfo((api.data as any).response);
    }
    setUpdatedData(data);
    setChecked(false);
    if (ref.current && ref.current.checked) {
      addedTravelerCallback({ ...data, saveTraveler });
    }
  };

  const form = useForm({
    defaultValues: {
      firstAndMiddleName: '',
      lastname: '',
      gender: savedTraveler?.gender || '',
      defenceID: '',
      passportNumber: '',
      passportIssuingDate: '',
      passportExpiryDate: '',
    },
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;
  const [selectedGender, setSelectedGender] = useState('');

  useEffect(() => {
    reset({
      firstAndMiddleName: `${savedTraveler?.name?.firstName} ${savedTraveler?.name?.middleName || ''}`,
      lastname: updatedInfo?.lastName || savedTraveler?.name?.lastName,
      gender: savedTraveler?.gender,
    });
    setSelectedGender(savedTraveler?.gender);
  }, [removeTraveler, savedTraveler, reset, updatedInfo]);

  const handlerGenderClick = (gender: string) => {
    setSelectedGender(gender);
    form.setValue('gender', gender);
  };

  useEffect(() => {
    const travelerAdded =
      savedTraveler.name?.firstName === removeTraveler?.firstAndMiddleName.split(' ')[0] &&
      savedTraveler?.name?.lastName === removeTraveler.lastname;
    if (travelerAdded === true) {
      ref.current.checked = false;
      setChecked(false);
    }
  }, [removeTraveler]);

  const toggleHandler = () => {
    setToggle(!toggle);
  };
  return (
    <Accordion expanded={checked} className={styles.saved_traveller_card}>
      <AccordionSummary onClick={checkboxHandler} className={styles.saved_traveller_card_summary}>
        <div className={styles.saved_traveller_row}>
          <input className={styles.saved_traveller_inp} type="checkbox" ref={ref} />
          <div className={styles.saved_traveller_heading_col}>
            <div className={styles.saved_traveller_heading}>
              {updatedData
                ? `${updatedData?.firstAndMiddleName.split(' ')[0]} ${updatedData?.lastname} (
              ${updatedData?.gender && updatedData?.gender[0]?.toUpperCase()}
              )`
                : `${savedTraveler?.name?.firstName} ${savedTraveler?.name?.lastName} (
              ${savedTraveler?.gender && savedTraveler?.gender[0]?.toUpperCase()}
              )`}
            </div>
            <div className={styles.saved_traveller_desc}>{savedTraveler?.type}</div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails className={styles.saved_traveller_card_details}>
        <form onSubmit={() => handleSubmit(addTravelerHandler)} className={styles.add_traveller_container} noValidate>
          <div className={styles.add_traveller_heading}>Saved Traveler</div>
          <div className={styles.add_traveller_gender_row}>
            <div className={styles.add_traveller_gender_row_left}>
              <button
                type="button"
                className={`${styles.gender} ${selectedGender === 'male' ? styles.gender_checked : ''}`}
                onClick={() => handlerGenderClick('male')}>
                Male
              </button>
              <button
                type="button"
                className={`${styles.gender} ${selectedGender === 'female' ? styles.gender_checked : ''}`}
                onClick={() => handlerGenderClick('female')}>
                Female
              </button>
              <button
                type="button"
                className={`${styles.gender} ${selectedGender === 'transgender' ? styles.gender_checked : ''}`}
                onClick={() => handlerGenderClick('transgender')}>
                Transgender
              </button>
            </div>
            {errors.gender && <p className={styles.error_message}>This is required field</p>}
            <div className={styles.add_traveller_gender_row_right}>
              <CertInCertified />
              <div>CERT-In certified</div>
            </div>
          </div>
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
                {...register('defenceID', {
                  required: 'This is required field',
                  validate: val => (val.length < 5 ? 'Defence ID must be greater than equal to 5' : true),
                })}
                placeholder="Defence ID"
              />
              <p className={styles.error_message}>{errors.defenceID?.message}</p>
            </div>
          </div>

          <div className={styles.save_traveller_info_row}>
            <div className={styles.save_traveller_info_left}>
              <div className={styles.save_traveller_info_heading}>Save Travelers Information</div>
              <div className={styles.save_traveller_info_desc}>Save information to be prefilled next time</div>
            </div>
            <div className={styles.save_traveller_info_right}>
              <Switch checked={toggle} onClick={toggleHandler} />
            </div>
          </div>

          <div className={styles.add_traveller_buttons_row}>
            <button className={styles.add_traveller_btn} type="submit">
              Update Traveler
            </button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
}

export default UcSavedTravellerCard;
