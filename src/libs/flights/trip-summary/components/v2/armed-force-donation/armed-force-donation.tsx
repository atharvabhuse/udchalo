import { Checkbox, FormControlLabel } from '@mui/material';
import { DonationComponentBgIntersectImage, UcCard } from '@uc/libs/shared/ui';
import { IArmedForceDonationResponse } from '@uc/services/network';
import styles from './armed-force-donation.module.scss';
import Link from 'next/link';

interface IArmedForceDonationProps {
  isDonationOpted: boolean;
  armedForceDonationData: IArmedForceDonationResponse;
  handleDonationOpted: (event: any) => void;
}

const armedForcesBattleConfig = {
  heading: 'Donate ₹5 to',
  description: 'For every rupee donated, udChalo will contribute the same amount. ',
};

function ArmedForceDonation(props: IArmedForceDonationProps) {
  const { isDonationOpted, armedForceDonationData, handleDonationOpted } = props;
  const { amount = 0, tncLink, welfarePageLink } = armedForceDonationData;
  return (
    <div className={styles.donation_card}>
      <div className={styles.donation_container}>
        <div className={styles.donation_heading}>
          <Checkbox checked={isDonationOpted} onClick={handleDonationOpted} />
          <span className={styles.donation_title}>
            Donate ₹{amount} to{' '}
            <Link href={welfarePageLink} className={styles.donation_link} target="_blank">
              Armed Forces Battle Casuality Welfare Fund
            </Link>
          </span>
        </div>
        <div className={styles.donation_description}>
          {armedForcesBattleConfig.description}
          {tncLink && (
            <Link href={tncLink} className={styles.donation_tnc_link} target="_blank">
              Read More
            </Link>
          )}
        </div>
      </div>
      <DonationComponentBgIntersectImage />
    </div>
  );
}

export default ArmedForceDonation;
