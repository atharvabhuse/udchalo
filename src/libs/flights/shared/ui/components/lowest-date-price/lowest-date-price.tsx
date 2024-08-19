import styles from './lowest-date-price.module.scss';

/* eslint-disable-next-line */
export interface LowestDatePriceProps {}

export function LowestDatePrice(props: LowestDatePriceProps) {
  return (
    <div className={styles.container}>
      <h1>Welcome to LowestDatePrice!</h1>
    </div>
  );
}

export default LowestDatePrice;
