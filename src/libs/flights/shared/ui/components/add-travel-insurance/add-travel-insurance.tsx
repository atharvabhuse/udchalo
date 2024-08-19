import { Checkbox, FormControlLabel } from '@mui/material';
import { InsuranceNivaBupaImg } from '@uc/assets/images';
import { UcCard } from '@uc/libs/shared/ui';
import styles from './add-travel-insurance.module.scss';
import { IFlightPriceListInsuranceDetails } from '@uc/services/network';

const travelInsuranceConfig = {
  heading: 'Add Travel Insurance',
  description: 'Add travel insurance and secure your trip at just ₹199 per traveler',
  image: '',
  read: true,
  background_color: '#e5eef3',
  inputFields: [],
};

interface ITravelInsuranceProps {
  isInsuranceOpted: boolean;
  handleInsuranceOpted: () => void;
  insuranceDetails: IFlightPriceListInsuranceDetails;
}

function AddTravelInsurance(props: ITravelInsuranceProps) {
  const { isInsuranceOpted, handleInsuranceOpted, insuranceDetails } = props;
  return (
    <UcCard className={styles.cb_card} style={{ backgroundColor: '#FAF8E7' }}>
      <div className={styles.box}>
        <FormControlLabel
          control={<Checkbox checked={isInsuranceOpted} onClick={handleInsuranceOpted} />}
          label={<span className={styles.cb_title}>{travelInsuranceConfig.heading}</span>}
        />
        <div className={styles.img_box}>
          <InsuranceNivaBupaImg />
        </div>
      </div>
      <div className={styles.dsc_box}>
        <div className={styles.cb_description}>
          Add travel insurance and secure your trip at just ₹{insuranceDetails?.netPremium || 0} per traveler
        </div>
        <div className={styles.txt}>Read more</div>
      </div>
    </UcCard>
  );
}

export default AddTravelInsurance;
