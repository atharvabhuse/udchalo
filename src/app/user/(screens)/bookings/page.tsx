'use client';

import { useUcHeaderContext } from '@uc/libs/shared/ui';
import { FlightsMyBooking } from '@uc/libs/flights/my-booking';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function ModifyFlight() {
  const { setSelectedTab } = useUcHeaderContext();
  const router = useRouter();

  useEffect(() => {
    setSelectedTab('Upcoming');
  }, []);

  const backHandler = () => {
    router.push('/flights');
  };
  return <FlightsMyBooking onTabClick={setSelectedTab} backHandler={backHandler} />;
}

export default ModifyFlight;
