'use client';

import { FlightsCancellationBooking } from '@uc/libs/flights/cancellation-booking';
import { useRouter, useParams } from 'next/navigation';
import CancelTripLayout from '../cancel-layout';

export interface CancellTripHomeProps {}

function CancellTripHome() {
  const router = useRouter();
  const { pathVariables } = useParams();
  const bookingId: string = pathVariables && pathVariables.length && pathVariables[0];
  const flightId: string = pathVariables && pathVariables.length && pathVariables[1];

  const backHandler = () => {
    router.push('/user/bookings');
  };

  return (
    <CancelTripLayout>
      <FlightsCancellationBooking bookingId={bookingId} flightId={flightId} backHandler={backHandler} />
    </CancelTripLayout>
  );
}

export default CancellTripHome;
