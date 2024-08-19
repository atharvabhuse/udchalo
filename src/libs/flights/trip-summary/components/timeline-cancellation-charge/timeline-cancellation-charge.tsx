import { CancellationPolicyIcon, RescheduleFlightIcon } from '@uc/libs/shared/ui';
import { formatDateToTime, formatStringToDate } from '@uc/utils';
import styles from './timeline-cancellation-charge.module.scss';
import { IRescheduleAndCancellationPenalty } from '@uc/services/network';

/* eslint-disable-next-line */
export interface TimelineCancellationChargeProps {
  cancelPenalties?: IRescheduleAndCancellationPenalty[];
  reschedulePenalties?: IRescheduleAndCancellationPenalty[];
  departDate: string;
}

function TimelineCancellationCharge({
  cancelPenalties,
  reschedulePenalties,
  departDate,
}: TimelineCancellationChargeProps) {
  const addHoursToCurrentTime = (hours: number) => {
    const currentTime = new Date(departDate);
    currentTime.setHours(currentTime.getHours() + hours);
    const hoursAddedTime = formatDateToTime(currentTime.toISOString());
    const hoursAddedDay = formatStringToDate(currentTime.toISOString(), 'dd MMM, E');
    return { hoursAddedTime, hoursAddedDay };
  };

  return (
    <div className={styles.flight_cancellation_reschedule_flight_container}>
      {cancelPenalties && cancelPenalties?.length > 0 && (
        <div className={styles.flight_cancellation_policies_container}>
          <div className={styles.cancellation_policy_header}>
            <div className={styles.icon}>
              <CancellationPolicyIcon />
            </div>
            <div className={styles.title}>Cancellation Policy</div>
          </div>
          <div className={styles.cancellation_policy_detail}>
            <div className={styles.detail_header}>
              <div className={styles.header}>
                <div className={styles.title}>Timeline</div>
                <div className={styles.sub_title}>(From departure time)</div>
              </div>
              <div className={styles.header}>
                <div className={styles.title}>Cancellation Charges</div>
                <div className={styles.sub_title}>(Per passenger)</div>
              </div>
            </div>
            <div className={styles.detail_content_container}>
              {(cancelPenalties || [])?.map((cancelPenalty: IRescheduleAndCancellationPenalty, index: number) => {
                const { hoursAddedDay, hoursAddedTime } = addHoursToCurrentTime(cancelPenalty?.hours);
                const uniqueKey = `cancelPenalty-${index}`;
                return (
                  <div className={styles.detail_content} key={uniqueKey}>
                    <div className={styles.timeline_content}>
                      <div className={styles.label}>{`Upto ${cancelPenalty?.hours} hours`}</div>
                      <div className={styles.timeline}>
                        (Up to {hoursAddedDay} {hoursAddedTime} IST)
                      </div>
                    </div>
                    <div className={styles.charges_content}>₹{cancelPenalty?.amount}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {reschedulePenalties && reschedulePenalties?.length > 0 && (
        <div className={styles.flight_cancellation_policies_container}>
          <div className={styles.cancellation_policy_header}>
            <div className={styles.icon}>
              <RescheduleFlightIcon />
            </div>
            <div className={styles.title}>Reschedule Flight</div>
          </div>
          <div className={styles.cancellation_policy_detail}>
            <div className={styles.detail_header}>
              <div className={styles.header}>
                <div className={styles.title}>Timeline</div>
                <div className={styles.sub_title}>(From departure time)</div>
              </div>
              <div className={styles.header}>
                <div className={styles.title}>Cancellation Charges</div>
                <div className={styles.sub_title}>(Per passenger)</div>
              </div>
            </div>
            <div className={styles.detail_content_container}>
              {(reschedulePenalties || [])?.map((reschedulePenalty: IRescheduleAndCancellationPenalty, index: number) => {
                const { hoursAddedDay, hoursAddedTime } = addHoursToCurrentTime(reschedulePenalty?.hours);
                const uniqueKey = `cancelPenalty-${index}`;
                return (
                  <div className={styles.detail_content} key={uniqueKey}>
                    <div className={styles.timeline_content}>
                      <div className={styles.label}>
                        Upto
                        {reschedulePenalty?.hours} hours
                      </div>
                      <div className={styles.timeline}>
                        (Up to {hoursAddedDay} {hoursAddedTime} IST)
                      </div>
                    </div>
                    <div className={styles.charges_content}>₹{reschedulePenalty?.amount}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimelineCancellationCharge;
