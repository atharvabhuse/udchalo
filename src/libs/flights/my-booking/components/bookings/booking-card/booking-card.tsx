import {
  FlightIconWithBackground,
  GrayColoredCalanderIcon,
  GrayColoredWatchIcon,
  PersonOutlinedIcon,
  ProceedRightArrowIcon,
  ProceedRightArrowIconWithBg,
  WebSiteGrayColoredCalanderIcon,
} from '@uc/libs/shared/ui';
import format from 'date-fns/format';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { ALL_BOOKING_STATUS } from '../my-bookings.reducer';
import styles from './booking-card.module.scss';

export interface BookingCardTypes {
  name: string;
  lastName: string;
  noOfTravellerCount: string;
  trip: TripDetails;
  PNR: string;
  bookingId: string;
  travelDate: string;
  travelTime: string;
  action?: string;
  index: number;
  flightId: string;
  key?: number;
  travelDateAndTime: Date;
  displayStatus: string;
}

export interface BookingData {
  data: BookingCardTypes;
}

export interface TripDetails {
  tripDesc: string;
  origin: string;
  destination: string;
  tripStatus: string;
  lobIcon: string;
}

function BookingCard(props: BookingData) {
  const { data } = props;
  const router = useRouter();

  const onViewActionsClick = () => {
    if (data.PNR || data.bookingId) {
      router.push(`/flights/booking-details/${data.bookingId}/${data.flightId}`);
    }
  };

  const numberOfTravellers = (): string | ReactNode => {
    let travellers: string | ReactNode;
    if (parseInt(data.noOfTravellerCount, 10) > 1) {
      if (parseInt(data.noOfTravellerCount, 10) === 2) {
        travellers = `+${parseInt(data.noOfTravellerCount, 10) - 1} Traveller`;
      } else {
        travellers = `+${parseInt(data.noOfTravellerCount, 10) - 1} Travellers`;
      }
    } else {
      travellers = <div style={{ marginLeft: '5rem' }}> </div>;
    }
    return travellers;
  };

  const formattedDate = format(data.travelDateAndTime, 'dd MMM yyyy');
  const formattedTime = format(data.travelDateAndTime, 'HH:mm');
  return (
    <>
      <div className={styles.booking_card_root}>
        <div className={styles.box}>
          <div className={styles.passanger_icon_container}>
            <PersonOutlinedIcon className={styles.passenger_icon} />
          </div>
          <div className={styles.parent}>
            <span className={styles.name}>{`${data?.name} ${data?.lastName && data?.lastName}`}</span>
            <span className={styles.no_of_traveller}>{data.noOfTravellerCount && numberOfTravellers()}</span>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.icon_plane}>
            <FlightIconWithBackground className={styles.plane_icon} />
          </div>
          <div className={styles.parent}>
            <div className={styles.row}>
              <span className={styles.origin}>{data?.trip.origin}</span>
              <div className={styles.icon_div}>
                <ProceedRightArrowIcon />
              </div>
              <span className={styles.name}>{data?.trip.destination}</span>
            </div>
            <span className={styles.no_of_traveller}>{data?.trip.tripDesc}</span>
            <span
              className={`${
                [ALL_BOOKING_STATUS.cancelled, ALL_BOOKING_STATUS.bookingFailed].includes(data.trip.tripStatus)
                  ? styles.booking_cancelled
                  : styles.status
              } ${data?.trip.tripStatus === ALL_BOOKING_STATUS.pending ? styles.booking_pending : ''}`}>
              {data?.displayStatus}
            </span>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.parent}>
            <span className={`${styles.name} ${styles.pnr_no}`}>{data?.PNR ? data?.PNR : data?.bookingId}</span>
          </div>
        </div>
        <div className={`${styles.box} ${styles.travel_date_and_time_spacing}`}>
          <div className={styles.icon_box}>
            <WebSiteGrayColoredCalanderIcon />
            <GrayColoredWatchIcon />
          </div>
          <div className={styles.parent}>
            <span className={styles.name}>{formattedDate}</span>
            <span className={styles.no_of_travellers}>{formattedTime}</span>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.parent}>
            <div className={styles.view_details_box}>
              <span className={styles.action} onClick={onViewActionsClick}>
                View Details
              </span>
              <div className={styles.icon_div}>
                <ProceedRightArrowIconWithBg className={styles.icon} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* **************  M site booking card  ************************ */}
      <div
        className={`${styles.m_site_booking_card_root} ${data.key === 1 ? styles.first_card : ''} `}
        onClick={onViewActionsClick}>
        <div className={styles.booking_card}>
          <div
            className={`${styles.booking_status} 
            ${
              [ALL_BOOKING_STATUS.cancelled, ALL_BOOKING_STATUS.bookingFailed].includes(data.trip.tripStatus)
                ? styles.booking_cancelled
                : ''
            }
            ${data?.trip.tripStatus === ALL_BOOKING_STATUS.pending ? styles.booking_pending : ''}`}>
            {data?.displayStatus}
          </div>
          <div className={styles.booking_detail_container}>
            <div className={styles.icon_and_trip_detail}>
              <div className={styles.icon}>
                <FlightIconWithBackground />
              </div>
              <div className={styles.trip_detail}>
                <div className={styles.parent}>
                  <div className={styles.row}>
                    <span className={styles.city_name}>{data?.trip.origin}</span>
                    <div>
                      <ProceedRightArrowIcon />
                    </div>
                    <span className={styles.city_name}>{data?.trip.destination}</span>
                    <span className={styles.is_oneway}>(One Way)</span>
                  </div>
                </div>
                <div className={styles.traveller_names}>
                  <h1 className={styles.name}>{`${data?.name} ${data?.lastName}`}</h1>
                  <span className={styles.no_of_traveller}>
                    {parseInt(data.noOfTravellerCount, 10) > 1 ? (
                      ` + ${parseInt(data.noOfTravellerCount, 10) - 1}`
                    ) : (
                      <div style={{ marginLeft: '5rem' }}> </div>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.pnr_and_date}>
              <div className={styles.pnr_no}>{`PNR : ${data?.PNR ? data?.PNR : data?.bookingId}`}</div>
              <div className={styles.icon_and_date}>
                <span className={styles.gray_calender_icon_wrapper}>
                  <GrayColoredCalanderIcon className={styles.gray_calender_icon} />
                </span>
                <span className={styles.date}>{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BookingCard;
