import { ReactNode } from 'react';
import styles from './uc-promo.module.scss';

/* eslint-disable-next-line */
export interface UcPromoProps {
  icon: ReactNode;
  heading: string;
  desc: string;
}

function UcPromo(props: UcPromoProps) {
  const { icon, heading, desc } = props;
  const boldPromoCode = heading.split(' ')[0];
  const promoText = heading.split(' ').slice(1, heading.length).join(' ');
  return (
    <div className={styles.promo_container}>
      {icon}
      <div className={styles.promo_container_content}>
        <div className={styles.promo_heading}>
          <span className={styles.promo_bold}>{boldPromoCode} </span>
          {promoText}
        </div>
        <div className={styles.promo_desc}>{desc}</div>
      </div>
    </div>
  );
}

export default UcPromo;
