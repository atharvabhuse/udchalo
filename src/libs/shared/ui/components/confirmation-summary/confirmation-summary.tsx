import Banner from '@uc/assets/images/confirmation_banner.svg';
import Copy from '@uc/assets/images/copy_icon.svg';
import UFlights from '@uc/assets/images/uflights_small.svg';
import UFlightsBig from '@uc/assets/images/uflights_big.svg';
import Label from '@uc/assets/images/confirmation_page_label.svg';
import Email1 from '@uc/assets/images/confirmation_page_email1.svg';
import Phone1 from '@uc/assets/images/confirmation_page_phone1.svg';

import ReactDOMServer from 'react-dom/server';
import { useState } from 'react';
import styles from './confirmation-summary.module.scss';
import { failedBookingMessage } from '@uc/libs/flights/shared/ui/components/confirmation/confirmation.constant';
import {
  BookingFailedBanner,
  ConfirmationFailedBanner,
  ConfirmationPendingBanner,
  ConfirmationSummaryThread,
} from '../..';

/* eslint-disable-next-line */
interface Summary {
  pnr: string;
  bookingID: string;
  originCode: string;
  destinationCode: string;
  origin: string;
  destination: string;
  departTime: string;
  arrivalTime: string;
  travelers: number;
  class: string;
  email: string;
  phoneNumber: string;
}

export interface ConfirmationSummaryProps {
  summary: Summary[];
  status: string;
}

export function ConfirmationSummary(props: ConfirmationSummaryProps) {
  const { summary, status } = props;
  const [copiedText, setCopiedText] = useState(false);
  const copyHandler = () => {
    setCopiedText(true);
    navigator.clipboard.writeText(summary[0].pnr);
    setTimeout(() => setCopiedText(false), 1500);
  };

  const gradientStyleForFailedBooking = { backgroundImage: 'linear-gradient(to top, #fbebeb 0%, white 100%)' };
  const gradientStyleForPendingBooking = { backgroundImage: 'linear-gradient(to top, #fffcf3 0%, white 100%)' };
  const widthStyle = window.innerWidth > 600 ? { width: summary.length === 1 ? '100%' : '49%' } : {};
  const bookingStyleForFailedBooking = status === 'bookingFailed' ? gradientStyleForFailedBooking : {};
  const bookingStyleForPendingBooking = status === 'pending' ? gradientStyleForPendingBooking : {};

  let combinedStyle;
  if (status === 'bookingFailed') {
    combinedStyle = { ...widthStyle, ...bookingStyleForFailedBooking };
  } else if (status === 'pending') {
    combinedStyle = { ...widthStyle, ...bookingStyleForPendingBooking };
  }
  const isMobile = window.innerWidth < 600;

  return (
    <div className={styles.confirmation_summary_container}>
      {summary?.map(data => (
        <div className={styles.confirmation_summary} style={combinedStyle}>
          <div
            className={styles.confirmation_summary_left}
            style={window.innerWidth > 600 ? { width: summary.length === 1 ? '70%' : '100%' } : {}}>
            <div className={styles.booking_id_row}>
              <div className={styles.booking_id_left}>
                {status === 'bookingFailed' || status === 'pending' ? (
                  ''
                ) : (
                  <div>
                    PNR- <span className={styles.pnr}>{data.pnr}</span>
                  </div>
                )}
                {status === 'bookingFailed' || status === 'pending' ? (
                  ''
                ) : (
                  <Copy className={styles.copyIcon} onClick={copyHandler} />
                )}
                {/* {copiedText ? <div className={styles.copiedText}>Copied</div> : ''} */}
                <div>
                  Booking ID <span className={styles.pnr}>{data.bookingID}</span>
                </div>
              </div>
              {status === 'pending' && (
                <div className={styles.booking_id_right}>
                  <div className={styles.booking_pending_text}>IN PROGRESS</div>
                </div>
              )}
              {status === 'bookingFailed' && (
                <div className={styles.booking_id_right}>
                  <div className={styles.booking_failed_text}>FAILED</div>
                </div>
              )}
              {status === 'booked' && <div className={styles.booking_id_right}></div>}
            </div>

            <div className={styles.confirmation_summary_details}>
              <div className={styles.location_code_row}>
                <div className={styles.location_code}>{data.originCode}</div>
                <div className={styles.location_code}>{data.destinationCode}</div>
              </div>

              <div className={styles.location_code_row}>
                <div className={styles.location}>{data.origin}</div>
                <div className={styles.location}>{data.destination}</div>
              </div>

              <div className={styles.location_code_row}>
                <div className={styles.location_with_padding}>Departure</div>
                <div className={styles.location_with_padding}>Arrival</div>
              </div>

              <div className={styles.location_code_row}>
                <div className={styles.date_text}>{data.departTime}</div>
                <div className={styles.date_text}>{data.arrivalTime}</div>
              </div>
            </div>
            <div className={styles.white_circle}> </div>

            {status === 'bookingFailed' && (
              <div className={styles.traveler_summary_details_booking_failed}>
                <div className={styles.booking_failed_container}>
                  <div className={styles.booking_failed_header}>Dear Traveller</div>
                  <div className={styles.booking_failed_desc}>{failedBookingMessage}</div>
                  <div className={styles.booking_failed_thankyou_message}>
                    {isMobile ? 'We apologize for any inconvenience caused.' : 'Thank you for your patience!'}
                  </div>
                </div>
                <div className={styles.uflights}>
                  <UFlightsBig />
                </div>
              </div>
            )}

            {status === 'booked' && (
              <div className={styles.traveler_summary_details}>
                <div className={styles.traveler_summary_details_left}>
                  <div className={styles.traveler_summary_details_left_box}>
                    <div>Travllers</div>
                    <div className={styles.traveler_text}>
                      {data.travelers < 10 ? `0${data.travelers}` : data.travelers}
                    </div>
                  </div>
                  <div className={styles.traveler_summary_details_left_box}>
                    <div>Class</div>
                    <div className={styles.traveler_text}>{data.class}</div>
                  </div>
                  <div className={styles.uflights}>
                    <UFlightsBig />
                  </div>
                </div>

                {summary.length === 1 || window.innerWidth < 600 ? (
                  <div className={styles.traveler_summary_details_right}>
                    <div className={styles.ticket_text}>Ticket sent to</div>
                    <div className={styles.traveler_summary_details_right_row}>
                      <Email1 className={styles.traveler_summary_email} />
                      <div>{data.email}</div>
                    </div>
                    <div className={styles.traveler_summary_details_right_row}>
                      <Phone1 className={styles.traveler_summary_email} />
                      <div>{data.phoneNumber}</div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.traveler_summary_details_right}
                    style={{
                      backgroundImage: 'url(/assets/images/confirmation_banner.svg)',
                    }}
                  />
                )}
                <div className={styles.uflights_big}>
                  <UFlightsBig />
                </div>
              </div>
            )}
          </div>
          {isMobile && status !== 'pending' && (
            <div className={styles.confirmation_summary_right}>
              {status === 'booked' && (
                <>
                  <div className={styles.thread}>
                    <ConfirmationSummaryThread />
                  </div>
                  <Banner className={styles.banner} />
                </>
              )}
              {status === 'bookingFailed' && isMobile && <BookingFailedBanner />}
            </div>
          )}
          {!isMobile && (
            <div className={styles.confirmation_summary_right}>
              {status === 'booked' && (
                <>
                  <div className={styles.thread}>
                    <ConfirmationSummaryThread />
                  </div>
                  <Banner className={styles.banner} />
                </>
              )}
              {status === 'pending' && <ConfirmationPendingBanner />}
              {status === 'bookingFailed' && <ConfirmationFailedBanner className={styles.banner} />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ConfirmationSummary;
