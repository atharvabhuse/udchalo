import { PercentCircleLogo } from '@uc/libs/shared/ui';
import styles from './saved-money.module.scss';

/* eslint-disable-next-line */
export interface SavedMoneyProps {}

export function SavedMoney(props: SavedMoneyProps) {
  return (
    <div className={styles.saved_money_info}>
      <PercentCircleLogo />
      <div className={styles.saving_info}>You saved ₹1,096 on this booking</div>
    </div>
  );
}

export default SavedMoney;
