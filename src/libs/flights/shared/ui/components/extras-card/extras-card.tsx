import { RightArrowIcon } from '@uc/libs/shared/ui';
import styles from './extras-card.module.scss';

export interface ExtrasCardProps {
  desc: string;
  heading: string;
  openPopupCallback: () => void;
}

export function ExtrasCard({ desc, heading, openPopupCallback }: any) {
  return (
    <div className={styles.extras_card} onClick={openPopupCallback}>
      <div className={styles.extras_card_left}>
        <div className={styles.extras_card_heading}>{heading}</div>
        <div className={styles.extras_card_desc}>{desc}</div>
      </div>
      <div className={styles.extras_card_right}>
        <RightArrowIcon />
      </div>
    </div>
  );
}

export default ExtrasCard;
