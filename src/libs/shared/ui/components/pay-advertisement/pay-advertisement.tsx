import PayLogo from '@uc/assets/images/pay_logo.svg';
import RupeeLogo from '@uc/assets/images/rupee_logo.svg';
import styles from './pay-advertisement.module.scss';

/* eslint-disable-next-line */
export interface PayAdvertisementProps {}

export function PayAdvertisement(props: PayAdvertisementProps) {
  return (
    <div className={styles.pay_advertisement}>
      <div className={styles.rupee_logo}>
        <RupeeLogo className={styles.rupeeLogo} />
      </div>
      <div className={styles.content}>
        <div className={styles.content_heading}>Buy Now and Pay Later</div>
        <div className={styles.content_desc}>Book your flight today and Pay later</div>
      </div>
      <div>
        <PayLogo className={styles.payLogo} />
      </div>
    </div>
  );
}

export default PayAdvertisement;
