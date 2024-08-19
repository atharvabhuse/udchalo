import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import {
  Email,
  Facebook,
  GroupBookingIcon,
  Instagram,
  Linkedin,
  NoteIcon,
  Phone,
  QuestionMarkIcon,
  SurakshaLogo,
  SurakshaSheild,
  Twitter,
  Whatsapp,
  Youtube,
} from '@uc/assets/images';
import ChangeInPlans from '@uc/libs/flights/booking-details/components/change-in-plans/change-in-plans';
import { FlightLegDetails, useCancelWorkflowContext } from '@uc/libs/flights/shared/ui';
import { MSiteUcHeader, UcCard } from '@uc/libs/shared/ui';
import UcFollowUsAndDownload from '@uc/libs/shared/ui/components/uc-follow-us-and-download/uc-follow-us-and-download';
import UcSupport from '@uc/libs/shared/ui/components/uc-support/uc-support';
import { useGetBookingDetails, useGetSurakshaBookingDetails } from '@uc/services/network';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
import { configUrls } from '../../../../../services/network/api-endpoints';
import CancellationStepper from '../cancellation-stepper/cancellation-stepper';
import styles from './flight-cancellation-done.module.scss';

export interface FlightCancellationDoneProps {
  bookingId: string;
  flightId: string;
  cancelledPassengerIds: Array<string>;
  backHandler: (url: string) => void;
}

export function FlightCancellationDone({
  bookingId,
  flightId,
  cancelledPassengerIds,
  backHandler,
}: FlightCancellationDoneProps) {
  const ctx = useCancelWorkflowContext();

  const { data: getCancellationData }: any = useGetBookingDetails({ bookingId, flightId });

  const cancellId = cancelledPassengerIds[0]?.split(':');

  const [bookingData, setBookingData] = useState<any>({});

  const contactOptions = [
    {
      icon: <Phone />,
      contactHeading: '+91 9272203030',
      link: 'tel:+919272203030',
    },
    {
      icon: <Whatsapp />,
      contactHeading: '+91 8408833030',
      link: 'https://wa.me/8408833030',
    },
    {
      icon: <Email />,
      contactHeading: 'customercare@udchalo.com',
      link: 'mailto:customercare@udchalo.com',
    },
  ];

  const followusIcon = [
    {
      icon: <Linkedin />,
      link: 'https://www.linkedin.com/company/udchalo/',
    },
    {
      icon: <Instagram />,
      link: 'https://www.instagram.com/udchalo_official/',
    },
    {
      icon: <Twitter />,
      link: 'https://www.twitter.com/udchalo',
    },
    {
      icon: <Facebook />,
      link: 'https://www.facebook.com/udchalo',
    },
    {
      icon: <Youtube />,
      link: 'https://www.youtube.com/channel/UCa2XfSNuWwE5ryqLPp48t7w',
    },
  ];

  useEffect(() => {
    if (getCancellationData) {
      setBookingData(getCancellationData.data.response);
    }
  }, [getCancellationData]);

  const onCopyToClipBoard = () => {
    copy(bookingData?.pnr as string);
  };

  const onUserClickAction = () => {};

  const downloadTicketHandler = () => {
    window.open(
      `${configUrls.downloadTicketUrl}/${bookingData.pnr}/${bookingData?.contactDetails?.email}?bookingId=${bookingId}`,
      '_blank'
    );
  };

  const onDownload = () => {};

  const [toastMessage, setToastMessage] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setToastMessage(false);
    }, 5000);
  }, []);

  const { data } = useGetSurakshaBookingDetails(bookingId, flightId);

  const totalPassengersWhileBooking = getCancellationData?.data?.response?.passengers?.length;

  const surakshaBookingDetails = (data as any)?.data?.response?.[0] || null;

  const [expanded, setExpanded] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState();
  const expandedHandler = (index: any) => {
    setExpandedIndex(index);
    setExpanded(!expanded);
  };

  const [activeStep, setActiveStep] = useState(0);
  const activeStepCallbackHandler = (activeStepArg: number) => {
    setActiveStep(activeStepArg)
  }

  return (
    <div>
      <MSiteUcHeader backHandler={backHandler}>
        <MSiteUcHeader.LeftContent>
          <div>
            <h1>Booking Cancelled</h1>
            <h1 className={styles.sub_heading}>{`Booking ID - ${bookingId}`}</h1>
          </div>
        </MSiteUcHeader.LeftContent>
        <MSiteUcHeader.RightContent>
          <QuestionMarkIcon />
        </MSiteUcHeader.RightContent>
      </MSiteUcHeader>
      {toastMessage ? (
        <div className={styles.notification_root}>
          <div className={styles.notification}>
            <div className={styles.icon}>
              <span>
                <CheckCircleOutlineOutlinedIcon />
              </span>
            </div>

            <div className={styles.succes_alert_title_description}>
              <span className={styles.success_alert_title}>Cancellation request received!</span>{' '}
              <span className={styles.success_alert_description}>
                Actual refund amount is subjected to Airline’s Refund policy.
              </span>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className={styles.my_bookings_root}>
        <div className={styles.left_pane}>
          <div className={styles.pnr_box_and_leg_details}>
            <div className={styles.box}>
              <div className={styles.pnr_box}>
                <span className={styles.pnr}>PNR :{bookingData?.pnr}</span>
                <div className={styles.copy_icon} onClick={onCopyToClipBoard}>
                  <ContentCopyOutlinedIcon className={styles.icon} />
                </div>
              </div>
              <div className={styles.box_right}>
                <span className={styles.status}> Cancelled</span>
                {bookingData?.isDefence && (
                  <div className={styles.type}>
                    <span>Defence</span>
                  </div>
                )}
              </div>
            </div>

            {bookingData?.departDate && (
              <UcCard id="tripSummary" className={styles.leg_details}>
                <FlightLegDetails
                  legDetails={bookingData}
                  departDate={bookingData?.departDate}
                  arriveDate={bookingData?.arriveDate}
                  tripMode="cancelled"
                />
              </UcCard>
            )}
          </div>
          <div className={styles.traveller_details_and_note_card}>
            <UcCard id="tripSummary" className={styles.cancell_travel_details}>
              {surakshaBookingDetails?.isSurakshaOpted === true ? (
                <div className={styles.suraksha_container}>
                  <div className={styles.suraksha_left}>
                    <div className={styles.suraksha_logo}>
                      <SurakshaLogo />
                    </div>
                    <div className={styles.claim_text}>Booking Covered under Suraksha</div>
                  </div>
                  <div className={styles.suraksha_right}>
                    <div className={styles.suraksha_shield_logo}>
                      <SurakshaSheild />
                    </div>
                    <div className={styles.covered_text}>What is covered?</div>
                  </div>
                </div>
              ) : (
                ''
              )}
              {totalPassengersWhileBooking === cancelledPassengerIds[0]?.split(':').length ? (
                <>
                  <div className={styles.traveller_details_container}>
                    <div className={styles.traveller_details_header_container}>
                      <GroupBookingIcon className={styles.traveller_details_icon} />
                      <div className={styles.traveller_details_header}>Traveler Details</div>
                    </div>
                    <div className={styles.travellers_name_container}>
                      {bookingData &&
                        bookingData.passengers &&
                        bookingData.passengers
                          .filter((passRecord: any) => cancellId?.find((id: any) => id === passRecord.passengerId))
                          .map((passengerDetails: any, index: any) => {
                            const list = (
                              <li key={index} className={styles.traveller_name}>
                                {`${passengerDetails?.name?.firstName} ${passengerDetails?.name?.lastName}`} (
                                {passengerDetails?.name?.gender === 'male' || 'MALE' ? 'M' : 'F'})
                              </li>
                            );
                            return list;
                          })}
                    </div>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.cancellation_stepper}>
                    
                    <CancellationStepper stepperDetails={surakshaBookingDetails} activeStepCallback={activeStepCallbackHandler}/>
                  </div>
                </>
              ) : (
                cancelledPassengerIds[0]?.split(':').map((id, index) => {
                  const passenger = getCancellationData?.data?.response?.passengers?.filter(
                    data => data.passengerId === id
                  );
                  return (
                    <Accordion
                      className={styles.accordion}
                      expanded={index === expandedIndex}
                      onClick={() => expandedHandler(index)}
                      key={index}>
                      <AccordionSummary className={styles.accordionSummary} expandIcon={<ExpandMoreIcon />}>
                        <p className={styles.refund_row}>
                          Refund Status:{' '}
                          {passenger
                            ? `${passenger[0]?.name?.firstName} ${passenger[0]?.name
                                ?.lastName} (${passenger[0]?.gender[0].toUpperCase()})`
                            : ''}
                        </p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={styles.cancellation_stepper}>
                          <CancellationStepper stepperDetails={surakshaBookingDetails} activeStepCallback={activeStepCallbackHandler}/>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              )}

              {/* {totalPassengersWhileBooking === cancelledPassengerIds.length ? (
                <div className={styles.note}>
                  <NoteIcon />
                  <span className={styles.heading}>
                    Note :{' '}
                    <span className={styles.text}>Actual refund amount is subjected to Airline’s Refund policy.</span>
                  </span>
                </div>
              ) : (
                ''
              )} */}
            </UcCard>
            <div className={styles.promo_button_container}>
            <button
              type="button"
              onClickCapture={onDownload}
              className={activeStep >= 1 ? styles.ticket_button : styles.ticket_button_disabled}
              onClick={downloadTicketHandler}>
              Download Cancelled Ticket
            </button>
          </div>
          </div>
        </div>
        <div className={styles.right_pane}>
          <div className={activeStep >= 1 ? styles.change_in_plan : styles.change_in_plan_disabled}>
            <ChangeInPlans tripMode="cancel_trip" heading="Share Options" desc="" onChangeInplans={onUserClickAction} />
          </div>
          <div className={styles.uc_support}>
            <UcSupport contactOptions={contactOptions} header="For General queries, you can contact us on" />
          </div>

          <div className={styles.follow_us_and_download}>
            <UcFollowUsAndDownload heading="Follow us on" icons={followusIcon} />
          </div>

          <div className={styles.promo_button_container}>
            <button
              type="button"
              onClickCapture={onDownload}
              className={activeStep >= 1 ? styles.ticket_button : styles.ticket_button_disabled}
              onClick={downloadTicketHandler}>
              Download Cancelled Ticket
            </button>
          </div>
        </div>
      </div>
      <div className={styles.m_site_promo_button_container}>
        <button
          type="button"
          onClickCapture={onDownload}
          className={activeStep >= 1 ? styles.ticket_button : styles.ticket_button_disabled}
          onClick={downloadTicketHandler}>
          Download Cancelled Ticket
        </button>
      </div>
    </div>
  );
}

export default FlightCancellationDone;
