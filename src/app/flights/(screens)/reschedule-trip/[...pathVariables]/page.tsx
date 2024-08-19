'use client';

import { FlightsReschedule } from '@uc/libs/flights/reschedule';
import { useUcHeaderContext } from '@uc/libs/shared/ui';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

export interface FlightbookingidProps {}

function Flightbookingid() {
  const router = useRouter();
  const { pathVariables = null } = useParams();
  const bookingId = pathVariables && pathVariables.length && pathVariables[0];
  const flightId = pathVariables && pathVariables.length && pathVariables[1];

  const { setSelectedTab } = useUcHeaderContext();

  useEffect(() => {
    setSelectedTab(` Booking ID: ${bookingId}`);
  }, []);

  const onReschedule = (sessionId: string) => {
    router.push(`/flights/reschedule/${sessionId}`);
  };

  const backHandler = () => {
    router.push('/user/bookings');
  };

  return (
    <FlightsReschedule
      bookingId={bookingId}
      flightId={flightId}
      backHandler={backHandler}
      onReschedule={onReschedule}
    />
  );
}

export default Flightbookingid;
