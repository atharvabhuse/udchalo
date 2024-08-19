import { useSharedAppStateContext } from '@uc/libs/shared/ui';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { apiUrls } from '@uc/services/network/api-endpoints';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs, { Dayjs } from 'dayjs';
import { retrieveAndDecryptFromLocalStorage } from '@uc/services/network';
import { UDCHALO_TOKEN } from '@uc/utils/constants';
import { MyProfileConstants } from '../my-profile/my-profile.constants';
import { DeleteTravelerModal } from '../delete-traveler-modal/delete-traveler-modal';
import { convertTimeStampToDayjs } from '../uc-date-picker/uc-date-picker.utils';
import styles from './uc-profile-saved-traveler-card.module.scss';

export interface UcProfileSavedTravelerCardProps {
  savedTraveler: any;
  addedTravelerCallback: any;
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
  age: number;
}

interface UpdatedData {
  firstAndMiddleName: string;
  lastname: string;
  gender: string;
  age: number;
}

export function UcProfileSavedTravelerCard({
  savedTraveler,
  addedTravelerCallback,
  modifyTravelerDataHandler,
  key,
}: any) {
  const { userData }: any = useSharedAppStateContext();
  const today = dayjs();
  const [checked, setChecked] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState<UpdatedInfo | undefined>();
  const [saveTraveler, setSaveTraveler] = useState(true);
  const [selectedGender, setSelectedGender] = useState();

  const updateTravelerApiHandler = async userData => {
    const config = {
      headers: {
        Udchalotoken: retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN),
      },
    };

    const api = await axios.post(
      apiUrls.postUpdateTraveler,
      {
        title: selectedGender === 'male' ? 'mr' : 'ms',
        firstName: userData?.firstAndMiddleName?.split(' ')[0],
        lastName: userData?.lastname,
        middleName: userData?.firstAndMiddleName?.split(' ')[1] || '',
        dateOfBirth: userData?.dateOfBirth,
        serviceNumber: null,
        gender: userData?.gender,
        travellerId: savedTraveler?.travellerId,
        passportNumber: userData?.passportNumber,
        passportIssuingDate: userData?.passportIssuingDate,
        passportExpiryDate: userData?.passportExpiryDate,
      },
      config
    );

    setUpdatedInfo(api.data.response);
    modifyTravelerDataHandler();
  };

  const ref = useRef<HTMLInputElement>(null);

  const [updatedData, setUpdatedData] = useState<UpdatedData | undefined>();
  const [toggle, setToggle] = useState(true);

  const updateSavedTravellerData = async (data: any) => {
    if (toggle === true) {
      await updateTravelerApiHandler(data);
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
      age: 0,
      dateOfBirth: '',
      passportNumber: '',
      passportIssuingDate: '',
      passportExpiryDate: '',
      placeOfBirth: '',
      nationality: '',
    },
  });
  const { register, handleSubmit, formState, reset, watch } = form;
  const { errors } = formState;

  const resetSavedTravelerData = () => {
    reset({
      firstAndMiddleName: `${savedTraveler?.name?.firstName} ${savedTraveler?.name?.middleName || ''}`,
      lastname: savedTraveler?.name?.lastName,
      age: savedTraveler?.age,
      gender: savedTraveler?.gender,
      dateOfBirth: savedTraveler?.dateOfBirth,
      passportNumber: savedTraveler?.passportNumber,
      passportIssuingDate: savedTraveler?.passportIssuingDate,
      passportExpiryDate: savedTraveler?.passportExpiryDate,
      placeOfBirth: '',
      nationality: '',
    });
    setSelectedGender(savedTraveler?.gender);
  };

  useEffect(() => {
    resetSavedTravelerData();
  }, [savedTraveler]);

  const handleAccordionChange = () => {
    setChecked(!checked);
    resetSavedTravelerData();
  };

  const handlerGenderClick = gender => {
    setSelectedGender(gender);
    form.setValue('gender', gender);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteIconClick = (event: any) => {
    event.stopPropagation();
    setShowDeleteModal(true);
  };

  const callDeleteTravelerApi = async (travellerId: string) => {
    const config = {
      headers: {
        Udchalotoken: retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN),
      },
    };

    const api = await axios.get(apiUrls.deleteTraveler + travellerId, config);

    modifyTravelerDataHandler();
  };

  const handleDeleteOkClick = async (event: any, savedTravelerVar: string): Promise<void> => {
    event.stopPropagation();
    setShowDeleteModal(false);
    await callDeleteTravelerApi(savedTravelerVar);
  };

  const handleDeleteModalClose = (event: any) => {
    event.stopPropagation();
    setShowDeleteModal(false);
  };

  const setDob = (date: any): void => {
    form.setValue('dateOfBirth', date.format('DD-MM-YYYY'));
  };

  const setPassportIssuingDate = (date: any): void => {
    form.setValue('passportIssuingDate', date.format('DD-MM-YYYY'));
  };

  const setPassportExpiryDate = (date: any): void => {
    form.setValue('passportExpiryDate', date.format('DD-MM-YYYY'));
  };

  return (
    <Accordion key={key} expanded={checked} className={styles.saved_traveller_card}>
      <AccordionSummary onClick={handleAccordionChange} className={styles.saved_traveller_card_summary}>
        <div className={styles.saved_traveller_row}>
          <div className={styles.saved_traveller_info}>
            <input className={styles.saved_traveller_inp} type="checkbox" checked={checked} ref={ref} />
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
              <div className={styles.saved_traveller_desc}>
                {savedTraveler?.type} |{savedTraveler?.age}
              </div>
            </div>
          </div>
          <div className={styles.edit_icon_container}>
            <IconButton className={styles.edit_icon}>
              {checked ? <DeleteIcon onClick={handleDeleteIconClick} /> : <EditIcon />}
            </IconButton>
            <DeleteTravelerModal
              open={showDeleteModal}
              handleClose={handleDeleteModalClose}
              handleOkClick={(event: any) => handleDeleteOkClick(event, savedTraveler?.travellerId)}
            />
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails className={styles.saved_traveller_card_details}>
        <form
          onSubmit={() => handleSubmit(updateSavedTravellerData)}
          className={styles.add_traveller_container}
          noValidate>
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
                label="Age"
                variant="outlined"
                type="number"
                className={styles.add_traveller_inp}
                {...register('age', {
                  required: 'Age is required',
                  min: {
                    value: 0,
                    message: 'Age must be a positive number',
                  },
                  max: {
                    value: 120,
                    message: 'Age cannot be greater than 120',
                  },
                })}
                placeholder="Age"
              />
              <p className={styles.error_message}>{errors.age?.message}</p>
            </div>
            <div className={styles.input_box}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={styles.add_traveller_inp}
                  label="Date of Birth"
                  value={convertTimeStampToDayjs(watch('dateOfBirth'))}
                  disableFuture
                  format={MyProfileConstants.DATE_FORMATTER}
                  onChange={setDob}
                />
              </LocalizationProvider>
            </div>

            <div className={styles.input_box}>
              <TextField
                id="outlined-basic"
                label="Passport Number"
                variant="outlined"
                className={styles.add_traveller_inp}
                {...register('passportNumber')}
                placeholder="Passport Number"
              />
            </div>

            <div className={styles.input_box}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={styles.add_traveller_inp}
                  label="Passport Issuing Date"
                  value={convertTimeStampToDayjs(watch('passportIssuingDate'))}
                  disableFuture
                  format={MyProfileConstants.DATE_FORMATTER}
                  onChange={setPassportIssuingDate}
                />
              </LocalizationProvider>
            </div>
            <div className={styles.input_box}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={styles.add_traveller_inp}
                  label="Passport Expiry Date"
                  value={convertTimeStampToDayjs(watch('passportExpiryDate'))}
                  disablePast
                  format={MyProfileConstants.DATE_FORMATTER}
                  onChange={setPassportExpiryDate}
                />
              </LocalizationProvider>
            </div>

            <div className={styles.input_box}>
              <TextField
                id="outlined-basic"
                label="Place of Birth"
                variant="outlined"
                className={styles.add_traveller_inp}
                {...register('placeOfBirth')}
                placeholder="Place of Birth"
              />
              <p className={styles.error_message}>{errors.placeOfBirth?.message}</p>
            </div>

            <div className={styles.input_box}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Nationality</InputLabel>
                <Select
                  value={watch('nationality')}
                  label="Nationality"
                  error={!!errors.nationality}
                  {...register('nationality')}>
                  {userData?.nationalityOptions?.map((nationality: string, index: number) => (
                    <MenuItem value={nationality} key={`nationality-${index}`}>
                      {nationality}
                    </MenuItem>
                  ))}
                </Select>
                {errors.nationality && <p style={{ color: 'red' }}>{errors.nationality.message}</p>}
              </FormControl>
            </div>
          </div>
          <div className={styles.add_traveller_buttons_row}>
            <div className={styles.flex_2}>
              <Button className={styles.cancel_btn} type="button" onClick={resetSavedTravelerData} fullWidth>
                Cancel
              </Button>
            </div>
            <div className={styles.flex_2}>
              <Button className={styles.add_traveller_btn} type="submit" fullWidth>
                Update Details
              </Button>
            </div>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
}

export default UcProfileSavedTravelerCard;
