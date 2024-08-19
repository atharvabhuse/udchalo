import { ExtrasCard, FlightLegDetails } from '@uc/libs/flights/shared/ui';
import {
  AddInsurance,
  AppStore,
  BaggageDetails,
  BannerWithicon,
  BookedContactDetails,
  BookedTravellerDetails,
  ContentCopyOutlinedIcon,
  Email,
  Facebook,
  GooglePlay,
  Instagram,
  Linkedin,
  MSiteUcHeader,
  Percentage,
  Phone,
  QuestionMarkIcon,
  ShareIcon,
  TotalPayMsiteAccordian,
  Twitter,
  UcCTABanner,
  UcCard,
  UcFareBreakup,
  WebCheckIn,
  Whatsapp,
  Youtube,
} from '@uc/libs/shared/ui';
import UcPromo from '@uc/libs/shared/ui/components/uc-promo/uc-promo';
import { configUrls, useGetBookingDetails } from '@uc/services/network';
import UcFollowUsAndDownload from '@uc/libs/shared/ui/components/uc-follow-us-and-download/uc-follow-us-and-download';
import UcSupport from '@uc/libs/shared/ui/components/uc-support/uc-support';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
import { BookingDetails } from './components/booking-details.constant';
import ChangeInPlans from './components/change-in-plans/change-in-plans';

import styles from './flights-booking-details.module.scss';
// import copy from 'copy-to-clipboard';

export interface FlightsBookingDetailsProps {
  flightId: string;
  bookingId: string;
  onPlanChange: (action: string) => void;
  backHandler: (url: string) => void;
}

function FlightsBookingDetails(props: FlightsBookingDetailsProps) {
  const { bookingId, flightId, onPlanChange, backHandler } = props;
  const openExtras = (index: number) => {};

  const bookingConst = BookingDetails;

  const { data: getBookingDetails }: any = useGetBookingDetails({
    bookingId,
    flightId,
  });

  const [bookingData, setBookingData] = useState<any>({});

  const onPlanChangeHandler = (data: string) => {
    onPlanChange(data);
  };

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

  const downloadUdChaloApp = [
    {
      icon: <GooglePlay />,
      link: 'https://play.google.com/store/apps/details?id=app.udChalo.flights&ah=wIu69aquTqbCHd50dPhX-lfg_M0&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
    },
    {
      icon: <AppStore />,
      link: 'https://apps.apple.com/in/app/udchalo/id1454639734',
    },
  ];

  const onCopyToClipboard = () => {
    copy(bookingData?.pnr as string);
  };

  interface Review {
    baseFare: number;
    taxesAndFees: number;
    conveienceFees: number;
    surakshaFees?: number;
    insuranceFees?: number;
    seatFee?: number;
    mealFee?: number;
    baggageFee?: number;
    udChaloCredits?: number;
    myCashRewards?: number;
  }

  const review: Review = {
    baseFare: bookingData?.fare?.baseTotalFare,
    taxesAndFees: bookingData?.fare?.totalFee + bookingData?.fare?.totalTax,
    conveienceFees: bookingData?.fare?.totalConvenienceFee,
  };

  const discount = {
    name: bookingData?.discount?.code,
    price: bookingData?.discount?.amount,
  };

  const downloadTicketHandler = () => {};

  const fareHandler = () => {};

  useEffect(() => {
    setBookingData(getBookingDetails?.data?.response);
  }, [getBookingDetails]);

  const onDownload = () => {
    window.open(
      `${configUrls.downloadTicketUrl}/${bookingData.pnr}/${bookingData?.contactDetails?.email}?bookingId=${bookingId}`,
      '_blank'
    );
  };

  const routingFunction = (url: string) => {
    throw new Error('Function not implemented.');
  };

  const formatDate = (originalDate: string | number | Date) => {
    const date = new Date(originalDate);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  const formattedDate = bookingData?.dateOfBooking ? formatDate(bookingData?.dateOfBooking) : '';

  const date = formattedDate || '';

  const origin = bookingData?.origin;
  const destination = bookingData?.destination;

  const [totalFare, setTotalFare] = useState<any>(0);
  const totalFareHandler = (data: any) => {
    setTotalFare(data);
  };
  return (
    <div>
      <MSiteUcHeader backHandler={backHandler}>
        <MSiteUcHeader.LeftContent>
          <h1>{`Booking ID : ${bookingId}`}</h1>
          <div className={styles.origin_destination_and_date}>{`${origin} - ${destination} | Booked on ${date}`}</div>
        </MSiteUcHeader.LeftContent>

        <MSiteUcHeader.RightContent>
          <div className={styles.question_and_share_icon}>
            <div className={styles.icon}>
              <QuestionMarkIcon />
            </div>

            <div className={styles.icon}>
              <ShareIcon />
            </div>
          </div>
        </MSiteUcHeader.RightContent>
      </MSiteUcHeader>
      <div className={styles.my_bookings_root}>
        <div className={styles.left_pane}>
          <div className={styles.container_from_pnr_to_baggage}>
            <div className={styles.box}>
              <div className={styles.pnr_box}>
                <span className={styles.pnr}>PNR :{bookingData?.pnr}</span>
                <span className={styles.copy_icon} onClick={onCopyToClipboard}>
                  <ContentCopyOutlinedIcon className={styles.icon} />
                </span>
              </div>
              <div>
                <span className={styles.status}> Confirmed</span>
                {bookingData?.isDefence && (
                  <div className={styles.type}>
                    <span>Defence</span>
                  </div>
                )}
              </div>
            </div>

            {bookingData?.departDate && (
              <UcCard id="tripSummary" className={styles.leg_detail_container}>
                <FlightLegDetails
                  legDetails={bookingData}
                  departDate={bookingData?.departDate}
                  arriveDate={bookingData?.arriveDate}
                />
              </UcCard>
            )}

            <div id="travellerDetails" className={styles.traveller_details}>
              <BookedTravellerDetails bookedTravellDetails={bookingData?.passengers} isReadOnly={false} />
            </div>

            <div id="baggageDetails" className={styles.baggage_details}>
              <BaggageDetails baggageDetailsData={bookingData?.benefits} isReadOnly={false} />
            </div>

            <div className={styles.m_site_surksha_card}>
              {bookingData?.isSurakshaOpted && (
                <div id="suraksha" className={styles.suraksha}>
                  <BannerWithicon bannerType="suraksha" heading=" Your trip is now covered under suraksha" />
                </div>
              )}
            </div>
          </div>
          <div className={styles.container_from_contact_to_cta_banner}>
            <div id="bookedContactDetails" className={styles.contact_details}>
              <BookedContactDetails
                fullName={`${bookingData?.contactDetails?.name?.firstName} ${bookingData?.contactDetails?.name?.lastName}`}
                email={bookingData?.contactDetails?.email}
                phoneNumber={bookingData?.contactDetails?.phoneNumber}
              />
            </div>

            {bookingData?.isSurakshaOpted && (
              <div id="suraksha" className={styles.suraksha}>
                <BannerWithicon bannerType="suraksha" heading=" Your trip is now covered under suraksha" />
              </div>
            )}

            <div className={styles.m_site_web_checkin_card}>
              <div className={styles.web_checkin}>
                <WebCheckIn
                  departDate={bookingData?.departDate}
                  pnr={bookingData?.pnr}
                  airlineType={bookingData?.airline}
                  heading="Web Check-In is Open Now"
                  desc="Web check-in is mandatory and free. Counter check-in will attract extra charges."
                  onWebCheckIn={routingFunction}
                />
              </div>
            </div>

            <div id="extras" className={styles.extras}>
              <div className={styles.heading}>Add Extra</div>
              <div className={styles.m_site_heading}>Extras</div>
              <div className={styles.sub_heading}>
                Make your journey hassle-free by adding Seats, Meals, and Baggage
              </div>
              {bookingConst.extras.map((data, index: number) => (
                <ExtrasCard
                  desc={data.desc}
                  heading={data.heading}
                  key={index}
                  openPopupCallback={() => openExtras(index)}
                />
              ))}
            </div>
            <div id="addInsurance" className={styles.insurance_card}>
              <AddInsurance />
            </div>
            <div id="holidayBanner" className={styles.holiday_banner}>
              <UcCTABanner holiday={bookingConst.holiday} />
            </div>
          </div>
        </div>
        <div className={styles.right_pane}>
          <div className={styles.container_from_wecheckin_to_cta_msite_contact}>
            <div className={styles.web_checkin}>
              <WebCheckIn
                departDate={bookingData?.departDate}
                pnr={bookingData?.pnr}
                airlineType={bookingData?.airline}
                heading="Web Check-In is Open Now"
                desc="Web check-in is mandatory and free. Counter check-in will attract extra charges."
                onWebCheckIn={routingFunction}
              />
            </div>
            <div className={styles.change_in_plan}>
              <ChangeInPlans
                tripMode=""
                heading="Change in plans?"
                desc="No worries! You can change the time and or date of your flight or cancel and process your refund with udChalo."
                onChangeInplans={onPlanChangeHandler}
              />
            </div>
            <div className={styles.m_site_insurance_card}>
              <div id="addInsurance">
                <AddInsurance />
              </div>
            </div>

            <div className={styles.m_site_contact_detail}>
              <div id="bookedContactDetails">
                <BookedContactDetails
                  fullName={`${bookingData?.contactDetails?.name?.firstName} ${bookingData?.contactDetails?.name?.lastName}`}
                  email={bookingData?.contactDetails?.email}
                  phoneNumber={bookingData?.contactDetails?.phoneNumber}
                />
              </div>
            </div>
          </div>

          <div className={styles.fare_breack_up}>
            <UcFareBreakup
              review={review}
              discount={discount}
              fareChangeCallback={fareHandler}
              seatFees={undefined}
              totalFare={totalFareHandler}
            />
          </div>
          <UcPromo
            icon={<Percentage />}
            heading={`${bookingData?.discount?.code} promo applied`}
            desc={`You have saved ₹${bookingData?.discount?.amount} on this booking`}
          />

          <div className={styles.m_site_cards}>
            <TotalPayMsiteAccordian title="Total Paid" amount={totalFare}>
              <UcFareBreakup
                review={review}
                discount={discount}
                fareChangeCallback={fareHandler}
                seatFees={undefined}
                totalFare={totalFareHandler}
              />
            </TotalPayMsiteAccordian>

            <div id="holidayBanner" className={styles.m_site_holiday_banner}>
              <UcCTABanner holiday={bookingConst.holiday} />
            </div>
          </div>

          <div className={styles.promo_button_container}>
            <button type="button" onClick={onDownload} className={styles.ticket_button}>
              Download Ticket
            </button>
          </div>

          <div className={styles.uc_support}>
            <UcSupport contactOptions={contactOptions} header="For General queries, you can contact us on" />
          </div>

          <div className={styles.follows_and_download}>
            <UcFollowUsAndDownload heading="Follow us on" icons={followusIcon} />
          </div>

          <div className={styles.download_app}>
            <UcFollowUsAndDownload heading="Download udChalo App on" icons={downloadUdChaloApp} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightsBookingDetails;
