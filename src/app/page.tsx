import Link from 'next/link';
import styles from './page.module.scss';

function Index() {
  return (
    <div className={styles.homepage}>
      <p>Home Page</p>
      <br />
      <p>
        <Link href="/flights">Go to Flights</Link>
      </p>
    </div>
  );
}

export default Index;
