import CertInCertified from '@uc/assets/images/certIn_certified.svg';
import styles from './gender-selection-panel.module.scss';

export interface GenderSelectionPanelProps {}

export function GenderSelectionPanel({
  selectedGender,
  handlerGenderClick,
  showCertInCertified,
}: {
  selectedGender: string;
  handlerGenderClick: (gender: string) => void;
  showCertInCertified: boolean;
}) {
  return (
    <div className={styles.add_traveller_gender_row}>
      <div className={styles.add_traveller_gender_row_left}>
        <button type='button'
          className={`${styles.gender} ${selectedGender === 'male' ? styles.gender_checked : ''}`}
          onClick={() => handlerGenderClick('male')}>
          Male
        </button>
        <button type='button'
          className={`${styles.gender} ${selectedGender === 'female' ? styles.gender_checked : ''}`}
          onClick={() => handlerGenderClick('female')}>
          Female
        </button>
        <button type='button'
          className={`${styles.gender} ${selectedGender === 'transgender' ? styles.gender_checked : ''}`}
          onClick={() => handlerGenderClick('transgender')}>
          Transgender
        </button>
      </div>
      <div className={styles.add_traveller_gender_row_right}>
        {showCertInCertified && (
          <>
            <CertInCertified />
            <div>CERT-In certified</div>
          </>
        )}
      </div>
    </div>
  );
}

export default GenderSelectionPanel;
