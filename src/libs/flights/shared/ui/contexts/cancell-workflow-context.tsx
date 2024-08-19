import { ReactNode, createContext, useContext } from 'react';

export interface CancelWorkflowContextData {
  reasonToClaim?: string;
  setReasonToClaim?: (value: string) => void;
  selectedPassengersIds?: Array<string>;
  setSelectedPassengersIds: (value: any) => void;
  isSeperateProofForEachTraveller?: boolean;
  setIsSeperateProofForEachTraveller?: (value: boolean) => void;
}

export const CancelWorkflowContext = createContext<CancelWorkflowContextData | null>(null);

export interface CancelContextProvidersProps {
  children: ReactNode;
  value: CancelWorkflowContextData;
}

export function CancelWorkflowContextProvider({ children, value }: CancelContextProvidersProps) {
  return <CancelWorkflowContext.Provider value={value}>{children}</CancelWorkflowContext.Provider>;
}

export function useCancelWorkflowContext() {
  const context = useContext(CancelWorkflowContext);

  if (!context) {
    throw new Error('CancelContext must only be used within a CancelContextProvider');
  }

  return context;
}

export default CancelWorkflowContextProvider;
