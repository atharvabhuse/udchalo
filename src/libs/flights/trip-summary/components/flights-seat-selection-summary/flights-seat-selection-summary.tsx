import Seat from '@uc/assets/images/seat_icon.svg';
import Flight from '@uc/assets/images/seat_selection_summary_aeroplane_icon.svg';
import RightArrow from '@uc/assets/images/arrowIcon.svg';
import { useEffect, useState } from 'react';
import styles from './flights-seat-selection-summary.module.scss';

export interface FlightsSeatSelectionSummaryProps {}

export function FlightsSeatSelectionSummary({ counter, travelerAndSeats }) {
  // const useStyles = makeStyles({
  //   flight_icon: {
  //     backgroundColor: 'transparent',
  //   },
  // });

  // const classes = useStyles();
  const classes = {
    flight_icon: {
      backgroundColor: 'transparent',
    },
  };

  const backHandler = () => {
    counter(1);
  };

  const proceedHandler = () => {
    counter(3);
  };

  const [segmentWiseTravelers, setSegmentWiseTravelers] = useState([]);

  const segmentWiseTravelerInformationHandler = () => {
    const maxSegments = travelerAndSeats && travelerAndSeats[travelerAndSeats.length - 1]?.segment;
    let tempSegmentWiseTravelers = segmentWiseTravelers;
    for (let i = 0; i <= maxSegments; i++) {
      const currentSegmentTravelers = travelerAndSeats.filter((data: any) => data.segment === i);

      const seatSelectedTravelersNumber = currentSegmentTravelers.filter(data => data.travelerSeatNumber != '').length;

      tempSegmentWiseTravelers = [
        ...tempSegmentWiseTravelers,
        { segmentTravelers: currentSegmentTravelers, seatSelectedTravelersNumber },
      ];
    }
    setSegmentWiseTravelers(tempSegmentWiseTravelers);
  };

  useEffect(() => {
    segmentWiseTravelerInformationHandler();
  }, [travelerAndSeats]);

  return (
    <div className={styles.seat_selection_summary}>
      <div className={styles.seat_selection_summary_header}>
        <Seat
          width={34}
          height={34}
          style={{
            backgroundColor: '#3398D5',
            borderRadius: '100%',
            padding: '6px',
          }}
        />
        <div className={styles.seat_selection_summary_heading}>Seat selection Summary</div>
      </div>

      <div className={styles.seat_selection_summary_content_main}>
        {segmentWiseTravelers.length != 0 ? (
          segmentWiseTravelers.map((data: any) => (
            <div className={styles.seat_selection_summary_content}>
              <div className={styles.seat_selection_summary_content_left}>
                <Flight height={24} width={24} />
                <div className={styles.depart}>{data.segmentTravelers[0].origin}</div>
                <RightArrow height={20} width={20} />
                <div className={styles.arrive}>{data.segmentTravelers[0].destination}</div>
              </div>

              <div className={styles.seat_selection_summary_content_right}>
                <div className={styles.seats_row}>
                  Seats:
                  {data.segmentTravelers.map((val: any, index: number) => (
                    <>
                      {val.travelerSeatNumber != '' ? val.travelerSeatNumber : 'Any'}
                      {index != data.segmentTravelers.length - 1 && '| '}
                    </>
                  ))}
                </div>
                <div className={styles.seats_added}>
                  {data.seatSelectedTravelersNumber}/{data.segmentTravelers.length} Seats Added
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.seat_selection_summary_content}>
            Not selected Traveler Seat for any traveler, Are you want to proceed further?
          </div>
        )}
      </div>

      <div className={styles.button_row}>
        <button onClick={backHandler} className={styles.seat_selection_button}>
          Back To Seat Selection
        </button>
        <button onClick={proceedHandler} className={styles.proceed_button}>
          Proceed
        </button>
      </div>
    </div>
  );
}

export default FlightsSeatSelectionSummary;
