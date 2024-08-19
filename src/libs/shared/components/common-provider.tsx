'use client';

import { ThemeProvider } from '@emotion/react';
import { ThemeOptions, createTheme } from '@mui/material';
import { UDCHALO_TOKEN } from '@uc/utils/constants';
import { retrieveFromLocalStorage } from '@uc/services/network';
import { SharedAppStateProvider } from '@uc/libs/shared/ui';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotificationContextProvider from '../ui/contexts/notification.context';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#32996A',
    },
    secondary: {
      main: '#3398D5',
    },
    error: {
      main: '#CC1100',
    },
    warning: {
      main: '#f48d42',
    },
    info: {
      main: '#F3F7FF',
    },
    success: {
      main: '#00B00C',
    },
    divider: '#C5D4E3',
  },
  typography: {
    fontFamily: 'Open Sans',
    h1: {
      fontSize: '28pt',
      fontWeight: 500,
    },
    h2: {
      fontSize: '26pt',
      fontWeight: 500,
    },
    h3: {
      fontSize: '14pt',
      fontWeight: 300,
    },
    h4: {
      fontSize: '12pt',
    },
    h5: {
      fontSize: '10pt',
      fontWeight: 300,
    },
    subtitle1: {
      fontSize: '14pt',
      fontWeight: 300,
    },
    subtitle2: {
      fontSize: '10pt',
      fontWeight: 300,
    },
  },
};

const theme = createTheme(themeOptions);

export function CommonProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });

  const [userData, setUserData] = useState<any | null>(null);
  const [checkAuthentication, setCheckAuthentication] = useState<boolean>(true);

  const resetAppState = () => {
    setUserData(null);
    setCheckAuthentication(true);
  };

  const resetCheckAuthentication = () => {
    setCheckAuthentication(false);
  };

  const validateAuthentication = () => {
    if (!retrieveFromLocalStorage(UDCHALO_TOKEN)) {
      setCheckAuthentication(true);
    }
  };

  const updateUserData = (user: any) => {
    resetCheckAuthentication();
    setUserData(user);
  };

  const state = {
    userData,
    setUserData: updateUserData,
    resetAppState,
    checkAuthentication,
    resetCheckAuthentication,
    validateAuthentication,
  };

  return (
    <NotificationContextProvider>
      <SharedAppStateProvider state={state}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ThemeProvider>
      </SharedAppStateProvider>
    </NotificationContextProvider>
  );
}
