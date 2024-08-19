import { IFlightBannerResponse } from '@uc/services/network';
import Image from 'next/image';
import styles from './referral.module.scss';

interface ReferralProps {
  referralData: IFlightBannerResponse;
}

function Referral(props: ReferralProps) {
  const { referralData } = props;
  return (
    <div className={styles.main}>
      <div className={styles.referral_web}>
        {referralData && (
          <Image
            className={styles.referral_image}
            src={referralData?.banner_image_web?.data?.attributes?.url}
            width={referralData?.banner_image_web?.data?.attributes?.width}
            height={referralData?.banner_image_web?.data?.attributes?.height}
            alt={referralData?.banner_image_web?.data?.attributes?.name}
          />
        )}
      </div>
      <div className={styles.referral_msite}>
        {referralData && (
          <Image
            className={styles.referral_image}
            src={referralData?.banner_image?.data[0]?.attributes?.url}
            width={referralData?.banner_image?.data[0]?.attributes?.width}
            height={referralData?.banner_image?.data[0]?.attributes?.height}
            alt={referralData?.banner_image?.data[0]?.attributes?.name}
          />
        )}
      </div>
    </div>
  );
}

export default Referral;
