import { ReactNode, createContext, useContext } from 'react';

export interface AppState {
  userData: any;
  setUserData: (value: any) => void;
  resetAppState: () => void;
  checkAuthentication: boolean;
  resetCheckAuthentication: () => void;
  validateAuthentication: () => void;
}

export const SharedAppStateContext = createContext<AppState | null>(null);

export interface SharedAppStateProviderProps {
  children: ReactNode;
  state: AppState;
}

export function SharedAppStateProvider({ children, state }: SharedAppStateProviderProps) {
  return <SharedAppStateContext.Provider value={state}>{children}</SharedAppStateContext.Provider>;
}

export function useSharedAppStateContext() {
  const context = useContext(SharedAppStateContext);

  if (!context) {
    throw new Error('useSharedAppStateContext must only be used within a SharedAppStateProvider');
  }

  return context;
}

export default SharedAppStateProvider;
