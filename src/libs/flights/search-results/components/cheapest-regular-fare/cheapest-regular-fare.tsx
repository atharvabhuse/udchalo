import React, { ReactNode } from 'react';
import styles from './cheapest-regular-fare.module.scss';

interface CheapestRegularFareProps {
  children: ReactNode;
}

function CheapestRegularFare({ children }: CheapestRegularFareProps) {
  return (
    <>
      <div className={styles.tag_row}>
        <div className={styles.tag}>Cheapest Regular Fare</div>
      </div>
      <div className={styles.wrapper}>{children}</div>
    </>
  );
}

export default CheapestRegularFare;
