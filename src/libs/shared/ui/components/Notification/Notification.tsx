'use client'

import React, { useEffect, useState } from 'react';
import { NotificationQueueType } from '@uc/services/network';
import { ToastContainer, toast } from 'react-toastify';
import { useNotificationContextProvider } from '../../contexts/notification.context';
import 'react-toastify/dist/ReactToastify.css';

function Notification() {
  const {
    information,
    setInformation,
  }: {
    information: NotificationQueueType[];
    setInformation: React.Dispatch<React.SetStateAction<NotificationQueueType[]>>;
  } = useNotificationContextProvider();
  const [notificationQueue, setNotificationQueue] = useState<NotificationQueueType[]>([]);

  useEffect(() => {
    setNotificationQueue(information);
  }, [information]);

  useEffect(() => {
    if (notificationQueue?.length > 0) {
      notificationQueue.forEach((data, index) => {
        toast(`${index + 1}. ${data.info}`, {
          position: 'top-right',
          type: data?.variant ?? 'default',
          autoClose: data?.autoHideDuration ?? 3000,
        });
      });
      setInformation([]);
    }
  }, [notificationQueue]);

  return <ToastContainer />;
}

export default Notification;
