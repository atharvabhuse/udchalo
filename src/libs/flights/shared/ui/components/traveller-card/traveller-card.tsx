// import { ArrowRight } from '@uc/libs/shared/ui';
import { ArrowRight } from '@uc/assets/images';
import { Checkbox } from '@mui/material';
import styles from './traveller-card.module.scss';

export interface TravellerCardProps {
  name: string;
  typeOfTraveller: string;
  gender: string;
  checked?: boolean;
  editMode?: boolean;
}

export function TravellerCard(props: TravellerCardProps) {
  const { editMode, checked, gender, name, typeOfTraveller } = props;
  return (
    <div className={styles.traveller_card}>
      <div className={styles.passenger_container}>
        <div className={styles.passengers_blue} />
        {editMode && <Checkbox checked={checked} inputProps={{ 'aria-label': 'controlled' }} />}
        <div className={styles.passenger_text_container}>
          <div className={styles.passenger_text}>
            {name} ({gender.toLowerCase() === 'male' ? 'M' : 'F'})
          </div>
          <div className={styles.adult_count}>{typeOfTraveller}</div>
        </div>
        <ArrowRight className={styles.passenger_arrow} />
      </div>
    </div>
  );
}
