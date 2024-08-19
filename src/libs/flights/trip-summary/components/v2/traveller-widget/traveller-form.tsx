'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Container,
  FormControlLabel,
  Switch,
  TextField,
  ToggleButtonGroup,
  styled,
} from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import { DropdownArrowGreenIcon, UcButton } from '@uc/libs/shared/ui';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IGenderOptions, IPassenger } from './models';
import styles from './traveller-form.module.scss';

const ToggleButton = styled(MuiToggleButton)({
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: '#D9ECE3',
  },
});

export const genderOptions: IGenderOptions = {
  male: { label: 'Male', value: 'male', code: 'M' },
  female: { label: 'Female', value: 'female', code: 'F' },
  transgender: { label: 'Transgender', value: 'transgender', code: 'T' },
};

export interface TravellerFormData {
  gender: string;
  serviceNumber: string;
  saveTravellerInfo: boolean;
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
    title?: string;
  };
}

export interface TravellerFormProps {
  isDefenceIdRequired: boolean;
  formTitle: string;
  formData: IPassenger;
  selected: boolean;
  onSelect: (passenger: IPassenger) => void;
  onDeselect: (passenger: IPassenger) => void;
  // onSubmit: (formData: IPassenger) => void;
}

export default function TravellerForm(props: TravellerFormProps) {

  const { isDefenceIdRequired, formTitle, formData, selected: preselected, onSelect, onDeselect } = props;

  const [userData, setUserData] = useState<IPassenger>(formData);
  const [selected, setSelected] = useState<boolean>(preselected);

  const isNewUser = userData ? userData?.name.firstName.length === 0 : false;
  const [expanded, setExpanded] = useState<boolean>(isNewUser);
  const {
    trigger,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPassenger>({ defaultValues: userData || { doNotSaveTraveller: true, name: {} } });

  const toggleExpanded = () => setExpanded(!expanded);

  /**
   * Allow selection if the form is valid
   * If invalid, then we expand the form and discard the selection
   */
  const toggleUserSelection = async () => {
    if (userData) {
      const newSelectedState = !selected;
      if (newSelectedState) {
        const isValid = await trigger();
        if (isValid) {
          onSelect(userData);
          setSelected(newSelectedState);
        } else {
          setExpanded(true);
        }
      } else {
        onDeselect(userData);
        setSelected(newSelectedState);
      }
    }
  };

  const onFormSubmit: SubmitHandler<IPassenger> = (data) => {
    setUserData(data);
    setExpanded(false);
    setSelected(true);
    onSelect(data);
    // onSubmit(data);
  };

  const onFormCancel = () => console.log('on cancel');
  const submitLabel = isNewUser ? 'Add Traveller' : 'Update Details';
  const isAdult = userData.passengerType === 'adult';

  return (
    <Accordion expanded={expanded} className={styles.card}>
      <AccordionSummary expandIcon={<DropdownArrowGreenIcon onClick={toggleExpanded}/>}>
      <Container>
        { isNewUser ?
          <div className={styles.form_title}>{formTitle}</div> :
          <>
            <FormControlLabel control={<Checkbox checked={selected} onChange={toggleUserSelection}/>} label={formTitle} />
            <div className={styles.passenger_type}>{userData?.passengerType}</div>
          </>
          }
        </Container>
      </AccordionSummary>
      <AccordionDetails>
        <form className={styles.add_traveller_container} onSubmit={handleSubmit(onFormSubmit)}>
          <div className={styles.add_traveller_gender_row}>
            <Controller
              name="gender"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ToggleButtonGroup
                  className={styles.add_traveller_gender_row_left}
                  exclusive
                  aria-label="text alignment"
                  {...field}>
                  {Object.values(genderOptions).map(go => (
                    <ToggleButton
                      disableRipple
                      key={go.value}
                      className={styles.gender}
                      value={go.value}
                      aria-label="left aligned">
                      {go.label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              )}
            />
            <div className={styles.add_traveller_gender_row_right}>
              {/* <CertInCertified /> */}
              <div>CERT-In certified</div>
            </div>
          </div>

          <div className={styles.add_traveller_input_row}>
            <TextField
              color="secondary"
              variant="outlined"
              label="First and Middle Name"
              placeholder="First and Middle Name"
              error={errors?.name?.firstName?.type === 'required'}
              {...register('name.firstName', { required: true })}
            />
            <TextField
              color="secondary"
              variant="outlined"
              label="Last Name"
              placeholder="Last Name"
              error={errors?.name?.lastName?.type === 'required'}
              {...register('name.lastName', { required: true })}
            />
            {
              isAdult && <TextField
                color="secondary"
                variant="outlined"
                label="Defence ID"
                placeholder="Defence ID"
                error={errors?.serviceNumber?.type === 'required'}
                {...register('serviceNumber', { required: isDefenceIdRequired })}
              />
            }
          </div>

          <div className={styles.save_traveller_info_row}>
            <div className={styles.save_traveller_info_left}>
              <div className={styles.save_traveller_info_heading}>Save Travelers Information</div>
              <div className={styles.save_traveller_info_desc}>Save information to be prefilled next time</div>
            </div>
            <div className={styles.save_traveller_info_right}>
              <Controller
                name="doNotSaveTraveller"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Switch color="secondary" checked={value} onChange={onChange} />
                )}
              />
            </div>
          </div>

          <div className={styles.add_traveller_buttons_row}>
            <UcButton
              variant="outlined"
              color="secondary"
              type="button"
              className={styles.cancel_btn}
              onClick={onFormCancel}>
              Cancel
            </UcButton>
            <UcButton type="submit" variant="contained" className={styles.add_btn}>
              {submitLabel}
            </UcButton>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
}
