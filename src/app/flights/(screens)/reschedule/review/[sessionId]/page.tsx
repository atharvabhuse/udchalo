'use client';

import { useGetSearchRequest } from '@uc/services/network';
import { FlightsTripSummary } from '@uc/libs/flights/trip-summary';

export interface RescheduleSearchResultsProps {}
function RescheduleTripSummary({
  params,
  searchParams,
}: {
  params: { sessionId: string };
  searchParams: { onwardId: string; returnId: string; adults: number };
}) {
  const sessionId = params.sessionId || '';

  const { onwardId } = searchParams;
  const { data, isLoading }: any = useGetSearchRequest([sessionId], sessionId, { enabled: !!sessionId });

  const handleBookingResult = () => {};

  return (
    <div>
      {isLoading ? (
        <div className="box shine" />
      ) : (
        <FlightsTripSummary
          sessionId={sessionId}
          onwardId={onwardId}
          returnId=""
          searchRequest={data?.data}
          onSaveBooking={handleBookingResult}
        />
      )}
    </div>
  );
}
export default RescheduleTripSummary;
