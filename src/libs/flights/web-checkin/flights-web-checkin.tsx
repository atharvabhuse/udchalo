import styles from './flights-web-checkin.module.scss';

/* eslint-disable-next-line */
export interface FlightsWebCheckinProps {}

export function FlightsWebCheckin(props: FlightsWebCheckinProps) {
  return (
    <div className={styles.container}>
      <h1>Welcome to FlightsWebCheckin!</h1>
    </div>
  );
}

export default FlightsWebCheckin;
