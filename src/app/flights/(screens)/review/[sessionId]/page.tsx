'use client';

import { useGetSearchRequest } from '@uc/services/network';
import { FlightTripSummaryLoader } from '@uc/libs/flights/trip-summary';
import FlightTripSummary from '@uc/libs/flights/trip-summary/flights-trip-summary';

function TripSummary({
  params,
  searchParams,
}: {
  params: { sessionId: string };
  searchParams: { onwardId: string; returnId: string; adults: number };
}) {
  const { sessionId = '' } = params || {};
  const { onwardId, returnId } = searchParams || {};

  const { data, isLoading }: any = useGetSearchRequest([sessionId], sessionId, { enabled: !!sessionId });

  const redirectToPayment = (paymentsUrl: string) => {
    window.location.replace(paymentsUrl);
  };

  return (
    <div>
      {isLoading ? (
        <FlightTripSummaryLoader />
      ) : (
        <FlightTripSummary
          sessionId={sessionId}
          onwardId={onwardId}
          returnId={returnId}
          searchRequest={data?.data}
          onSaveBooking={redirectToPayment}
        />
      )}
    </div>
  );
}

export default TripSummary;
