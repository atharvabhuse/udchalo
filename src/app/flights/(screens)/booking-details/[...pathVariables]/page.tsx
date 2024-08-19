'use client';

import FlightsBookingDetails from '@uc/libs/flights/booking-details/flights-booking-details';
import { useUcHeaderContext } from '@uc/libs/shared/ui';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

function Details() {
  let flightId: string = '';
  let bookingId: string = '';
  const router = useRouter();
  const params = useParams();
  const pathVariables = params?.pathVariables;

  if (pathVariables && pathVariables.length) {
    const [bookingNumber, flightNumber] = pathVariables;
    bookingId = bookingNumber;
    flightId = flightNumber;
  }

  const { setSelectedTab } = useUcHeaderContext();

  const onPlanChange = (action: string) => {
    if (action === 'cancel booking') {
      router.push(`/flights/cancel-trip/${bookingId}/${flightId}`);
    } else if (action === 'reschedule booking') {
      router.push(`/flights/reschedule-trip/${bookingId}/${flightId}`);
    }
  };

  useEffect(() => {
    const bookingIdBreadcrumb = `Booking ID: ${bookingId}`;
    setSelectedTab(bookingIdBreadcrumb);
  }, [pathVariables]);

  const backHandler = () => {
    router.push('/user/bookings');
  };

  return (
    <FlightsBookingDetails
      flightId={flightId}
      bookingId={bookingId}
      onPlanChange={onPlanChange}
      backHandler={backHandler}
    />
  );
}
export default Details;
