'use client';

import { FlightsSearchResults } from '@uc/libs/flights/search-results';
import { useGetSearchRequest } from '@uc/services/network';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export interface RescheduleSearchResultsProps {}
function RescheduleSearchResults() {
  const router = useRouter();
  const { pathVariables } = useParams();

  const sessionId = (pathVariables && pathVariables.length && pathVariables[0]) || '';

  const { data, refetch }: any = useGetSearchRequest([sessionId], sessionId, { enabled: !!false });


  useEffect(() => {
    if (sessionId) {
      refetch();
    }
  }, [sessionId]);

  const onSearch = () => {};

  const loadTripSummaryForFlightReschedule = (flightId: string) => {
    const { adults } = data?.data?.response?.search;
    router.push(`/flights/reschedule/review/${sessionId}?onwardId=${flightId}&returnId=${''}&adults=${adults}`);
  };

  const backHandler = () => {
    router.push('/flights');
  };

  return (
    data && (
      <div></div>
    )
  );
}
export default RescheduleSearchResults;
