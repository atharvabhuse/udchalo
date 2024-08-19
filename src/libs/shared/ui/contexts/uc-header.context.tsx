import { ReactNode, createContext, useContext } from 'react';

export interface UcHeaderContextData {
  selectedTab: any;
  setSelectedTab: (value: any) => void;
}

export const UcHeaderContext = createContext<UcHeaderContextData | null>(null);

export interface UcHeaderContextProviderProps {
  children: ReactNode;
  value: UcHeaderContextData;
}

export function UcHeaderContextProvider({ children, value }: UcHeaderContextProviderProps) {
  return <UcHeaderContext.Provider value={value}>{children}</UcHeaderContext.Provider>;
}

export function useUcHeaderContext() {
  const context = useContext(UcHeaderContext);

  if (!context) {
    throw new Error('useUcHeaderContext must only be used within a UcHeaderContextProvider');
  }

  return context;
}

export default UcHeaderContextProvider;
