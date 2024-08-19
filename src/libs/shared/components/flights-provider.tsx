'use client';

import { UcHeaderContextProvider } from '@uc/libs/shared/ui';
import { useState } from 'react';
import { CommonProvider } from './common-provider';
import ErrorBoundary from './error-boundry';

export function FlightsProvider({ children }: { children: React.ReactNode }) {
  const [selectedTab, setSelectedTab] = useState<string>('');

  return (
    <ErrorBoundary>
      <CommonProvider>
        <UcHeaderContextProvider value={{ selectedTab, setSelectedTab }}>{children}</UcHeaderContextProvider>
      </CommonProvider>
    </ErrorBoundary>
  );
}
