import styles from './flights-shared-ui.module.scss';

/* eslint-disable-next-line */
export interface FlightsSharedUiProps {}

export function FlightsSharedUi(props: FlightsSharedUiProps) {
  return (
    <div className={styles.container}>
      <h1>Welcome to FlightsSharedUi!</h1>
    </div>
  );
}

export default FlightsSharedUi;
