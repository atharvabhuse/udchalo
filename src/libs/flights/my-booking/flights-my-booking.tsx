import { useState } from 'react';
import { MSiteMenuToggleButton, MSiteUcHeader } from '@uc/libs/shared/ui';
import router from 'next/navigation';
import Bookings from './components/bookings/bookings';
import styles from './flights-my-booking.module.scss';

/* eslint-disable-next-line */
export interface FlightsMyBookingProps {
  onTabClick: (value: string) => void;
  backHandler: (url: string) => void;
}

export function FlightsMyBooking({ onTabClick, backHandler }: FlightsMyBookingProps) {
  return (
    <div>
      <MSiteUcHeader backHandler={backHandler}>
        <MSiteUcHeader.LeftContent>
          <h1>My Booking</h1>
        </MSiteUcHeader.LeftContent>

        <MSiteUcHeader.RightContent>
          <MSiteMenuToggleButton />
        </MSiteUcHeader.RightContent>
      </MSiteUcHeader>
      <Bookings tabClick={onTabClick} />
    </div>
  );
}

export default FlightsMyBooking;
