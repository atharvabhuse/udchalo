import { Alert, CircularProgress, Snackbar } from '@mui/material';
import {
  AppStore,
  BlueBgLeftArrowIcon,
  BlueShareIcon,
  ConfirmationPendingDownload,
  EmailIcon,
  Facebook,
  GooglePlay,
  InfoWhiteIcon,
  Instagram,
  LeftArrowIcon,
  Linkedin,
  Percentage,
  Phone,
  RealEstateIcon,
  ThankyouIcon,
  Twitter,
  WhatsappIcon1,
  Youtube,
} from '@uc/assets/images';
import { ConfirmationSummary, ThankyouPopup, UcCTABanner, UcFareBreakup } from '@uc/libs/shared/ui';
import UcFollowUsAndDownload from '@uc/libs/shared/ui/components/uc-follow-us-and-download/uc-follow-us-and-download';
import UcPromo from '@uc/libs/shared/ui/components/uc-promo/uc-promo';
import UcRating from '@uc/libs/shared/ui/components/uc-rating/uc-rating';
import UcSupport from '@uc/libs/shared/ui/components/uc-support/uc-support';
import { useGetBookResult, useGetBookingStatus } from '@uc/services/network';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import ConfirmationPendingStepper from '@uc/libs/shared/ui/components/confirmation-pending-stepper/confirmation-pending-stepper';
import { useGetNPSSurvey } from '@uc/services/network/queries/hooks/useGetNPSSurvey';
import { dateToTextConvertHandler } from '@uc/utils';
import styles from './confirmation.module.scss';
import ConfirmationOptions from '../confirmation-options/confirmation-options';
import RateUsOnScale from '../rate-us-on-scale/rate-us-on-scale';
import { BOOKING_STATUS, holidayBanner } from './confirmation.constant';
import { Style } from '@mui/icons-material';

/* eslint-disable-next-line */
export interface UcConfirmationProps {
  bookingId: string;
}

interface NpsSurveyRequiredDataInterface {
  surveyId: number;
  userId: string;
  status: string;
  rewardedAmount: number;
  discountCouponCode: number;
  email: string;
  phoneNumber: string;
  platform: string;
  userType: string;
  metadata: {
    pnr?: string;
  };
  place: string;
}

interface PopupDetails {
  icon: ReactNode;
  heading: string;
  desc: string;
  btnLink1: string;
  btnLink2: string;
  dimentions: {
    width: string;
    height: string;
  };
  closeButtonFixedPosition: {
    top: string;
    right: string;
  };
  note: boolean;
}

function UcConfirmation(props: UcConfirmationProps) {
  const { bookingId } = props;
  const fareHandler = () => {};
  const [bookingStatusCheck, setBookingStatusCheck] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState<string>('');

  const { data: bookingStatus, isLoading: bookingStatusLoading }: any = useGetBookingStatus(bookingId, {
    enabled: !!bookingId,
    onSuccess: (data: any) => {
      if (data?.data?.success === false) {
        setSnackBarMsg(data?.data?.message);
        setSnackbarVisible(true);
      }
      const statusIndex = data?.data?.response?.length > 1 ? 1 : 0;
      const status = ['booked', 'bookingFailed', 'pending'].includes(data?.data?.response[statusIndex]?.status);
      setBookingStatusCheck(status);
    },
    onError: (error: any) => {
      setSnackBarMsg(error);
      setSnackbarVisible(true);
    },
  });

  const {
    data: bookingResult,
    error,
    isLoading: bookingResultLoading,
  }: any = useGetBookResult(bookingId, {
    enabled: bookingStatusCheck,
    onSuccess: (data: any) => {
      if (data?.data?.success === false) {
        setSnackBarMsg(data?.data?.message);
        setSnackbarVisible(true);
      }
    },
    onError: (errorMessage: any) => {
      setSnackBarMsg(errorMessage);
      setSnackbarVisible(true);
    },
  });

  const { data: NPSSurveyData } = useGetNPSSurvey();
  const showNPS: boolean = NPSSurveyData?.data?.response?.show;
  const showCommentNPS: boolean = NPSSurveyData?.data?.response?.showComment;
  const npsSurveyRequiredData: NpsSurveyRequiredDataInterface = {
    surveyId: 200,
    userId: bookingResult?.data?.userId,
    status: 'submitted',
    rewardedAmount: null,
    discountCouponCode: null,
    email: bookingResult?.data?.response?.contactDetails.email,
    phoneNumber: bookingResult?.data?.response?.contactDetails.phoneNumber,
    platform: 'website',
    userType: 'verified',
    metadata: {
      pnr: bookingResult?.data?.response?.tickets?.onward?.pnr
        ? bookingResult?.data?.response?.tickets?.onward?.pnr
        : '',
    },
    place: 'flightConfirmation',
  };

  const bookingInformation: any = bookingResult?.data?.response;
  const bookingStatusVal: string = bookingStatus?.data?.response?.[0]?.status;
  const bookingTime: string = bookingResult?.data?.response?.tickets?.onward?.dateOfBooking;

  const currentDateAndTime: any = new Date();

  const displayTimerTillThisDateAndTimeForFailedBooking: any = new Date(
    new Date(bookingTime).getTime() + 2 * 60 * 60 * 1000
  );
  const durationInSecondsForFailedBooking =
    (displayTimerTillThisDateAndTimeForFailedBooking - currentDateAndTime) / 1000;
  const durationInMinutesForFailedBooking = durationInSecondsForFailedBooking / 60;

  function convertMinutesToHoursAndMinutesForFailedBooking(durationInMinutesArg: number) {
    const remainingHoursForFailedBooking = Math.floor(durationInMinutesArg / 60);
    const remainingMinutesForFailedBooking = Math.round(durationInMinutesArg % 60);
    return { remainingHoursForFailedBooking, remainingMinutesForFailedBooking };
  }

  const { remainingHoursForFailedBooking, remainingMinutesForFailedBooking } =
    convertMinutesToHoursAndMinutesForFailedBooking(durationInMinutesForFailedBooking);

  const displayTimerTillThisDateAndTimeForPendingBooking: any = new Date(
    new Date(bookingTime).getTime() + 0.75 * 60 * 60 * 1000
  );
  const durationInSecondsForPendingBooking =
    (displayTimerTillThisDateAndTimeForPendingBooking - currentDateAndTime) / 1000;
  const durationInMinutesForPendingBooking = durationInSecondsForPendingBooking / 60;

  function convertMinutesToHoursAndMinutesForPendingBooking(durationInMinutesArg: number) {
    const remainingHoursForPendingBooking = Math.floor(durationInMinutesArg / 60);
    const remainingMinutesForPendingBooking = Math.round(durationInMinutesArg % 60);
    return { remainingHoursForPendingBooking, remainingMinutesForPendingBooking };
  }

  const { remainingHoursForPendingBooking, remainingMinutesForPendingBooking } =
    convertMinutesToHoursAndMinutesForPendingBooking(durationInMinutesForPendingBooking);

  const totalInsuranceFee = 0;
  const totalSurakshaFee = 0;
  const totalSeatFee = 0;
  const totalMealFee = 0;
  const totalBaggageFee = 0;

  const extraFare = [
    {
      extraFareDescription: 'Suraksha Fees',
      extraFarePrice: totalSurakshaFee,
    },
    {
      extraFareDescription: 'Insurance',
      extraFarePrice: totalInsuranceFee,
    },
    {
      extraFareDescription: 'Seat Fee',
      extraFarePrice: bookingInformation?.tickets?.onward?.fare?.totalSeatFare ?? 0,
    },
    {
      extraFareDescription: 'Meal Fee',
      extraFarePrice: bookingInformation?.tickets?.onward?.fare?.totalMealFare ?? 0,
    },
    {
      extraFareDescription: 'Baggage Fee',
      extraFarePrice: bookingInformation?.tickets?.onward?.fare?.totalBaggageFare ?? 0,
    },
  ];

  const contactOptions = [
    {
      icon: <Phone />,
      contactHeading: '+91 9272203030',
      contactDescription: 'You can also call us on',
      link: 'tel:+919272203030',
    },
    {
      icon: <WhatsappIcon1 />,
      contactHeading: '+91 8408833030',
      contactDescription: 'Connect on WhatsApp',
      link: 'https://wa.me/8408833030',
    },
    {
      icon: <EmailIcon />,
      contactHeading: 'customercare@udchalo.com',
      contactDescription: 'For general enquiries, please send an email to',
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

  const holiday = [
    {
      header: 'Heading to Thiruvananthapuram',
      subHeader: 'Get 20% off on booking hotels with udChalo grab the deal now!',
      ctaLink: 'Book Hotels',
      link: 'https://www.udchalo.com/udchaloHolidays',
      backgroundImage: '/assets/images/thiruvananthapuram.svg',
    },
    {
      header: 'Explore our Goa holiday package',
      subHeader: 'Get 10% off on your first holiday booking with udchalo grab the deal now!',
      ctaLink: 'Explore Now',
      link: 'https://www.udchalo.com/udchaloHolidays',
      backgroundImage: '/assets/images/goa.svg',
    },
  ];

  const summary = [
    {
      pnr:
        bookingInformation?.ltcDetails && Object.keys(bookingInformation?.ltcDetails).length === 0
          ? bookingInformation?.tickets.onward.pnr
          : 'PNR is not available', // PNR is not available, if one way booking or LTC is selected. bookResult.response.tickets.onward.status should be booked for getting PNR number
      bookingID: bookingInformation?.bookingId,
      originCode: bookingInformation?.tickets.onward.origin,
      destinationCode: bookingInformation?.tickets.onward.destination,
      origin: bookingInformation?.tickets.onward.originCity,
      destination: bookingInformation?.tickets.onward.destinationCity,
      departTime: dateToTextConvertHandler(bookingInformation?.tickets.onward.segments[0].departDate),
      arrivalTime: dateToTextConvertHandler(bookingInformation?.tickets.onward.segments[0].arriveDate),
      travelers: bookingInformation?.tickets.onward.passengers.length,
      class: bookingInformation?.tickets.onward.segments[0].cabin,
      email: bookingInformation?.contactDetails.email,
      phoneNumber: bookingInformation?.contactDetails.phoneNumber,
    },
    {
      pnr:
        bookingInformation?.ltcDetails && Object.keys(bookingInformation?.ltcDetails).length === 0
          ? bookingInformation?.tickets?.return?.pnr
          : 'PNR is not available', // PNR is not available, if one way booking or LTC is selected
      bookingID: bookingInformation?.bookingId,
      originCode: bookingInformation?.tickets?.return?.origin,
      destinationCode: bookingInformation?.tickets?.return?.destination,
      origin: bookingInformation?.tickets?.return?.originCity,
      destination: bookingInformation?.tickets?.return?.destinationCity,
      departTime: dateToTextConvertHandler(bookingInformation?.tickets?.return?.segments[0].departDate),
      arrivalTime: dateToTextConvertHandler(bookingInformation?.tickets?.return?.segments[0].arriveDate),
      travelers: bookingInformation?.tickets?.return?.passengers.length,
      class: bookingInformation?.tickets?.return?.segments[0].cabin,
      email: bookingInformation?.contactDetails.email,
      phoneNumber: bookingInformation?.contactDetails.phoneNumber,
    },
  ];

  const popupDetails: PopupDetails = {
    icon: <ThankyouIcon />,
    heading: 'Thank you for your Feedback',
    desc: 'Please let us know what went wrong',
    btnLink1: 'Later',
    btnLink2: 'Submit',
    dimentions: {
      width: '45%',
      height: '60%',
    },
    closeButtonFixedPosition: {
      top: '16%',
      right: '25%',
    },
    note: true,
  };

  const starRatingRateUsOnPlayStorePopup: PopupDetails = {
    icon: <ThankyouIcon />,
    heading: 'Thank you for your Feedback',
    desc: 'We are happy you had a good experience, would you like to Rate on Play Store',
    btnLink1: 'Later',
    btnLink2: 'Rate on play Store',
    dimentions: {
      width: '45%',
      height: '50%',
    },
    closeButtonFixedPosition: {
      top: '20%',
      right: '25%',
    },
    note: false,
  };

  const npsPopupDetails: PopupDetails = {
    icon: <ThankyouIcon />,
    heading: 'Thank you for your Feedback',
    desc: 'We are happy you had a good experience, would you like to Rate on Play Store',
    btnLink1: 'Later',
    btnLink2: 'Rate on play Store',
    dimentions: {
      width: '65%',
      height: '50%',
    },
    closeButtonFixedPosition: {
      top: '20%',
      right: '15%',
    },
    note: false,
  };

  const [popupToShow, setPopupToShow] = useState<PopupDetails | undefined>(undefined);
  const ratingClickHandler = (ratingVal: number) => {
    if (ratingVal >= 3) {
      setPopupToShow(starRatingRateUsOnPlayStorePopup);
    } else {
      setPopupToShow(popupDetails);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setPopupToShow(npsPopupDetails);
    }, 5000);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const router = useRouter();
  const bookHotelClickHandler = () => {
    router.push('https://www.udchalo.com/udchaloHolidays');
  };

  const downloadTicketHandler = () => {
    if (summary[0].pnr === 'PNR is not available') {
      router.push(
        'https://stage-server-proxy-preprod.udchalo.com/server/api/support/getPdf/6EHXFV/atharvabhuse1@gmail.com?bookingId=28459'
      );
    } else {
      router.push(
        `https://stage-server-proxy-preprod.udchalo.com/server/api/support/getPdf/${summary[0].pnr}/${summary[0].email}?bookingId=${summary[0].bookingID}`
      );
    }
  };

  const [close, setClose] = useState<number>(2);
  const closeClickHandler = () => {
    setClose(close + 1);
  };

  const review = {
    baseFare: bookingInformation?.tickets?.onward?.fare?.baseTotalFare ?? 0,
    taxesAndFees:
      (bookingInformation?.tickets?.onward?.fare?.totalTax ?? 0) +
      (bookingInformation?.tickets?.onward?.fare?.totalFee ?? 0),
    convenienceFees: bookingInformation?.tickets?.onward?.fare?.totalConvenienceFee ?? 0,
  };
  const discount = {
    name: bookingInformation?.tickets?.onward?.discount?.code,
    price: bookingInformation?.tickets?.onward?.discount?.amount,
  };
  const discountCode = bookingInformation?.tickets?.onward?.discount?.code;
  const discountAmount = bookingInformation?.tickets?.onward?.discount?.amount;

  const backHandler = () => {
    router.push('/flights');
  };

  const [shareOpen, setShareOpen] = useState(false);
  const shareHandler = () => {
    setShareOpen(true);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  if (bookingStatusLoading || bookingResultLoading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress size={30} />
        <div className={styles.pleaseWaitMessage}>Please Wait!</div>
        <div className={styles.loadingMessage}>Fetching booking details..</div>
      </div>
    );
  }

  if (bookingStatus?.data?.sucesss === false || bookingResult?.data?.success === false) {
    return (
      <div className={styles.errorContainer}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbarVisible}
          autoHideDuration={5000}
          onClose={hideSnackbar}>
          <Alert onClose={hideSnackbar} severity="error" sx={{ width: '100%' }}>
            {snackbarMsg}
          </Alert>
        </Snackbar>
        <div className={styles.errorMessage}>There was a problem fetching booking details</div>
        {!bookingStatus?.data?.sucesss && <div className={styles.errorSubMessage}>Please try again Later.</div>}
      </div>
    );
  }

  const myBookingHandler = () => {
    router.push('/user/bookings');
  };

  const ucCreditTotalfare: number = bookingInformation?.tickets?.onward?.fare?.totalFare;
  const ucCreditDiscount: number = bookingInformation?.tickets?.onward?.discount?.amount;
  const ucCreditReferralBonus: number = bookingInformation?.tickets?.onward?.refferalBonus
    ? bookingInformation?.tickets?.onward?.refferalBonus
    : 0;
  const ucCreditSurakshaAmount: number = bookingInformation?.tickets?.onward?.suraksha?.totalCoverage
    ? bookingInformation?.tickets?.onward?.suraksha?.totalCoverage
    : 0;
  const ucCreditOnwardRefundProtection: number = bookingInformation?.tickets?.onward?.refundProtection?.fare
    ?.totalPremium
    ? bookingInformation?.tickets?.onward?.refundProtection?.fare?.totalPremium
    : 0;
  const ucCredit: number =
    (ucCreditTotalfare ?? 0) -
    (ucCreditDiscount ?? 0) -
    (ucCreditReferralBonus ?? 0) +
    (ucCreditSurakshaAmount ?? 0) +
    (ucCreditOnwardRefundProtection ?? 0);

  const isMobile = window.innerWidth < 600;

  const mSiteBookingHeadingHandler = () => {
    if (bookingStatusVal === BOOKING_STATUS.FAILED) {
      return 'Booking Failed';
    }
    if (bookingStatusVal === BOOKING_STATUS.PENDING) {
      return 'Booking In Progress';
    }
    return 'Booking Confirmed';
  };

  const baseFare = bookingInformation?.tickets?.onward?.fare?.baseTotalFare ?? 0;
  const taxesAndFees =
    (bookingInformation?.tickets?.onward?.fare?.totalTax ?? 0) +
    (bookingInformation?.tickets?.onward?.fare?.totalFee ?? 0);
  const convenienceFee = bookingInformation?.tickets?.onward?.fare?.totalConvenienceFee ?? 0;
  const couponDiscount = bookingInformation?.tickets?.onward?.discount?.amount
  const insuranceFee = 0;
  const seatFee = bookingInformation?.tickets?.onward?.fare?.totalSeatFare ?? 0;
  const mealFee = bookingInformation?.tickets?.onward?.fare?.totalMealFare ?? 0;
  const baggageFee = bookingInformation?.tickets?.onward?.fare?.totalBaggageFare ?? 0;

  const fareList = {
    youSavedText: {
      isYouSavedText: (bookingStatusVal === 'booked' || bookingStatusVal === 'pending') && isMobile,
      youSavedTextMessage: 'You saved ₹1096 on this booking'
    },
    headerText: 'Fare Breakup',
    footerText: 'Total Fare',
    listComponents: [
      {
        headerText: 'Flights Fare',
        list: [
          {
            fareName: 'Base Fare',
            fareDescription: '',
            passengerMultiplierTextShown: true,
            numberOfPassenger: 2,
            fareAmount: baseFare,
          },
          {
            fareName: 'Taxes & Fees',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: 2,
            fareAmount: taxesAndFees,
          },
          {
            fareName: 'Convenience Fee',
            fareDescription: '*(This is not refundable)',
            passengerMultiplierTextShown: false,
            numberOfPassenger: 2,
            fareAmount: convenienceFee,
          },
          {
            fareName: `Coupon - ${bookingInformation?.tickets?.onward?.discount?.code}`,
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: 2,
            fareAmount: -couponDiscount,
            isCoupon: true,
          },
        ],
      },
      {
        headerText: 'Extras',
        list: [
          {
            fareName: 'Suraksha',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: 2,
            fareAmount: 0,
          },
          {
            fareName: 'Insurance',
            fareDescription: '',
            passengerMultiplierTextShown: true,
            numberOfPassenger: 2,
            fareAmount: insuranceFee,
          },
          {
            fareName: 'Donation',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: 2,
            fareAmount: 0,
          },
          {
            fareName: 'Seat Fee',
            fareDescription: '',
            passengerMultiplierTextShown: true,
            numberOfPassenger: 2,
            fareAmount: seatFee,
          },
          {
            fareName: 'Meal Fee',
            fareDescription: '',
            passengerMultiplierTextShown: true,
            numberOfPassenger: 2,
            fareAmount: mealFee,
          },
          {
            fareName: 'Baggage Fee',
            fareDescription: '',
            passengerMultiplierTextShown: true,
            numberOfPassenger: 2,
            fareAmount: baggageFee,
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.confirmation}>
      <div className={styles.confirmation_header}>
        <button
          type="button"
          className={styles.confirmation_header_section1}
          onClick={backHandler}
          aria-label="Go Back">
           <LeftArrowIcon /> 
        </button>
        <div className={styles.confirmation_header_section2}>
          <div className={styles.confirmation_header_row}>
            <div className={styles.confirmation_header_column1}>
              <div className={styles.confirmation_header_flight}>{mSiteBookingHeadingHandler()}</div>
              {bookingStatusVal === BOOKING_STATUS.BOOKED && (
                <div className={styles.confirmation_header_flight_details}>You are all set to travel!</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.confirmation_header_section3}>
          {bookingStatusVal === BOOKING_STATUS.BOOKED && <BlueShareIcon onClick={shareHandler} />}
        </div>
        <div className={styles.confirmation_header_section4}>
          <InfoWhiteIcon />
        </div>
      </div>

      <div className={styles.confirmation_content}>
        <div className={styles.confirmation_left}>
          {bookingStatusVal === BOOKING_STATUS.PENDING && (
            <ConfirmationPendingStepper
              hours={remainingHoursForPendingBooking}
              remainingMinutes={remainingMinutesForPendingBooking}
              summary={bookingInformation?.tickets?.return ? summary : [summary[0]]}
            />
          )}
          <ConfirmationSummary
            status={bookingStatusVal}
            summary={bookingInformation?.tickets?.return ? summary : [summary[0]]}
          />
          {bookingStatusVal === BOOKING_STATUS.FAILED ? (
            <ConfirmationOptions
              hours={remainingHoursForFailedBooking}
              remainingMinutes={remainingMinutesForFailedBooking}
              ucCredit={ucCredit}
            />
          ) : (
            ''
          )}
          {bookingStatusVal !== BOOKING_STATUS.FAILED && (
            <div className={styles.my_booking_container}>
              <div className={styles.my_booking_text}>Access and manage your flights bookings easily</div>
              <button type="button" className={styles.my_booking_button} onClick={myBookingHandler}>
                My Bookings
              </button>
            </div>
          )}
          {/* <UcRating ratingClickCallback={ratingClickHandler} /> */}

          {bookingStatusVal !== BOOKING_STATUS.FAILED && (
            <div
              className={styles.video_container}
              style={{
                backgroundImage: 'url(/assets/images/thiruvananthapuram.svg)',
              }}>
              <video className={styles.video} controls>
                <source src="../../../assets/images/video.mp4" type="video/mp4" />
                <track src="captions.vtt" kind="captions" label="English" />
              </video>
            </div>
          )}
          {bookingStatusVal !== BOOKING_STATUS.FAILED && (
            <div className={styles.booking_model}>
              <div className={styles.booking_left}>
                <RealEstateIcon />
                <div className={styles.booking_content}>
                  <div className={styles.booking_heading}>{holidayBanner.heading}</div>
                  <div className={styles.booking_desc}>{holidayBanner.description}</div>
                </div>
              </div>
              <div className={styles.booking_right}>
                <button type="button" className={styles.booking_button} onClick={bookHotelClickHandler}>
                  {holidayBanner.buttonText}
                </button>
              </div>
            </div>
          )}

          {bookingStatusVal !== BOOKING_STATUS.FAILED && <UcCTABanner holiday={holiday} />}
        </div>
        <div className={styles.confirmation_right}>
          {bookingStatusVal !== BOOKING_STATUS.FAILED && (
            <div>
              <UcFareBreakup
                review={review}
                discount={discount}
                fareChangeCallback={fareHandler}
                seatFees={undefined}
                totalFare={undefined}
                extraFare={extraFare}
                bookingStatusVal={bookingStatusVal}
              />
            </div>
          )}

          {discountCode && bookingStatusVal !== BOOKING_STATUS.FAILED && (
            <UcPromo
              icon={<Percentage />}
              heading={`${discountCode} promo applied`}
              desc={`You have saved ₹${discountAmount} on this booking`}
            />
          )}

          {bookingStatusVal === BOOKING_STATUS.BOOKED && (
            <div className={styles.promo_button_container}>
              <button type="button" className={styles.ticket_button} onClick={downloadTicketHandler}>
                Download Ticket
              </button>
            </div>
          )}

          {bookingStatusVal === BOOKING_STATUS.PENDING && (
            <div className={styles.promo_button_container}>
              <div className={styles.ticket_button_disabled}>
                <ConfirmationPendingDownload />
                <span className={styles.space}>Tickets</span>
              </div>
            </div>
          )}

          {bookingStatusVal === BOOKING_STATUS.BOOKED && isMobile ? (
            ''
          ) : (
            <UcSupport contactOptions={contactOptions} header="For General queries, you can contact us on" />
          )}

          {(bookingStatusVal === BOOKING_STATUS.BOOKED || (bookingStatusVal === BOOKING_STATUS.PENDING && !isMobile)) && (
            <UcFollowUsAndDownload heading="Follow us on" icons={followusIcon} />
          )}
          {bookingStatusVal !== BOOKING_STATUS.FAILED && (
            <UcFollowUsAndDownload heading="Download udChalo App on" icons={downloadUdChaloApp} />
          )}
        </div>
      </div>

      <ThankyouPopup popupDetails={popupToShow} close={close}>
        <RateUsOnScale
          showComment={showCommentNPS}
          close={closeClickHandler}
          npsSurveyRequiredData={npsSurveyRequiredData}
        />
      </ThankyouPopup>

      {/* This popups will be required for star rating component */}
      {/* <ThankyouPopup popupDetails={popupToShow} close={close}>
        <ThankyouPopupContent popupDetails={popupToShow} closeClickCallback={closeClickHandler} />
      </ThankyouPopup> */}
    </div>
  );
}

export default UcConfirmation;
