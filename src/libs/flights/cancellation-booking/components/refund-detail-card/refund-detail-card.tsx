import RefundRupeeIcon from '@uc/assets/images/refundRupee.svg';
import styles from './refund-detail-card.module.scss';
/* eslint-disable-next-line */
export interface RefundDetailCardProps {
  details: {
    bankName: string;
    accountNumber: string;
  }
}

export function RefundDetailCard({details}: RefundDetailCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.bankDetails}>
        <div className={styles.refundIcon}>
          <RefundRupeeIcon />
        </div>
        <div className={styles.detailContainer}>
          <div className={styles.refundText}>Refund to source : NEFT</div>
          <div className={styles.bankDetailsText}>Bank Name : {details.bankName}</div>
          <div className={styles.bankDetailsText}>Account Number : {details.accountNumber}</div>
        </div>
      </div>
      <div className={styles.requestMessage}>
        Once your request is approved, the amount will reflect in your source account within
        <span className={styles.highlightedMessage}> 5 working days.</span>
      </div>
    </div>
  );
}

export default RefundDetailCard;
