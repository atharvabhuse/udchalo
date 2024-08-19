import React from 'react';
import { ucFlightLoadingAnimation } from '@uc/assets/animations/uc_flight_loading_animtion';
import { LoaderRightArrow } from '@uc/assets/images';
import Lottie from 'lottie-react';
import styles from './loader.module.scss';

interface LoaderInterface {
  loaderData: {
    originCity: string;
    originAirport: string;
    destinationCity: string;
    destinationAirport: string;
    date: string;
    isDefence: boolean;
  };
}
function Loader({ loaderData }: LoaderInterface) {

    const loaderHeadingHandler = () => {
        if(loaderData.isDefence === true){
          return 'Best defence flight tickets coming your way'
        }
        return 'Best flight fares coming your way'
    }
  return (
    <div className={styles.loader}>
      <div className={styles.loader_heading}>{loaderHeadingHandler()}</div>
      <Lottie animationData={ucFlightLoadingAnimation} loop />
      <div className={styles.loader_msg}>Searching Flights...</div>
      <div className={styles.loader_origin_destination_box}>
        <div className={styles.loader_origin_box}>
          <div className={styles.loader_origin_heading}>{loaderData.originCity}</div>
          <div className={styles.loader_origin_description}>{loaderData.originAirport}</div>
        </div>
        <LoaderRightArrow />
        <div className={styles.loader_destination_box}>
          <div className={styles.loader_destination_heading}>{loaderData.destinationCity}</div>
          <div className={styles.loader_destination_description}>{loaderData.destinationAirport}</div>
        </div>
      </div>
      <div className={styles.loader_date}>{loaderData.date}</div>
    </div>
  );
}

export default Loader;
