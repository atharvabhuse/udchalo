import { UcCard } from '@uc/libs/shared/ui';
import styles from './cancel-trip-fare-details.module.scss';

/* eslint-disable-next-line */
export interface CancelTripFareDetailsProps {}

const fareDetails = {
  inclusion: [
    {
      fareName: 'Flight Fare x 2',
      fareAmount: 5000,
    },
    {
      fareName: 'Flight Fare x 2',
      fareAmount: 5000,
    },
    {
      fareName: 'Flight Fare x 2',
      fareAmount: 5000,
    },
  ],
  deduction: [
    {
      fareName: 'Flight Fare x 2',
      fareAmount: 5000,
    },
    {
      fareName: 'Flight Fare x 2',
      fareAmount: 5000,
    },
    {
      fareName: 'Flight Fare x 2',
      fareAmount: 5000,
    },
  ],
};

const inclusionData = fareDetails?.inclusion;
const deductionData = fareDetails?.deduction;

export function CancelTripFareDetails(props: CancelTripFareDetailsProps) {
  return (
    <div className={styles.container}>
      <UcCard>
        <div className={styles.fare_detail_container}>
          <h1 className={styles.title}>Estimated Refund Summary</h1>

          <div className={styles.total_paid_amount}>
            <span>Total paid</span>
            <span>₹ 12,096</span>
          </div>

          <h2 className={styles.sub_heading}>Inclusion</h2>

          {inclusionData.map((data, index) => (
            <div className={styles.fare_name_and_fare_amount}>
              <span>{data?.fareName}</span>
              <span>{`₹ ${data?.fareAmount}`}</span>
            </div>
          ))}

          <h2 className={styles.sub_heading}>Deduction</h2>

          {deductionData.map((data, index) => (
            <div className={styles.fare_name_and_fare_amount}>
              <span>{data?.fareName}</span>
              <span>{`₹ ${data?.fareAmount}`}</span>
            </div>
          ))}

          <div className={`${styles.total_paid_amount} ${styles.estimated_refund}`}>
            <span>Total Estimated Refund</span>
            <span>₹ 11,193</span>
          </div>
        </div>
      </UcCard>
    </div>
  );
}

export default CancelTripFareDetails;
