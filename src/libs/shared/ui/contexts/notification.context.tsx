'use client';

import { NotificationContextType, NotificationQueueType } from '@uc/services/network';
import { useMemo, useState, createContext, useContext, ReactNode } from 'react';

const initialState = {
  information: [],
  setInformation: () => {},
  sendNotification: () => {}
};
export const NotificationContext = createContext<NotificationContextType | undefined>(initialState);

function NotificationContextProvider({ children }: { children: ReactNode }) {
  const [information, setInformation] = useState<NotificationQueueType[]>([]);
  const sendNotification = (info: NotificationQueueType) => {
    setInformation(prevState => [...prevState, info]);
  };
  const state = useMemo(
    () => ({
      information,
      setInformation,
      sendNotification,
    }),
    [information]
  );

  return <NotificationContext.Provider value={state}>{children}</NotificationContext.Provider>;
}

export function useNotificationContextProvider():NotificationContextType {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useSharedAppStateContext must only be used within a SharedAppStateProvider');
  }

  return context;
}

export default NotificationContextProvider;
