import { IndigoIcon } from '@uc/libs/shared/ui';
import Line from '@uc/assets/images/one-stop.svg';
import { formatDateToTime, formatStringToDate, formatToHoursAndMins, formatToINR } from '@uc/utils';
import styles from './flight-summary-card.module.scss';

export interface FlightSummaryCardProps {
  bokingCancellationDetails: any;
}

export function FlightSummaryCard({ bokingCancellationDetails }: FlightSummaryCardProps) {
  const durationString = formatToHoursAndMins(bokingCancellationDetails?.duration);
  const depart = formatDateToTime(bokingCancellationDetails?.departDate);
  const arrive = formatDateToTime(bokingCancellationDetails?.arriveDate);
  const flightDepartDate = formatStringToDate(bokingCancellationDetails?.departDate, 'dd MMM, E');
  const flightArriveDate = formatStringToDate(bokingCancellationDetails?.arriveDate, 'dd MMM, E');

  const logoDimention = window?.innerWidth < 600 ? 20 : 30;

  return (
    <div className={styles.container}>
      <div className={styles.mSiteFlightNameContainer}>
        <div className={styles.mSiteflightNameCtn}>
          <div className={styles.mSiteflightName}>
            {bokingCancellationDetails?.segments[0]?.airlineName}{' '}
            <span className={styles.mSiteflightNumber}>
              {`${bokingCancellationDetails?.segments[0]?.airline}-${bokingCancellationDetails?.segments[0]?.flightNumber}`}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.inner_container}>
        <div className={styles.m_site_flight_icon}>
          <img
            src={`https://static.udchalo.com/client_assets/img/airline_logo/${bokingCancellationDetails?.segments[0]?.airline}.png`}
            width={logoDimention}
            height={logoDimention}
            alt="airline logo"
            className={styles.actual_airline_icon}
          />
        </div>
        <div className={styles.flightNameContainer}>
          <img
            src={`https://static.udchalo.com/client_assets/img/airline_logo/${bokingCancellationDetails?.segments[0]?.airline}.png`}
            width={logoDimention}
            height={logoDimention}
            alt="airline logo"
          />
          <div className={styles.flightNameCtn}>
            <div className={styles.flightName}>
              {bokingCancellationDetails?.segments[0]?.airlineName}{' '}
              <span className={styles.flightNumber}>
                {`${bokingCancellationDetails?.segments[0]?.airline}-${bokingCancellationDetails?.segments[0]?.flightNumber}`}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.departContainer}>
          <div className={styles.departTime}>{depart}</div>
          <div className={styles.departCityCode}>{bokingCancellationDetails?.origin}</div>
          <div className={styles.departDate}>{flightDepartDate}</div>
        </div>
        <div className={styles.filghtDurationContainer}>
          <div className={styles.filghtDuration}>{durationString}</div>
          <Line className={styles.lineIcon} />
          <div className={styles.filghtDuration}>
            {bokingCancellationDetails?.stops === 0 ? 'Non-Stop' : `${bokingCancellationDetails?.stops}-Stop`}
          </div>
        </div>
        <div className={styles.arrivalContainer}>
          <div className={styles.arrivalTime}>{arrive}</div>
          <div className={styles.arrivalCityCode}>{bokingCancellationDetails?.destination}</div>
          <div className={styles.arrivalDate}>{flightArriveDate}</div>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.price}>{formatToINR(bokingCancellationDetails?.fare.totalFare)}</div>
        </div>
      </div>
    </div>
  );
}

export default FlightSummaryCard;
