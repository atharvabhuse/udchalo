/* eslint-disable @typescript-eslint/no-misused-promises */
import CircularProgress from '@mui/material/CircularProgress';
import { ICoupon } from '@uc/services/network';
import Image from 'next/image';
import { useState } from 'react';
import styles from './discount-coupon-card.module.scss';

/* eslint-disable-next-line */
export interface DiscountCouponCardProps {
  coupon_details: ICoupon;
  applyCouponHandler: (coupon: ICoupon) => Promise<void>;
  isCouponApplyLoading?: boolean;
}

export function DiscountCouponCard({
  coupon_details,
  applyCouponHandler,
  isCouponApplyLoading,
}: DiscountCouponCardProps) {
  const applyCouponhandler = async () => {
    await applyCouponHandler(coupon_details);
  };

  const [copy, setCopy] = useState(false);

  const copyTextHandler = () => {
    setCopy(true);
    navigator?.clipboard?.writeText(coupon_details.code);
    setTimeout(() => setCopy(false), 1500);
  };

  const [desc, setDesc] = useState(
    coupon_details &&
      (coupon_details?.content?.shortDesc[0] || [])?.slice(0, Math.ceil(coupon_details.content.shortDesc[0].length / 2))
  );
  const [knowMore, setKnowMore] = useState('Know More');

  const knowMoreHandler = () => {
    setDesc(
      coupon_details &&
        (coupon_details?.content?.shortDesc[0] || []).slice(0, coupon_details?.content?.shortDesc[0]?.length)
    );
    setKnowMore('');
  };

  const isCouponActiveOrApplicable = coupon_details?.active || coupon_details?.isApplicable;

  return (
    <div
      className={
        isCouponActiveOrApplicable ? `${styles.coupon_card}` : `${styles.coupon_card} ${styles.offer_not_available}`
      }>
      <div className={styles.coupon_img_box}>
        <Image
          alt="coupon image"
          width={40}
          height={40}
          src={coupon_details && coupon_details?.voucherContent?.logo ? coupon_details?.voucherContent?.logo : ''}
        />
      </div>
      <div className={styles.coupon_content}>
        <div className={styles.coupon_content_heading_row}>
          <div className={styles.coupon_heading}>Get ₹{coupon_details?.actual_off} Off</div>
          {isCouponApplyLoading ? (
            <CircularProgress size={20} />
          ) : (
            <div>
              <button
                type="button"
                className={isCouponActiveOrApplicable ? styles.coupon_apply : styles.coupon_apply_disabled}
                onClick={applyCouponhandler}
                disabled={!isCouponActiveOrApplicable}>
                Apply
              </button>
            </div>
          )}
        </div>

        <div className={styles.coupon_content_desc_row}>
          <p>
            {desc}.
            <button
              type="button"
              className={isCouponActiveOrApplicable ? styles.know_more : styles.know_more_disabled}
              onClick={knowMoreHandler}
              disabled={!isCouponActiveOrApplicable}>
              {knowMore}
            </button>
          </p>
        </div>

        <div className={styles.coupon_content_button_row}>
          <div className={styles.save_rupees_text}>Save ₹{coupon_details?.actual_off}</div>

          <div className={styles.coupon_content_tag_row}>
            <div className={styles.tc_apply}>T&C Apply</div>
            <button
              type="button"
              onClick={copyTextHandler}
              className={isCouponActiveOrApplicable ? styles.coupon : styles.coupon_disabled}
              disabled={!isCouponActiveOrApplicable}>
              {copy && isCouponActiveOrApplicable && <div className={styles.copy}>Copied</div>}
              {coupon_details?.code}
            </button>
          </div>
        </div>
        {coupon_details && coupon_details?.day_offer_description && (
          <div className={styles.coupon_content_particular_day_offer}>{coupon_details?.day_offer_description}</div>
        )}
      </div>
    </div>
  );
}

export default DiscountCouponCard;
