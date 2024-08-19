import { Dialog, createTheme } from '@mui/material';
import { FlightSummaryCard } from '@uc/libs/flights/shared/ui';
import UcFareBreakupV2 from '@uc/libs/shared/ui/components/v2/uc-fare-breakup-v2/uc-fare-breakup-v2';
import {
  EmailIcon,
  MSiteUcHeader,
  PhoneIcon,
  QuestionMarkIcon,
  UcButton,
  UcFareBreakup,
  WhatsappIcon1,
} from '@uc/libs/shared/ui';
import UcSupport from '@uc/libs/shared/ui/components/uc-support/uc-support';
import {
  useGetBookingDetails,
  useGetRefundModes,
  useGetSurakshaReasons,
  usePostAddCancellation,
  usePostNEFTAdd,
} from '@uc/services/network';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CancelBookingPopup from './components/cancel-booking-popup/cancel-booking-popup';
import CancellationSteps from './components/cancellation-steps/cancellation-steps';
import ModeOfRefund from './components/mode-of-refund/mode-of-refund';
import styles from './flights-cancellation-booking.module.scss';
import RefundDetailCard from './components/refund-detail-card/refund-detail-card';
import { formatToINR } from '@uc/utils';
/* eslint-disable-next-line */

export interface FlightsCancellationBookingProps {
  bookingId: string;
  flightId: string;
  backHandler: (url: string) => void;
}

export function FlightsCancellationBooking(props: FlightsCancellationBookingProps) {
  const { bookingId, flightId, backHandler } = props;
  const { data: bokingCancellationDetails }: any = useGetBookingDetails({
    bookingId,
    flightId,
  });

  const router = useRouter();

  const [passengerIDs, setPassengerIDs] = useState([]);

  const estimatedRefundPayLoad = {
    passengerIds: ['c67f974a-2afa-4ea1-9118-5ccecc7a5408'],
    cancelReason: 'flightCancelled',
    flightId: `${flightId}`,
    bookingId: `${bookingId}`,
  };

  const surakshaId = 298;

  const {
    data: surakshaReasons,
    error: surakshaReasonsError,
    isLoading: loadingSurakshaReasons,
  }: any = useGetSurakshaReasons(surakshaId, { enabled: !!bokingCancellationDetails?.data?.response?.isSurakshaOpted });

  /* const { data: getAirlinerules, isLoading: airlineRulesLoading } =
    useGetAirlineRules(props.bookingId, bokingCancellationDetails?.pnr, {\
      enabled: !!bokingCancellationDetails?.pnr,
    }); */

  const contactOptions = [
    {
      icon: <PhoneIcon />,
      contactHeading: '+91 9272203030',
      link: 'tel:+919272203030',
    },

    {
      icon: <WhatsappIcon1 />,
      contactHeading: '+91 8408833030',
      link: 'https://wa.me/8408833030',
    },

    {
      icon: <EmailIcon />,
      contactHeading: 'customercare@udchalo.com',
      link: 'mailto:customercare@udchalo.com',
    },
  ];

  const passengerIDsCallbackHandler = (data: any) => {
    setPassengerIDs(data);
  };

  const [flightCancellationReason, setFlightCancellationReason] = useState('');
  const flightCancellationReasonCallbackHandler = (data: any) => {
    setFlightCancellationReason(data);
  };

  const addCancellationApiPayload = {
    passengers: null,
    passengerIds: passengerIDs,
    flightId,
    bookingId,
    reason: flightCancellationReason,
    action: 'cancellation',
    status: 'requested',
    calledFromOldWebsite: false,
    refundMode: 1,
    cancelledOnAirline: true,
  };

  const addCancellationApiMutationVar = usePostAddCancellation(addCancellationApiPayload, '');

  const [proceedClickable, setProceedClickable] = useState(false);
  const [neftFormValid, setNeftFormValid] = useState<boolean>();
  const [modeOfRefundSelected, setModeOfRefundSelected] = useState('');
  const [selectPassengersAndTellUsWhyFormValid, setSelectPassengersAndTellUsWhyFormValid] = useState(false);
  const [neftAddApiCallData, setNeftAddApiCallData] = useState({
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    accountHolderName: '',
    emailId: '',
    phoneNumber: '',
    refundMode: 1,
    bookingId,
    flightId,
    isSurakshaOpted: true,
  });

  const proceedCallbackHandler = (data: any) => {
    setSelectPassengersAndTellUsWhyFormValid(data);
  };

  const neftAddMutationVar = usePostNEFTAdd(neftAddApiCallData);

  const cancelBookingPopupHandler = async () => {
    const apiAddCancellation = await addCancellationApiMutationVar.mutateAsync();

    if (modeOfRefundSelected === 'NEFT') {
      const apiAdd = await neftAddMutationVar.mutateAsync();
    }

    router.push(`/flights/cancel-trip/cancelled/${bookingId}/${flightId}/${passengerIDs.join(':')}`);
  };
  const [cancelBookingPopup, setCancelBookingPopup] = useState(false);

  const modeOfRefundHandler = (data: string) => {
    setModeOfRefundSelected(data);
  };

  const { data: modeOfRefund } = useGetRefundModes(bookingId, flightId);

  const neftFormValidHandler = (data: boolean) => {
    setNeftFormValid(data);
  };

  const onSurakshaToggleCallBack = () => {};
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (
      selectPassengersAndTellUsWhyFormValid === true &&
      flightCancellationReason &&
      modeOfRefundSelected === 'Refund to source'
    ) {
      setProceedClickable(true);
    } else if (
      selectPassengersAndTellUsWhyFormValid === true &&
      flightCancellationReason &&
      neftFormValid === true &&
      modeOfRefundSelected === 'NEFT'
    ) {
      setProceedClickable(true);
    } else if (selectPassengersAndTellUsWhyFormValid === true && flightCancellationReason && toggle === false) {
      setProceedClickable(true);
    } else {
      setProceedClickable(false);
    }
  }, [selectPassengersAndTellUsWhyFormValid, neftFormValid, modeOfRefundSelected, flightCancellationReason]);

  const neftAddApiCallDataHandler = (data: any) => {
    setNeftAddApiCallData(data);
  };

  const modeOfRefundRequiredDetails = {
    modes: modeOfRefund?.data?.response,
    bookingId,
    flightId,
    email: bokingCancellationDetails?.data?.response?.contactDetails?.email,
    phoneNumber: bokingCancellationDetails?.data?.response?.contactDetails?.phoneNumber,
  };

  const proceedButtonStyle: any = {
    backgroundColor: !proceedClickable ? '#32996A' : '',
    opacity: !proceedClickable ? 0.4 : 1,
    pointerEvents: !proceedClickable ? 'none' : 'auto',
  };

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const handleTogglePopupStyle: any = {
    className: 'popup-dialog',
    style: {
      position: 'absolute',
      zIndex: 1,
      left: '30.9%',
      right: '30.9%',
      top: '24.57%',
      borderRadius: '16px',
      overflowY: 'inherit',
      [theme.breakpoints.down('sm')]: {
        left: '0%',
        right: '0%',
        width: '100%',
        bottom: '0%',
      },
    },
  };

  const handleTogglePopup = () => {
    setCancelBookingPopup(false);
  };
  const proceedHandler = (data: any) => {
    setCancelBookingPopup(true);
  };

  const [fareBreakupTotalFare, setFareBreakupTotalFare] = useState(0);

  const totalFareHandler = (data: number) => {
    setFareBreakupTotalFare(data);
  };

  const cancelBookingDetails = {
    bookingId: bokingCancellationDetails?.data?.response?.bookingId,
    travelerDetails: passengerIDs
      .map(id => bokingCancellationDetails?.data?.response.passengers.find(passenger => passenger.passengerId === id))
      .filter(passenger => passenger !== undefined && passenger !== null)
      .map(passenger => `${passenger.name.firstName} ${passenger.name.lastName}`),
    reasonOfCancellation: flightCancellationReason,
    estimatedRefund: formatToINR(fareBreakupTotalFare),
  };

  const baseFare = bokingCancellationDetails?.data?.response?.fare?.baseTotalFare ?? 0;
  const taxesAndFees =
    bokingCancellationDetails?.data?.response?.fare?.totalTax +
      bokingCancellationDetails?.data?.response?.fare?.totalFee ?? 0;
  const convenienceFee = bokingCancellationDetails?.data?.response?.fare?.totalConvenienceFee ?? 0;
  const insuranceFee = bokingCancellationDetails?.data?.response?.insuranceDetails?.netPremium ?? 0;
  const seatFee = bokingCancellationDetails?.data?.fare?.totalSeatFare ?? 0;
  const mealFee = bokingCancellationDetails?.data?.fare?.totalMealFare ?? 0;
  const baggageFee = bokingCancellationDetails?.data?.fare?.totalBaggageFare ?? 0;
  const airlineCancellationFee = bokingCancellationDetails?.data?.response?.fare?.airlineRescheduleFee ?? 0;
  const udChaloBookingFee = bokingCancellationDetails?.data?.response?.fare?.totalConvenienceFee ?? 0;
  const udchaloCancellationFee = bokingCancellationDetails?.data?.response?.benefits?.[4]?.udchaloCancellationFee ?? 0;
  const couponDiscount = bokingCancellationDetails?.data?.response?.discount?.amount;

  const fareList = {
    youSavedText: {
      isYouSavedText: false,
    },
    headerText: 'Fare Breakup',
    footerText: 'Total Refund',
    listComponents: [
      {
        headerText: 'Flights Fare',
        list: [
          {
            fareName: 'Base Fare',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: null,
            fareAmount: baseFare,
          },
          {
            fareName: 'Taxes & Fees',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: null,
            fareAmount: taxesAndFees,
          },
          {
            fareName: 'Convenience Fee',
            fareDescription: '*(This is not refundable)',
            passengerMultiplierTextShown: false,
            numberOfPassenger: null,
            fareAmount: convenienceFee,
          },
          {
            fareName: 'Coupon',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: null,
            fareAmount: couponDiscount ? -couponDiscount : 0,
            isCoupon: true,
          }
        ],
      },
      {
        headerText: 'Extras',
        list: [
          {
            fareName: 'Suraksha',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: null,
            fareAmount: 0,
          },
          {
            fareName: 'Insurance',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: null,
            fareAmount: insuranceFee,
          },
          {
            fareName: 'Donation',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: null,
            fareAmount: 0,
          },
          {
            fareName: 'Seat Fee',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: null,
            fareAmount: seatFee,
          },
          {
            fareName: 'Meal Fee',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: null,
            fareAmount: mealFee,
          },
          {
            fareName: 'Baggage Fee',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: null,
            fareAmount: baggageFee,
          },
        ],
      },
      {
        headerText: 'Deduction',
        list: [
          {
            fareName: 'Airline Cancellation Fee',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: null,
            fareAmount: airlineCancellationFee,
          },
          {
            fareName: 'udChalo Booking Fee',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: null,
            fareAmount: udChaloBookingFee,
          },
          {
            fareName: 'udchalo Cancellation Fee',
            fareDescription: '',
            passengerMultiplierTextShown: false,
            numberOfPassenger: null,
            fareAmount: udchaloCancellationFee,
          },
        ],
      },
    ],
  };


  const details = {
    bankName: 'ICICI BANK',
    accountNumber: '123456**********',
  };

  return (
    <div>
      <MSiteUcHeader backHandler={backHandler}>
        <MSiteUcHeader.LeftContent>
          <div>
            <h1>Cancel Booking</h1>
            <h1 className={styles.sub_heading}>{`Booking ID - ${bookingId}`}</h1>
          </div>
        </MSiteUcHeader.LeftContent>

        <MSiteUcHeader.RightContent>
          <QuestionMarkIcon />
        </MSiteUcHeader.RightContent>
      </MSiteUcHeader>
      <div className={styles.cancellation_booking_container}>
        <div className={styles.cancellation_booking_left}>
          <div className={styles.summary_card_container}>
            <FlightSummaryCard bokingCancellationDetails={bokingCancellationDetails?.data?.response} />
          </div>

          <CancellationSteps
            bookingId={bookingId}
            onSurakshaToggleCallBack={onSurakshaToggleCallBack}
            surakshaReasons={
              bokingCancellationDetails?.data?.response?.isSurakshaOpted === true ? surakshaReasons?.data?.response : ''
            }
            cancellationBookingDetails={bokingCancellationDetails?.data?.response}
            clickable={proceedCallbackHandler}
            passengerIDsCallback={passengerIDsCallbackHandler}
            flightCancellationReasonCallback={flightCancellationReasonCallbackHandler}
            isSurakshaOpted={bokingCancellationDetails?.data?.response?.isSurakshaOpted}
          />
          {/* <ModeOfRefund
            modeOfRefundRequiredDetails={modeOfRefundRequiredDetails}
            neftAddApiCallDataCallback={neftAddApiCallDataHandler}
            neftFormValidCallback={neftFormValidHandler}
            modeOfRefund={modeOfRefundHandler}
          /> */}
          {toggle ? (
            <ModeOfRefund
              modeOfRefundRequiredDetails={modeOfRefundRequiredDetails}
              neftAddApiCallDataCallback={neftAddApiCallDataHandler}
              neftFormValidCallback={neftFormValidHandler}
              modeOfRefund={modeOfRefundHandler}
            />
          ) : (
            <RefundDetailCard details={details} />
          )}


          <div className={styles.left_proceed_button}>
            <UcButton
              variant="contained"
              style={proceedButtonStyle}
              className={styles.proceed_button}
              onClick={proceedHandler}>
              Proceed
            </UcButton>
          </div>
        </div>

        <div className={styles.cancellation_booking_right}>
          <div className={styles.cancellation_breakup_container}>
            <UcFareBreakupV2 fareList={fareList} totalFareCallback={totalFareHandler} />
          </div>

          {/* <div className={styles.cancellation_breakup_container}>
          <CancelTripFareDetails />
        </div> */}

          <div className={styles.policy_text}>* Actual refund amount is subjected to Airline’s refund policy.</div>

          <div className={styles.proceed_button_right_container}>
            <UcButton
              variant="contained"
              style={proceedButtonStyle}
              className={styles.proceed_button}
              onClick={proceedHandler}>
              Proceed
            </UcButton>
          </div>

          <div className={styles.uc_support_container}>
            <UcSupport contactOptions={contactOptions} header="For General queries, you can contact us on" />
          </div>
        </div>
      </div>
      <Dialog open={cancelBookingPopup} PaperProps={handleTogglePopupStyle} onClose={handleTogglePopup}>
        <CancelBookingPopup
          onClose={handleTogglePopup}
          cancelBookingDetails={cancelBookingDetails}
          cancelBookingPopupHandler={cancelBookingPopupHandler}
        />
      </Dialog>
    </div>
  );
}
export default FlightsCancellationBooking;
