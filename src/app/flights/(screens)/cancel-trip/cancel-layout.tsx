import { CancelWorkflowContextProvider } from '@uc/libs/flights/shared/ui';
import { ReactNode } from 'react';

export interface LayoutProps {
  children?: ReactNode;
}

function CancelTripLayout({ children }: LayoutProps) {
  const stubSetPassengerFunction = () => {};

  return (
    <CancelWorkflowContextProvider value={{ setSelectedPassengersIds: stubSetPassengerFunction }}>
      <main>{children}</main>
    </CancelWorkflowContextProvider>
  );
}

export default CancelTripLayout;
