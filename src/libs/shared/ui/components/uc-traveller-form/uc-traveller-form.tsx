import { Switch, TextField, ToggleButtonGroup, styled } from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import { CertInCertified, UcButton, UcSwitch } from '@uc/libs/shared/ui';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styles from './uc-traveller-form.module.scss';

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Transgender', value: 'transgender' },
];

const ToggleButton = styled(MuiToggleButton)({
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: '#D9ECE3',
  },
});

export interface UserFormData {
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

/* eslint-disable-next-line */
export interface UcTravellerFormProps {
  userData?: UserFormData;
  submitLabel: string;
  onSubmit: (user: UserFormData) => void;
  onCancel: () => void;
}

export function UcTravellerForm({ userData, submitLabel, onSubmit, onCancel }: UcTravellerFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UserFormData>({ defaultValues: userData || { saveTravellerInfo: false, name: {} } });
  const onFormSubmit: SubmitHandler<UserFormData> = data => {
    onSubmit(data);
    if (!userData) {
      reset();
    }
  };
  const onFormCancel = () => onCancel();

  return (
    <form className={styles.add_traveller_container} onSubmit={()=>handleSubmit(onFormSubmit)}>
      <div className={styles.add_traveller_heading}>Add Traveler</div>
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
              {genderOptions.map(go => (
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
          <CertInCertified />
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
        <TextField
          color="secondary"
          variant="outlined"
          label="Defence ID"
          placeholder="Defence ID"
          {...register('serviceNumber')}
        />
      </div>

      <div className={styles.save_traveller_info_row}>
        <div className={styles.save_traveller_info_left}>
          <div className={styles.save_traveller_info_heading}>Save Travelers Information</div>
          <div className={styles.save_traveller_info_desc}>Save information to be prefilled next time</div>
        </div>
        <div className={styles.save_traveller_info_right}>
          <Controller
            name="saveTravellerInfo"
            control={control}
            render={({ field: { value, onChange } }) => (
              <UcSwitch color="secondary" checked={value} onChange={onChange} />
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
        <UcButton variant="contained" className={styles.add_btn}>
          {submitLabel ?? 'Add Traveller'}
        </UcButton>
      </div>
    </form>
  );
}

export default UcTravellerForm;
