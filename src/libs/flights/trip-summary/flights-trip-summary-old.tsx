// import {
//   ChangeInPlans,
//   PayAdvertisement,
//   ProceedToPay,
//   UcCheckboxRow,
//   UcDiscountCoupon,
//   UcFareBreakup,
//   UcPopup,
//   UcTravellerDetails,
//   WebCheckIn,
// } from '@uc/libs/shared/ui';
// import { Extras } from '@uc/libs/flights/shared/ui';
// import axios from 'axios';
// import { useEffect, useState, useReducer } from 'react';
// import { useForm } from 'react-hook-form';
// import { useGetFlightReview, usePostCouponList, usePostPrice, usePostSaveBooking } from '@uc/services/network';
// import { on } from 'events';
// import { useMutation } from 'react-query';
// import { useRouter } from 'next/navigation';
// import TripSummaryHeader from './components/trip-summary-header/trip-summary-header';
// import TripSummaryNote from './components/trip-summary-note/trip-summary-note';
// import styles from './flights-trip-summary.module.scss';
// import BaggageAllowance from './components/baggage-allowance/baggage-allowance';
// import TimelineCancellationCharge from './components/timeline-cancellation-charge/timeline-cancellation-charge';
// import FlightsSeatSelection from './components/flights-seat-selection/flights-seat-selection';
// import FlightsSeatSelectionSummary from './components/flights-seat-selection-summary/flights-seat-selection-summary';
// import ExcessBaggage from './components/excess-baggage/excess-baggage';
// import Meal from './components/meal/meal';

/* eslint-disable-next-line */
export interface FlightsTripSummaryProps {
  sessionId: string;
  onwardId: string;
  returnId: string;
  totalTravelers: any;
}

interface LegWiseObjForSeatSelectionSummary {
  [key: number]: TravelerData[];
}
interface TravelerData {
  destination: string;
  origin: string;
  segment: number;
  travelerName: string;
  travelerSeatNumber: string;
  travelerSeatPrice: number;
}
interface CouponDiscount {
  name: string;
  price: number;
}

/* export function FlightsTripSummaryOld(props: FlightsTripSummaryProps) {
  let travelInsurance = {
    heading: 'Add Travel Insurance',
    description:
      'Add travel insurance and secure your trip at just ₹199 per traveler',
    image: '',
    read: true,
    background_color: '#e5eef3',
    input_fields: [],
  };
  let gstDetails = {
    heading: 'Enter GST Details',
    description: 'Save tax by entering GST Details',
    image: '',
    read: false,
    background_color: '#FFF',
    input_fields: [
      { label: 'GST Number', id: 'gstnumber' },
      { label: 'Registered Company Name', id: 'companyname' },
      { label: 'Email ID', id: 'email' },
    ],
  };
  let ltc = {
    heading: 'Claim LTC',
    description: 'Eligibility criteria for JCOs/OR (and equivalent) only',
    image: '',
    read: false,
    background_color: '#FFF',
    input_fields: [
      { label: 'Name', id: 'name' },
      { label: 'LTC Type', id: 'ltc' },
    ],
  };
  let armedForcesBattle = {
    heading: 'Donate ₹5 to Armed Forces Battle Casuality Welfare Fund',
    description:
      'For every rupee donated, udChalo will contribute the same amount.',
    image: '',
    read: true,
    background_color: '#e5eef3',
    input_fields: [],
  };

  const { sessionId, onwardId, returnId, totalTravelers } = props;
  const { isLoading: isFlightReviewDataLoading, data: flightReviewData } = useGetFlightReview(sessionId, onwardId, returnId);

  let priceListPayload = { sessionId, flightIds: [onwardId] };
  const { isLoading: isPriceInfoLoading, data: flightPriceDetails } =
    usePostPrice(priceListPayload);

  const couponListPayload: any = {};
  const {
    isLoading: isCouponListLoading,
    data: couponList,
    refetch: refetchPostCouponList,
  } = usePostCouponList([], couponListPayload, { enabled: false });

  const [couponsList, setCouponsList] = useState();
  const [review, setReview] = useState();

  const getCouponList = (flightReviewData: any) => {
    const {
      baseTotalFare,
      totalConvenienceFee,
      totalFare,
      totalFee,
      totalTax,
    } = flightReviewData?.data?.response?.onwardLeg?.fare;
    couponListPayload.userId = '';
    couponListPayload.sessionId = sessionId;
    (couponListPayload.fareDetails = {
      baseFare: baseTotalFare,
      taxesAndFees: totalFee + totalTax,
      convenienceFee: totalConvenienceFee,
      insuranceFee: 0,
      donationMoney: 0,
      surakshaFee: 0,
      seatsFee: 0,
      mealsFee: 0,
      baggageFee: 0,
      totalFare,
    }),
      (couponListPayload.flightIds = [onwardId]);
    refetchPostCouponList();
  };

  const flightFare = {
    baseFare: (flightReviewData as any)?.data?.response?.onwardLeg?.fare
      ?.baseTotalFare,
    taxesAndFees:
      (flightReviewData as any)?.data?.response?.onwardLeg?.fare?.totalTax +
      (flightReviewData as any)?.data?.response?.onwardLeg?.fare?.totalFee,
    conveienceFees: (flightReviewData as any)?.data?.response?.onwardLeg?.fare
      ?.totalConvenienceFee,
  };

  useEffect(() => {
    if (flightReviewData) {
      getCouponList(flightReviewData);
      setReview(flightFare as any);
    }
  }, [flightReviewData]);

  const [discount, setDiscount] = useState<CouponDiscount>();

  const { register, handleSubmit, formState, trigger } = useForm();

  const validateFormHandler = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(submitHandler)();
    }
  };

  const initialState = '';

  const reducerFn = (state: any, action: any) => {
    switch (action.type) {
      case 'travelerDetails':
        return (state = { ...state, travelerDetails: action.payload });

      case 'Add Travel Insurance':
        return (state = { ...state, insurance: { checked: action.payload } });

      case 'Enter GST Details':
        return (state = { ...state, gstDetails: { checked: action.payload } });

      case 'Claim LTC':
        return (state = { ...state, ltc: { checked: action.payload } });

      case 'Donate ₹5 to Armed Forces Battle Casuality Welfare Fund':
        return (state = { ...state, armedForces: { checked: action.payload } });
      case 'additional options':
        return (state = { ...state, additionalOptions: action.payload });
      default:
        break;
    }
  };
  const [state, dispatch] = useReducer(reducerFn, initialState);
  const [toggleHandlerCallbackNew, setToggleHandlerCallbackNew] = useState();

  const payload = {
    sessionId: sessionId,
    flightIds: [onwardId],
    passengers: [
      {
        name: {
          title: 'mr',
          firstName: 'Virat',
          middleName: 'Prem',
          lastName: 'Kohli',
        },
        gender: 'male',
        serviceNumber: '',
        dateOfBirth: {
          year: 1999,
          month: 7,
          day: 20,
        },
        passengerType: 'ADT',
        travellerId: '5bd0b46f-b286-4185-875b-b8e128cec91e',
        doNotSaveTraveller: true,
      },
    ],
    contactDetails: {
      phoneNumber: state?.travelerDetails?.contactDetails?.phonenumber,
      email: state?.travelerDetails?.contactDetails?.email,
      name: {
        firstName: state?.travelerDetails?.contactDetails?.firstname,
        middleName: '',
        lastName: 'bhuse',
      },
    },
    source: 'website',
    code: (discount as {name: string} | undefined)?.name ?? '',
    isInsuranceOpted: false,
    ltcDetails: {
      ltcType: '184',
      name: {
        firstName: 'atharva',
        middleName: '',
        lastName: 'atharva',
      },
    },
    isRefundProtectionOpted: null,
    isSurakshaOpted: null,
    refundProtectionOnAddOns: false,
    cabService: [],
    emailNewsLetterActive: false,
    donationAmount: 0,
    fareDetails: {
      baseFare: 3059,
      taxesAndFees: 373,
      convenienceFee: 249,
      insuranceFee: 0,
      donationMoney: 0,
      surakshaFee: 0,
      seatsFee: 0,
      mealsFee: 0,
      baggageFee: 0,
      totalFare: 3681,
      isBankOffer: false,
    },
    isDonationOpted: false,
  };
  const config = {
    Udchalotoken: localStorage.getItem('udChaloId'),
  };

  const router = useRouter();
  const saveBookingApiMutationVar = usePostSaveBooking(payload, config);

  const saveBookingApiHandler = async () => {
    const api = await saveBookingApiMutationVar.mutateAsync();
    if ((api as any)?.data?.response?.bookingId != undefined) {
      router.push(
        `/flights/confirmation/${(api as any)?.data?.response?.bookingId}`
      );
    }
  };

  const submitHandler = (data: any) => {
    dispatch({ type: 'additional options', payload: data });
    saveBookingApiHandler();
  };

  const [clickable, setClickable] = useState(false);

  const [dimentions, setDimentions] = useState<any>({
    width: '60%',
    height: '95%',
  });

  const [popupDetails, setPopupDetails] = useState();

  const openPopupCallbackHandler = (details: any) => {
    setPopupDetails(details);
  };

  const [popupCounter, setPopupCounter] = useState(1);

  useEffect(() => {
    if (popupCounter == 2) {
      setDimentions({
        width: '40%',
      });
    }
  }, [popupCounter]);

  const seatSelectionBackHandler = (data: any) => {
    setPopupCounter(data);
    setDimentions({
      width: '60%',
      height: '95%',
    });
  };

  const fareHandler = () => {};

  const [travelerDetailsArray, setTravelerDetailsArray] = useState([]);

  const nextBtnCallbackHandler = (data: any) => {
    if (
      popupCounter == 1 &&
      travelerAndSeats.filter(
        (data: any) =>
          data.travelerSeatNumber == '' || data.travelerSeatNumber == undefined
      ).length > 0
    ) {
      setPopupCounter(popupCounter + 1);
    } else if (popupCounter == 1) {
      setPopupCounter(popupCounter + 2);
    } else {
      setPopupCounter(popupCounter + 1);
    }
  };

  const [segments, setSegments] = useState([]);
  const [seat, setSeat] = useState([]);

  const [seatClickHandlerState, setSeatClickHandlerState] = useState();
  const seatClickHandlerCallbackFunction = (data: any) => {
    setSeatClickHandlerState(data);
  };

  const [
    travelerDetailsArrayFromLegsAndTravelers,
    setTravelerDetailsArrayFromLegsAndTravelers,
  ] = useState();

  const travelerDetailsArrayFromLegsAndTravelersHandler = (data: any) => {
    setTravelerDetailsArrayFromLegsAndTravelers(data);
  };

  const [excessBaggageArray, setExcessBaggageArray] = useState([]);
  const excessBaggageCallbackHandler = (data: any) => {
    setExcessBaggageArray(data);
  };

  const [
    excessBaggageArrayFromLegsAndTravelers,
    setExcessBaggageArrayFromLegsAndTravelersHandler,
  ] = useState();

  const excessBaggageArrayFromLegsAndTravelersHandler = (data: any) => {
    setExcessBaggageArrayFromLegsAndTravelersHandler(data);
  };

  const [toggleSelectedCallback, setToggleSelectedCallback] = useState();
  const toggleSelectedCallbackHandler = (data: any) => {
    setToggleSelectedCallback(data);
  };

  // Meal Data
  const [selectedTravelerForMeal, setSelectedTravelerForMeal] = useState();
  const selectedTravelerCallbackForMealhandler = (data: any) => {
    setSelectedTravelerForMeal(data);
  };
  const [selectedTravelerForMealNewData, setSelectedTravelerForMealNewData] =
    useState();
  const selectedTravelerCallbackForMealhandlerNew = (data: any) => {
    setSelectedTravelerForMealNewData(data);
  };

  const [meal, setMeal] = useState();
  const mealClickHandlerCallbackHandler = (data: any) => {
    setMeal(data);
  };
  // Excess Baggage Data
  const [
    selectedTravelerForExcessBaggage,
    setSelectedTravelerForExcessBaggage,
  ] = useState();
  const selectedTravelerCallbackForExcessHandler = (data: any) => {
    setSelectedTravelerForExcessBaggage(data);
  };
  const [
    selectedTravelerForExcessNewData,
    setSelectedTravelerForExcessNewData,
  ] = useState();
  const selectedTravelerCallbackForExcessHandlerNew = (data: any) => {
    setSelectedTravelerForExcessNewData(data);
  };

  const [excessBaggage, setExcessBagggage] = useState();
  const excessBaggageClickHandlerCallbackHandler = (data: any) => {
    setExcessBagggage(data);
  };

  const [travelerAndSeats, setTravelerAndSeats] = useState<any>([]);
  const travelerAndSeatsCallbackHandler = (data: any) => {
    setTravelerAndSeats(data);
  };

  const popupOpenHandler = (data: any) => {
    setPopupDetails(data);
  };

  const handleCouponDiscount = (data: CouponDiscount) => {
    setDiscount(data)
  }

  const [mealDataStepperHandle, setMealDataStepperHandle] = useState(true);
  const [mealStepperDataStore, setMealStepperDataStore] = useState([]);

  return (
    <>
      <div className={styles.flightsTripSummary}>
        <div className={styles.flightsTripSummary_left}>
          <TripSummaryHeader />
          <TripSummaryNote />
          <UcTravellerDetails
            dispatch={dispatch}
            clickableCallback={setClickable}
            totalTravelers={totalTravelers}
          />
          <BaggageAllowance />
          <TimelineCancellationCharge />
          <Extras
            clickable={clickable}
            openPopupCallback={openPopupCallbackHandler}
          />
          <UcCheckboxRow
            dispatch={dispatch}
            register={register}
            clickable={clickable}
            trigger={trigger}
            formState={formState}
            details={travelInsurance}
          />

          <UcCheckboxRow
            dispatch={dispatch}
            register={register}
            clickable={clickable}
            trigger={trigger}
            formState={formState}
            details={gstDetails}
          />

          <UcCheckboxRow
            dispatch={dispatch}
            register={register}
            clickable={clickable}
            trigger={trigger}
            formState={formState}
            details={ltc}
          />

          <UcCheckboxRow
            dispatch={dispatch}
            register={register}
            clickable={clickable}
            trigger={trigger}
            formState={formState}
            details={armedForcesBattle}
          />
          <PayAdvertisement />
        </div>
        <div className={styles.flightsTripSummary_right}>
          <UcDiscountCoupon
            couponsList={(couponList as any)?.data?.response}
            couponDiscountCallback={handleCouponDiscount}
            sessionId={sessionId}
            onwardId={onwardId}
          />
          <UcFareBreakup
            review={review as any}
            discount={discount}
            fareChangeCallback={fareHandler}
            seatFees={undefined}
            totalFare={undefined}
          />
          <WebCheckIn heading={'Web Check-In'} desc={'Web check-in is mandatory and free. Counter check-in will attract extra charges.'} />
          <ChangeInPlans heading={'Change in plans?'} desc={'No worries! You can change the time and or date of your flight or cancel and process your refund with udChalo.'} />
          <button
            onClick={validateFormHandler}
            style={{
              backgroundColor: !clickable ? '#32996A' : '',
              opacity: !clickable ? 0.4 : 1,
              pointerEvents: !clickable ? 'none' : 'auto',
            }}
            className={styles.trip_summary_button}>
            Confirm & Pay
          </button>
        </div>
      </div>
      <ProceedToPay />
      {popupDetails && (
        <UcPopup
          segments={segments}
          seat={seat}
          dimentions={dimentions}
          travelerDetails={state}
          review={review}
          discount={discount}
          travelerDetailsArray={travelerDetailsArray}
          nextBtnCallback={nextBtnCallbackHandler}
          seatClickHandlerState={seatClickHandlerState}
          travelerDetailsArrayCallback={
            travelerDetailsArrayFromLegsAndTravelersHandler
          }
          excessBaggageArray={excessBaggageArray}
          excessBaggageArrayCallback={
            excessBaggageArrayFromLegsAndTravelersHandler
          }
          popupOpen={popupOpenHandler}
          meal={meal}
          selectedTravelerCallbackForMeal={
            selectedTravelerCallbackForMealhandler
          }
          selectedTravelerCallbackForMealNew={
            selectedTravelerCallbackForMealhandlerNew
          }
          excessBaggage={excessBaggage}
          selectedTravelerCallbackForExcessHandler={
            selectedTravelerCallbackForExcessHandler
          }
          selectedTravelerCallbackForExcessHandlerNew={
            selectedTravelerCallbackForExcessHandlerNew
          }
          toggleSelectedCallback={toggleSelectedCallbackHandler}
          popupCounter={popupCounter}
          popupCounterCallback={(data: any) => setPopupCounter(data)}>
          {popupCounter == 1 && (
            <FlightsSeatSelection
              segments={segments}
              seats={seat}
              travelerDetails={state}
              travelerDetailsArrayFromLegsAndTravelers={
                travelerDetailsArrayFromLegsAndTravelers
              }
              seatClickHandlerCallback={seatClickHandlerCallbackFunction}
              toggleSelectedCallback={toggleSelectedCallback}
              travelerAndSeatsCallback={travelerAndSeatsCallbackHandler}
            />
          )}
          {popupCounter == 2 && (
            <FlightsSeatSelectionSummary
              counter={seatSelectionBackHandler}
              travelerAndSeats={travelerAndSeats}
            />
          )}
          {popupCounter == 3 && (
            <div>
              <Meal
                flightPriceDetails={flightPriceDetails}
                travelerDetails={state}
                seatClickHandlerCallback={mealClickHandlerCallbackHandler}
                selectedTravelerForMeal={selectedTravelerForMeal}
                selectedTravelerForMealNew={selectedTravelerForMealNewData}
              />
            </div>
          )}
          {popupCounter == 4 && (
            <div>
              <ExcessBaggage
                flightPriceDetails={flightPriceDetails}
                travelerDetails={state}
                excessBaggageClickHandlerCallback={
                  excessBaggageClickHandlerCallbackHandler
                }
                selectedTravelerForExcess={selectedTravelerForExcessBaggage}
                selectedTravelerForExcessNew={selectedTravelerForExcessNewData}
              />
            </div>
          )}
        </UcPopup>
      )}
    </>
  );
} */

export function FlightsTripSummaryOld(props: FlightsTripSummaryProps) {
  return <div>FlightsTripSummaryOld code commented for build </div>;
}

export default FlightsTripSummaryOld;
