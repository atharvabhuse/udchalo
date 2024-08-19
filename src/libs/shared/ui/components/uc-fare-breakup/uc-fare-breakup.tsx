import { useEffect, useState } from 'react';
import { formatToINR } from '@uc/utils';
import styles from './uc-fare-breakup.module.scss';
import { PercentCircleLogo } from '../..';

/* eslint-disable-next-line */
export interface UcFareBreakupProps {
  review?: Review;
  discount?: any;
  seatFees?: any;
  totalFare?: any;
  fareChangeCallback?: any;
  extraFare?: any;
  deduction?: Deduction;
  mealTotal?: any;
  flightRescheduleFare?: any;
  tripMode?: string;
  bookingStatusVal?: string;
}
interface Review {
  baseFare: number;
  taxesAndFees: number;
  convenienceFees?: number;
  surakshaFees?: number;
  insuranceFees?: number;
  seatFee?: number;
  mealFee?: number;
  baggageFee?: number;
  udChaloCredits?: number;
  myCashRewards?: number;
  rescheduleFee?: number;
  oldBookingFare?: number;
}
interface Deduction {
  airlineCancellationFee: number;
  udChaloBookingFee: number;
  udchaloCancellationFee: number;
}

export function UcFareBreakup({
  review,
  discount,
  seatFees,
  totalFare,
  fareChangeCallback,
  extraFare,
  deduction,
  mealTotal,
  flightRescheduleFare,
  tripMode,
  bookingStatusVal,
}: UcFareBreakupProps) {
  const fareList = [
    {
      fare_heading: 'Base Fare',
      fare_description: '',
      price: review?.baseFare,
    },
    {
      fare_heading: 'Taxes & Fees',
      fare_description: '',
      price: review?.taxesAndFees,
    },
    {
      fare_heading: 'Convenience Fees',
      fare_description: '*(This is not refundable)',
      price: review?.convenienceFees ?? 0,
    },
  ];

  const [fare, setFare] = useState(fareList);

  useEffect(() => {
    let updatedFareList = [...fareList];
    if (review) {
      updatedFareList = [...updatedFareList];
      setFare(updatedFareList);
    }
    if (discount?.code) {
      updatedFareList = [
        ...updatedFareList,
        {
          fare_heading: `Coupon - ${discount?.code}`,
          fare_description: '',
          price: discount?.discountAmount !== undefined ? -discount.discountAmount : 0,
        },
      ];
      setFare(updatedFareList);
    }
    if (discount?.name) {
      updatedFareList = [
        ...updatedFareList,
        {
          fare_heading: `Coupon - ${discount?.name}`,
          fare_description: '',
          price: discount?.price !== undefined ? -discount.price : 0,
        },
      ];
      setFare(updatedFareList);
    }
    if (deduction) {
      updatedFareList = [
        ...updatedFareList,
        {
          fare_heading: 'Airline Cancellation Fee',
          fare_description: '',
          price: deduction?.airlineCancellationFee,
        },
        {
          fare_heading: 'udChalo Booking Fee',
          fare_description: '',
          price: deduction?.udChaloBookingFee !== undefined ? -deduction.udChaloBookingFee : 0,
        },
        {
          fare_heading: 'udChalo Cancellation Fee',
          fare_description: '',
          price: deduction?.udchaloCancellationFee !== undefined ? -deduction.udchaloCancellationFee : 0,
        },
      ];

      setFare(updatedFareList);
    }

    if (seatFees) {
      let totalSeatFeesTemp = 0;
      Object.keys(seatFees).forEach(key => {
        const travelerSeatPrice = seatFees[key]?.travelerSeatPrice !== undefined ? seatFees[key]?.travelerSeatPrice : 0;
        totalSeatFeesTemp += parseInt(travelerSeatPrice, 10);
      });
      updatedFareList = [
        ...updatedFareList,
        {
          fare_heading: 'Seat Fees',
          fare_description: '',
          price: parseInt(totalSeatFeesTemp.toString(), 10),
        },
      ];
      setFare(updatedFareList);
    }

    if (tripMode === 'reschedule' && flightRescheduleFare) {
      if (flightRescheduleFare?.totalFare >= flightRescheduleFare.oldBookingFare) {
        updatedFareList = [
          ...updatedFareList,
          {
            fare_heading: 'Old Booking Fare',
            fare_description: '',
            price: flightRescheduleFare?.oldBookingFare !== undefined ? -flightRescheduleFare.oldBookingFare : 0, // Use the new property
          },
          {
            fare_heading: 'Reschedule Fee',
            fare_description: '',
            price: flightRescheduleFare?.rescheduleFee,
          },
        ];
        setFare(updatedFareList);
      } else {
        updatedFareList = [
          ...updatedFareList,
          {
            fare_heading: 'Old Booking Fare',
            fare_description: '',
            price: flightRescheduleFare?.totalFare !== undefined ? -flightRescheduleFare.totalFare : 0,
          },
          {
            fare_heading: 'Reschedule Fee',
            fare_description: '',
            price: flightRescheduleFare?.rescheduleFee,
          },
        ];
        setFare(updatedFareList);
      }
    }
    const totalFareVal =
      fare.reduce((a, c) => a + c.price, 0) + (extraFare ? extraFare.reduce((a, c) => a + c.extraFarePrice, 0) : 0);

    fareChangeCallback(formatToINR(totalFareVal));
  }, [discount, review, seatFees, deduction, flightRescheduleFare]);

  useEffect(() => {
    if (totalFare) {
      const totalPrice = fare.reduce((a, c) => a + c.price, 0);
      totalFare(totalPrice);
    }
  }, [fare, totalFare]);

  const isMobile = window.innerWidth < 600;

  return (
    <div>
      <div className={styles.fare_breakup}>
        {extraFare ? <div className={styles.extra_fare_heading}>{!isMobile && 'Fare Breakup'}</div> : ''}
        <p className={styles.review_details}>Review your fair details</p>
        {!extraFare ? <div className={styles.fare_heading}>Fare Breakup</div> : ''}
        <div className={styles.flight_fare}>Flight Fare</div>
        <div className={styles.fares_box}>
          {fare?.map((data, index: number) => (
            <div className={styles.fare_row} key={`fare-${index.toString()}`}>
              <div className={styles.fare_row_left}>
                <div
                  className={
                    discount && index === 3 ? styles.fare_row_left_heading_discount : styles.fare_row_left_heading
                  }>
                  {data.fare_heading}
                </div>
                <div
                  className={discount && index === 3 ? styles.fare_row_left_desc_discount : styles.fare_row_left_desc}>
                  {data.fare_description}
                </div>
              </div>
              <div className={discount && index === 3 ? styles.fare_row_right_discount : styles.fare_row_right}>
                {formatToINR(data.price)}
              </div>
            </div>
          ))}
        </div>
        {extraFare ? (
          <>
            <div className={styles.flight_fare}>Extra</div>
            <div className={styles.fares_box}>
              {extraFare?.map((data: any, key: number) => (
                <div id={key.toString()} className={styles.fare_row} key={`extrafare-${key.toString()}`}>
                  <div className={styles.fare_row_left}>
                    <div
                      className={
                        discount && key === 3 ? styles.fare_row_left_heading_discount : styles.fare_row_left_heading
                      }>
                      {data.fare_heading}
                    </div>
                    <div className={styles.fare_row_left_desc}>{data.extraFareDescription}</div>
                  </div>
                  <div className={styles.fare_row_right}>{formatToINR(data.extraFarePrice)}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          ''
        )}

        <div className={styles.total_fare_row}>
          <div>
            {deduction ? 'Total Refund' : 'Total Fare'}
            <div className={styles.total_fare_paid_using_text}>Paid using Net Banking</div>
          </div>
          <div>
            {formatToINR(
              (fare.reduce((acc, curr) => acc + curr.price, 0) ?? 0) +
              (extraFare ? extraFare.reduce((acc, curr) => acc + curr.extraFarePrice, 0) ?? 0 : 0)
            )}
          </div>
        </div>
        {(bookingStatusVal === 'booked' || bookingStatusVal === 'pending') && isMobile && (
          <div className={styles.you_saved_banner_msite}>
            <PercentCircleLogo /> <span className={styles.you_saved_banner_text}>You saved ₹1096 on this booking</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default UcFareBreakup;
