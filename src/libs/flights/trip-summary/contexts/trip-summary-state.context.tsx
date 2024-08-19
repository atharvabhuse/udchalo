import { ReactNode, createContext, useContext } from 'react';
import { IFlightTripSummaryState } from '../flights-trip-summary-reducer';
// import { FlightTripSummaryState } from '../models';

export const TripSummaryStateContext = createContext<IFlightTripSummaryState | null>(null);

export interface TripSummaryStateProviderProps {
  children: ReactNode;
  state: any;
}

function TripSummaryStateProvider({ children, state }: TripSummaryStateProviderProps) {
  return <TripSummaryStateContext.Provider value={state}>{children}</TripSummaryStateContext.Provider>;
}

export function useTripSummaryStateContext() {
  const context = useContext(TripSummaryStateContext);

  if (!context) {
    throw new Error('useTripSummaryStateContext must only be used within a TripSummaryStateProvider');
  }

  return context;
}

export default TripSummaryStateProvider;
