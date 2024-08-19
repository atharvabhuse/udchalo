import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import UcCard from '../uc-card/uc-card';
import styles from './add-insurance.module.scss';

export function AddInsurance() {
  const travelInsuranceConfig = {
    heading: 'Add Travel Insurance',
    description: 'Add travel insurance and secure your trip at just ₹199 per traveler',
    image: '',
    read: true,
    background_color: '#e5eef3',
    inputFields: [],
  };

  return (
    <UcCard className={styles.cb_card}>
      <FormControlLabel
        control={<Checkbox />}
        label={<span className={styles.cb_title}>{travelInsuranceConfig.heading}</span>}
      />
      <div className={styles.cb_description}>{travelInsuranceConfig.description}</div>
    </UcCard>
  );
}
