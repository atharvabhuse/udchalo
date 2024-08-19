import { Dispatch, ReactNode, createContext, useContext } from 'react';
import { IFlightTripSummaryReducerAction } from '../flights-trip-summary-reducer';
// import { FlightTripSummaryReducerAction } from '../flights-trip-summary.reducer';

export const TripSummaryDispatchContext = createContext<Dispatch<IFlightTripSummaryReducerAction> | null>(null);

export interface TripSummaryDispatchProviderProps {
  children: ReactNode;
  dispatch: Dispatch<IFlightTripSummaryReducerAction>;
}

function TripSummaryDispatchProvider({ children, dispatch }: TripSummaryDispatchProviderProps) {
  return <TripSummaryDispatchContext.Provider value={dispatch}>{children}</TripSummaryDispatchContext.Provider>;
}

export function useTripSummaryDispatchContext() {
  const context = useContext(TripSummaryDispatchContext);

  if (!context) {
    throw new Error('useTripSummaryDispatchContext must only be used within a TravellerAndContactDetailsProvider');
  }

  return context;
}

export default TripSummaryDispatchProvider;
