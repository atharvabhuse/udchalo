'use client';

import { FlightsCancellationBooking } from '@uc/libs/flights/cancellation-booking';
import { useRouter, useParams } from 'next/navigation';

export interface FlightbookingidProps {}

function Flightbookingid() {
  const router = useRouter();
  const { pathVariables } = useParams();
  const bookingId = pathVariables && pathVariables.length && pathVariables[0];
  const flightId = pathVariables && pathVariables.length && pathVariables[1];

  const backHandler = () => {
    router.push('/user/bookings');
  };

  return <FlightsCancellationBooking bookingId={bookingId} flightId={flightId} backHandler={backHandler} />;
}

export default Flightbookingid;
