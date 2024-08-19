import ChangeInPlansOption from '../change-in-plans-option/change-in-plans-option';
import styles from './change-in-plans.module.scss';

/* eslint-disable-next-line */
export interface ChangeInPlansProps {
  heading: string;
  desc: string;
  onChangeInplans: (action: string) => void;
  tripMode?: string;
}

function ChangeInPlans(props: ChangeInPlansProps) {
  const { heading, desc, onChangeInplans, tripMode } = props;
  const onChangeInplansHandler = (action: string) => {
    onChangeInplans(action);
  };
  return (
    <div className={styles.changeInPlans}>
      <div className={styles.changeInPlans_heading}>{heading}</div>
      <div className={styles.changeInPlans_desc}>{desc}</div>
      <ChangeInPlansOption
        color="#BCB04E"
        heading={`${tripMode}` ? 'Email Ticket' : 'Reschedule Booking'}
        desc={`${tripMode}` ? '' : 'Book seat of your choice before boarding'}
        onOptionSelect={onChangeInplansHandler}
      />
      <ChangeInPlansOption
        color="#F07B7B"
        heading={`${tripMode}` ? 'WhatsApp' : 'Cancel Booking'}
        desc={`${tripMode}` ? '' : 'Pre-select your meal at the best rates'}
        onOptionSelect={onChangeInplansHandler}
      />
    </div>
  );
}

export default ChangeInPlans;
