import styles from './fauji-fares.module.scss';

/* eslint-disable-next-line */
export interface FaujiFaresProps {}

export function FaujiFares(props: FaujiFaresProps) {
  return (
    <div className={styles.container}>
      <h1>Welcome to FaujiFares!</h1>
    </div>
  );
}

export default FaujiFares;
