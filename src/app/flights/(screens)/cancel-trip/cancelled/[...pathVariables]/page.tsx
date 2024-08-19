'use client';

import { FlightCancellationDone } from '@uc/libs/flights/cancellation-booking';
import { useRouter, useParams } from 'next/navigation';
import CancelTripLayout from '../../cancel-layout';

export interface CancalledTripDetailsProps {}

function CancalledTripDetails() {
  const router = useRouter();
  const params = useParams();
  const pathVariables = params?.pathVariables;
  const bookingId = pathVariables && pathVariables.length && pathVariables[0];
  const flightId = pathVariables && pathVariables.length && pathVariables[1];
  const passengerIds = pathVariables && pathVariables.length && pathVariables[2];

  const backHandler = () => {
    router.push('/user/bookings');
  };
  return (
    <CancelTripLayout>
      <FlightCancellationDone
        cancelledPassengerIds={[passengerIds]}
        bookingId={bookingId}
        flightId={flightId}
        backHandler={backHandler}
      />
    </CancelTripLayout>
  );
}

export default CancalledTripDetails;
