import Image from 'next/image';
import { DurationSeperatorIcon, InfoIcon } from '@uc/libs/shared/ui';
import { formatDateToTime, formatStringToDate, formatToHoursAndMins } from '@uc/utils';
import React from 'react';
import { useGetAirports } from '@uc/services/network';
import { intervalToDuration } from 'date-fns';
import styles from './flight-leg-details.module.scss';

export interface FlightLegDetailsProps {
  legDetails: any;
  departDate: string;
  arriveDate: string;
  tripMode?: string;
  stops?:string;
}
export function FlightLegDetails({ legDetails, departDate, arriveDate, tripMode,stops }: FlightLegDetailsProps) {
  const { data: airportsResponse, isLoading: isLoadingAirports } = useGetAirports();
  const airportList = airportsResponse?.data?.response;
  const { segments, isRefundable } = legDetails;
  const logoDimention = window.innerWidth < 600 ? 20 : 30;
  const { days } = intervalToDuration({
    start: new Date(departDate.split('T')[0]),
    end: new Date(arriveDate.split('T')[0]),
  });
  const isNextDayArrival = !!(days && days > 0);

  return (
    <div className={styles.container}>
      {segments.map((segment: any, index: number) => {
        const {
          airline,
          airlineName,
          arriveDate,
          arriveTerminal,
          departDate,
          departTerminal,
          destination,
          duration,
          flightNumber,
          origin,
          layoverAirportCode,
          layoverMinutes,
        } = segment;

        const originCity = airportList ? airportList[origin]?.city : '';
        const destinationCity = airportList ? airportList[destination]?.city : '';

        const originAirport = airportList ? airportList[origin]?.airport_name : '';

        const destinationAirport = airportList ? airportList[destination]?.airport_name : '';

        const departTime = formatDateToTime(departDate);
        const departDay = formatStringToDate(departDate, 'dd MMM, E');
        const arrivalTime = formatDateToTime(arriveDate);
        const arrivalDay = formatStringToDate(arriveDate, 'dd MMM, E');
        const durationStr = formatToHoursAndMins(duration);
        const layoverTime = formatToHoursAndMins(layoverMinutes);
        const layoverCity = airportList ? airportList[layoverAirportCode]?.city : '';

        let isTerminalChange = false;
        if (layoverMinutes > 0) {
          isTerminalChange = arriveTerminal !== segment[index + 1]?.departTerminal;
        }
        return (
          <React.Fragment key={departDate}>
            <div className={`${styles.leg_row} ${tripMode === 'cancelled' ? styles.apply_opacity : ''}`}>
              <div className={styles.leg_details}>
                <div className={styles.row}>
                  <Image
                    src={`https://static.udchalo.com/client_assets/img/airline_logo/${airline}.png`}
                    width={logoDimention}
                    height={logoDimention}
                    alt="airline logo"
                  />
                  <div className={styles.row_text}>
                    {airlineName} {flightNumber}
                  </div>
                </div>

                <div className={styles.airport}>{`${originCity} (${origin})`}</div>
                <div className={styles.time}>{departTime}</div>

                <div className={styles.date}>{departDay}</div>
                <div className={styles.terminal}>
                  {departTerminal != null  ? `(T-${departTerminal}) ${originAirport}` : originAirport}
                </div>
              </div>

              <div className={styles.duration_details}>
                <div className={styles.duration}>{durationStr}</div>

                <DurationSeperatorIcon className={styles.duration_saperation_icon} />

                <div className={styles.duration}>{stops}</div>
              </div>

              <div className={styles.leg_details_right}>
                <div className={styles.row}>
                  <div className={styles.row_text}>{isRefundable ? 'Partially Refundable' : 'Non Refundable'}</div>

                  <InfoIcon />
                </div>
                <div className={styles.airport}>{`${destinationCity} (${destination})`}</div>
                <div className={styles.time}>{arrivalTime}</div>
                <div className={styles.date}>{arrivalDay}</div>
                <div className={styles.terminal}>
                  {arriveTerminal != null  ? `(T-${arriveTerminal}) ${destinationAirport}` : destinationAirport}
                </div>
              </div>
            </div>
            {layoverMinutes > 0 ? (
              <div className={styles.layover_info}>
                {layoverTime} Layover at
                {layoverCity}
                {isTerminalChange && (
                  <>
                    <br />
                    Change of terminal to T{segment[index + 1]?.departTerminal}
                  </>
                )}
              </div>
            ) : (
              <></>
            )}
          </React.Fragment>
        );
      })}

      {isNextDayArrival && <div className={styles.next_day}>You will reach next day</div>}
    </div>
  );
}

export default FlightLegDetails;
