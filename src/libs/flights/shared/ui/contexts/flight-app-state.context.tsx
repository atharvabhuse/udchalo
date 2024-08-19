import { ReactNode, createContext, useContext } from 'react';

export interface AppState {
  userData: any;
  setUserData: (value: any) => void;
  currentQuickAction: any;
  setCurrentQuickAction: (value: any) => void;
  resetAppState: () => void;
}

export const FlightAppStateContext = createContext<AppState | null>(null);

export interface FlightAppStateProviderProps {
  children: ReactNode;
  state: AppState;
}

export function FlightAppStateProvider({ children, state }: FlightAppStateProviderProps) {
  return <FlightAppStateContext.Provider value={state}>{children}</FlightAppStateContext.Provider>;
}

export function useFlightAppStateContext() {
  const context = useContext(FlightAppStateContext);

  if (!context) {
    // throw new Error('useFlightAppStateContext must only be used within a FlightAppStateProvider');
  }

  return context;
}

export default FlightAppStateProvider;
