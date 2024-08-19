import { Accordion, AccordionDetails, AccordionSummary, Dialog, SwipeableDrawer } from '@mui/material';
import {
  BannerWithicon,
  ConfirmAndPayPopup,
  DropdownArrowGreenIcon,
  MSiteUcHeader,
  ShareIcon,
  UcButton,
  UcCard,
  UcDiscountCoupon,
  useSharedAppStateContext,
} from '@uc/libs/shared/ui';
import UcFareBreakupV2 from '@uc/libs/shared/ui/components/v2/uc-fare-breakup-v2/uc-fare-breakup-v2';
import {
  FlightSearchQuery,
  ICoupon,
  ICouponListResponse,
  IFlightPriceListAPIResponse,
  IFlightPriceListResponse,
  useGetAirports,
  useGetArmedForcesDonationAllowed,
  useGetFlightReview,
  useGetPaymentRedirectLink,
  useGetTravellers,
  useGetUserAuthenticated,
  usePostCouponApply,
  usePostCouponList,
  usePostPrice,
  usePostPriceAddonsConfig,
  usePostSaveBooking,
} from '@uc/services/network';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { ExtrasCard, FlightLegDetails, SurakshaChoice } from '../shared/ui';
import AddTravelInsurance from '../shared/ui/components/add-travel-insurance/add-travel-insurance';
import BaggageAllowance from './components/baggage-allowance/baggage-allowance';
import CheckboxForm from './components/checkbox-form/checkbox-form';
import FlightExtras from './components/flight-extras/flight-extras';
import TimelineCancellationCharge from './components/timeline-cancellation-charge/timeline-cancellation-charge';
import TripSummaryHeader from './components/trip-summary-header/trip-summary-header';
import TripSummaryNote from './components/trip-summary-note/trip-summary-note';
import ArmedForceDonation from './components/v2/armed-force-donation/armed-force-donation';
import { IPassenger, IPassengerType } from './components/v2/traveller-widget/models';
import TravellerWidget, { TravellerWidgetProps } from './components/v2/traveller-widget/traveller-widget';
import TripSummaryDispatchProvider from './contexts/trip-summary-dispatch.context';
import TripSummaryStateProvider from './contexts/trip-summary-state.context';
import styles from './flights-trip-summary.module.scss';
import FlightTripSummaryReducer, {
  IAppliedCoupon,
  IFlightExtrasStep,
  initialFtsValue,
} from './flights-trip-summary-reducer';
import {
  calculateFareDetails,
  calculateFareList,
  generateSaveBookingPayloadv2,
  getCouponListPayload,
} from './utils/trip-summary-data.utils';

export function FlightTripSummaryLoader() {
  return (
    <div className="grid_two">
      <div>
        <div className="box shine" style={{ height: '20vh' }} />
        <div className="box shine" style={{ height: '20vh' }} />
        <div className="box shine" style={{ height: '20vh' }} />
        <div className="box shine" style={{ height: '20vh' }} />
      </div>
      <div className="box shine" style={{ height: '40vh' }} />
    </div>
  );
}

interface FareDetails {
  baseFare: number;
  taxesAndFees: number;
  convenienceFee: number;
  insuranceFee: number;
  donationMoney: number;
  surakshaFee: number;
  seatsFee: number;
  mealsFee: number;
  baggageFee: number;
  totalFare: number;
}

export interface ICouponListPayload {
  fareDetails: FareDetails;
  flightIds: Array<string>;
  sessionId: string | null;
  userId: string | null;
}

export interface IFlightFareDependencies {
  flightPriceDetails: IFlightPriceListResponse[];
  currentLegIdx: number;
  appliedCoupon: IAppliedCoupon;
  isInsuranceOpted: boolean;
  flightPriceDetailsData: IFlightPriceListAPIResponse;
  selectedTravellers: [];
}
interface IAccStepState {
  stepOneExpanded: boolean;
  stepTwoExpanded: boolean;
  stepThreeExpanded: boolean;
}
interface IFlightTripSummaryProps {
  sessionId: string;
  onwardId: string;
  returnId: string;
  searchRequest: FlightSearchQuery;
  onSaveBooking: (result: any) => void;
}

const travelInsuranceConfig = {
  heading: 'Add Travel Insurance',
  description: 'Add travel insurance and secure your trip at just ₹199 per traveler',
  image: '',
  read: true,
  background_color: '#e5eef3',
  inputFields: [],
};
const gstDetailsConfig = {
  heading: 'Enter GST Details',
  description: 'Save tax by entering GST Details',
  image: '',
  read: false,
  background_color: '#FFF',
  inputFields: [
    { label: 'GST Number', id: 'uinNumber' },
    { label: 'Registered Company Name', id: 'companyName' },
    { label: 'Email ID', id: 'companyEmail' },
  ],
};
const ltcConfig = {
  heading: 'Claim LTC',
  description: 'Eligibility criteria for JCOs/OR (and equivalent) only',
  image: '',
  read: false,
  background_color: '#FFF',
  inputFields: [
    { label: 'Name', id: 'name' },
    { label: 'LTC Type', id: 'ltc' },
  ],
};
const armedForcesBattleConfig = {
  heading: 'Donate ₹5 to',
  subHeading: 'Armed Forces Battle Casuality Welfare Fund',
  description: 'For every rupee donated, udChalo will contribute the same amount.',
  image: '',
  read: true,
  background_color: '#e5eef3',
  inputFields: [],
};

const extras = [
  {
    heading: 'Seat',
    desc: 'Book seat of your choice before boarding',
  },
  {
    heading: 'Meal',
    desc: 'Pre-select your meal at the best rates',
  },
  {
    heading: 'Excess Baggage',
    desc: 'Book your additional baggage at minimal cost',
  },
];

export function FlightsTripSummary(props: IFlightTripSummaryProps) {
  const { sessionId = '', onwardId = '', returnId = '', searchRequest, onSaveBooking } = props;
  const search = searchRequest?.response?.search;
  const adults = search?.adults || 0;
  const children = search?.children || 0;
  const infants = search?.infants || 0;

  const priceListPayload = { sessionId, flightIds: [onwardId], isNewUi: true };
  const gstFormRef = useRef<any>(null);
  const ltcFormRef = useRef<any>(null);
  // states :
  const [viewMoreFlightDetails, setViewMoreFlightDetails] = useState<boolean>(false);
  const [showConfirmAndPayPopup, setShowConfirmAndPayPopup] = useState(false);
  const [state, dispatch] = useReducer(FlightTripSummaryReducer, initialFtsValue);
  const [couponListPayload, setCouponListPayload] = useState<ICouponListPayload | undefined>();
  const [accState, setAccState] = useState<IAccStepState>({
    stepOneExpanded: true,
    stepTwoExpanded: false,
    stepThreeExpanded: false,
  });
  const [showExtras, setShowExtras] = useState<boolean>(false);
  const [flightExtrasOpen, setFlightExtrasOpen] = useState(false);
  const [saveBookingId, setSaveBookingId] = useState('');
  const totalTravellers = (searchRequest?.response?.search && (adults || 0) + (children || 0) + (infants || 0)) || 0;
  const {
    appliedCoupon,
    bankOfferMethod,
    currentFormStep,
    isSurakshaOpted,
    isGstOpted,
    isDonationOpted,
    isInsuranceOpted,
    isRefundProtectionOpted,
    flightPriceDetails,
    currentFlightId,
    currentLegIdx,
    selectedTravellers,
    surakshaAmounts,
    fareList,
  } = state;
  const { surakshaAmountPerTraveller, totalRefundAmountWithoutSuraksha, totalSurakshaRefundAmount } = surakshaAmounts;

  const { userData } = useSharedAppStateContext();
  const router = useRouter();

  const { mutateAsync: postCouponApplyApiMutation }: any = usePostCouponApply();
  const { data: airportsResponse } = useGetAirports();
  const { data: isUserAuthenticatedData } = useGetUserAuthenticated();
  const saveBookingApiMutation = usePostSaveBooking({
    onSuccess: data => {
      if (data?.success && data?.response) {
        setSaveBookingId(data?.response?.bookingId);
      }
    },
  });
  const { isSuccess: existingTravellersLoaded, data: existingTravellers } = useGetTravellers();
  const { data: armedForcesDonationAllowedData } = useGetArmedForcesDonationAllowed();
  const { data: flightPriceDetailsData } = usePostPrice(priceListPayload, {
    onSuccess: data => {
      if (data?.success && data?.response?.length > 0) {
        dispatch({
          type: 'SET_FLIGHT_DETAILS',
          payload: data,
        });
      }
      if (!data?.success && ['wrong sessionId', 'pricing failed for onward flight'].includes(data?.message)) {
        router.push('/flights');
      }
    },
  });

  const { data: addonsConfigData, isLoading: isAddonsConfigDataLoading } = usePostPriceAddonsConfig(
    {
      flightId: { onward: onwardId },
      sessionId,
    },
    {
      enabled: !!(sessionId && onwardId),
    }
  );
  // const { suraksha = [] } = addonsConfigData && addonsConfigData?.response;
  const setSurakshaAmount = () => {
    if (flightPriceDetailsData?.response?.length > 0 && addonsConfigData?.response?.suraksha?.length > 0) {
      dispatch({
        type: 'SET_SURAKSHA_AMOUNT',
        payload: { surakshaResponse: addonsConfigData?.response?.suraksha, totalTravellers },
      });
    }
  };

  useEffect(() => {
    setSurakshaAmount();
  }, [addonsConfigData?.response?.suraksha, flightPriceDetailsData?.response, totalTravellers]);

  const handleCouponDiscount = (coupon: IAppliedCoupon) => dispatch({ type: 'SET_COUPON_CODE', payload: coupon });

  const setContactDetails = () =>
    dispatch({
      type: 'SET_CONTACT_DETAILS',
      payload: {
        name: userData?.name || '',
        phoneNumber: userData?.phoneNumber || '',
        email: userData?.email || '',
        receiveInfoOnWhatsApp: userData?.settings?.whatsappNotificationsActive,
      },
    });

  useEffect(() => {
    setContactDetails();
  }, [userData]);

  useEffect(() => {
    if (currentFormStep === 2) {
      setAccState({
        ...accState,
        stepOneExpanded: false,
        stepTwoExpanded: true,
        stepThreeExpanded: false,
      });
    }
    if (currentFormStep === 3) {
      setAccState({
        ...accState,
        stepOneExpanded: false,
        stepTwoExpanded: false,
        stepThreeExpanded: true,
      });
    }
  }, [currentFormStep]);
  // handlers for popups :
  const viewMoreFlightDetailsHandler = () => {
    setViewMoreFlightDetails(!viewMoreFlightDetails);
  };

  const handleConfirmAndPayPopup = (data: boolean) => {
    setShowConfirmAndPayPopup(data);
  };

  const skipExtras = (event: object, reason: string) => {
    if (reason !== 'backdropClick') {
      setShowExtras(false);
    }
  };

  const flightExtrasCloseHandler = () => {
    setFlightExtrasOpen(false);
  };

  const flightExtrasOpenHandler = () => {
    setFlightExtrasOpen(true);
  };

  const toggleStepOneAccordion = () => {
    const stepOneExpanded = !accState.stepOneExpanded;
    setAccState({ ...accState, stepOneExpanded });
  };

  const toggleStepTwoAccordion = () => {
    const stepTwoExpanded = !accState.stepTwoExpanded;
    setAccState({ ...accState, stepTwoExpanded });
  };

  const toggleStepThreeAccordion = () => {
    const stepThreeExpanded = !accState.stepThreeExpanded;
    setAccState({ ...accState, stepThreeExpanded });
  };

  const openExtras = (step: IFlightExtrasStep) => {
    if (selectedTravellers && selectedTravellers?.length) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: step });
      setShowExtras(true);
    }
  };

  const validateCoupon = async (couponData: ICoupon) => {
    const fareDetails = calculateFareDetails(fareList);
    const payload = {
      code: couponData?.code,
      sessionId,
      fareDetails,
      flightIds: [onwardId],
    };
    const api = await postCouponApplyApiMutation(payload);
    if (api?.data?.success) {
      const actualDiscount = api?.data?.response?.discount;
      const newCoupon = {
        coupon: couponData,
        isValid: true,
        actualDiscount,
      };
      handleCouponDiscount(newCoupon as IAppliedCoupon);
    } else {
      const newCoupon = {
        coupon: null,
        isValid: false,
        actualDiscount: 0,
      };
      handleCouponDiscount(newCoupon as IAppliedCoupon);
    }
  };

  const removeCoupon = (data: ICoupon) => {
    const actualDiscount = 0;
    if (appliedCoupon && appliedCoupon?.coupon === data) {
      const newCoupon = {
        coupon: null,
        isValid: false,
        actualDiscount,
      };
      handleCouponDiscount(newCoupon as IAppliedCoupon);
    }
  };
  const sortedNonBankOfferCoupons = (coupons: ICoupon[]) =>
    coupons &&
    (coupons || [])
      ?.filter(coupon => (!coupon?.metadata || coupon?.metadata?.voucher_type !== 'bankoffer') && coupon?.isApplicable)
      ?.sort((a, b) => b.discountAmount - a.discountAmount);

  const { data: couponList, isLoading: isCouponListLoading } = usePostCouponList(couponListPayload, {
    enabled: !!couponListPayload,
    onSuccess: async (data: ICouponListResponse) => {
      if (data?.success && data?.response?.length > 0) {
        const nonBankerCouponList = sortedNonBankOfferCoupons(data?.response);
        const response = nonBankerCouponList && (await validateCoupon(nonBankerCouponList[0]));
      }
    },
  });

  const { data: flightReviewData }: any = useGetFlightReview(sessionId, onwardId, returnId, {
    onSuccess: data => {
      if (data && data?.data?.success) {
        const newPayload = getCouponListPayload(data, sessionId, onwardId);
        setCouponListPayload(newPayload as ICouponListPayload);
      }
      if (data?.data?.success === false) {
        router?.replace('/flights');
      }
    },
  });

  const { data: paymentRedirectionDetails }: any = useGetPaymentRedirectLink(
    {
      bookingId: saveBookingId,
      sessionId,
      product: 'flights',
      bankOfferMethod,
      promocode: appliedCoupon?.coupon?.code,
    },
    {
      enabled: !!saveBookingId,
      onSuccess: data => {
        if (data && data?.success) {
          onSaveBooking(data?.response);
        }
      },
    }
  );

  // const flightDetails = useMemo(() => {}, [flightReviewData]);
  // const cancellationRescheduleInfo = useMemo(() => {}, [flightPriceDetails]);
  // const surakshaInfo = useMemo(() => {}, []);

  const handleGstSelection = (selected: boolean) => dispatch({ type: 'SET_GST_SELECTION', payload: selected });
  const handleLtcSelection = (selected: boolean) => dispatch({ type: 'SET_LTC_SELECTION', payload: selected });

  const validateForms = async () => {
    let isGstValid = true;
    let isLtcValid = true;

    /* if (isGstOpted) {
      isGstValid = await validateForm(gstFormRef, 'gstForm');
    }
    if (isLtcSelected) {
      isLtcValid = await validateForm(ltcFormRef, 'ltcForm');
    } */
    return { isGstValid, isLtcValid };
  };

  const savedTravellers = useMemo(() => {
    const passengerArray = [];
    (existingTravellers?.response || []).forEach(traveller => {
      const dobDate = new Date(traveller.dateOfBirth);
      const { travellerId, type, name, gender, dateOfBirth } = traveller;
      const passenger: IPassenger = {
        travellerId,
        passengerType: type.toLowerCase() as IPassengerType,
        name,
        gender,
        dateOfBirth: { day: dobDate.getDay(), month: dobDate.getMonth(), year: dobDate.getFullYear() },
        doNotSaveTraveller: true,
      };
      passengerArray.push(passenger);
    });
    return passengerArray;
  }, [existingTravellers?.response]);

  const onSelect = (selectedPassengers: Array<IPassenger>, passenger: IPassenger) => {
    dispatch({ type: 'SELECT_TRAVELLER', payload: passenger });
  };

  const onDeselect = (selectedPassengers: Array<IPassenger>, passenger: IPassenger) => {
    dispatch({ type: 'DESELECT_TRAVELLER', payload: passenger });
  };

  const travellerWidgetProps: TravellerWidgetProps = {
    preSelectedTravellers: [],
    existingTravellers: savedTravellers,
    maxCriteria: { adults, children, infants },
    isDefence: search?.isDefence,
    onSelect,
    onDeselect,
  };

  // Suraksha handlers

  const handleSurakshaSelection = (surakshaSelected: boolean) => {
    dispatch({ type: 'SET_SURAKSHA_SELECTION', payload: surakshaSelected });
    dispatch({ type: 'SET_NEW_FORM_STEP', payload: '' });
  };

  const handleInsuranceSelection = () => dispatch({ type: 'SET_INSURANCE_SELECTION', payload: !isInsuranceOpted });

  const surakshaChoiceCloseDrawerHandler = (isSurakshaDrawerClosed: boolean) => {};

  const handleDonationSelection = () => {
    const amountForDonation = !isDonationOpted ? armedForcesDonationAllowedData?.response?.amount || 0 : 0;
    dispatch({ type: 'SET_DONATION_SELECTION', payload: { isOpted: !isDonationOpted, amount: amountForDonation } });
  };

  const [travellerAndContactDetailsOpen, setTravellerAndContactDetailsOpen] = useState(false);

  const travellerAndContactDetailsCloseHandler = () => {
    setTravellerAndContactDetailsOpen(false);
  };

  const travellerAndContactDetailsCloseDrawerHandler = (data: boolean) => {
    setTravellerAndContactDetailsOpen(!data);
  };

  const saveBooking = async (): Promise<void> => {
    const payLoad = generateSaveBookingPayloadv2(sessionId, onwardId, state);
    console.log('payLoad', payLoad);
    const resp = await saveBookingApiMutation.mutateAsync(payLoad);
    console.log('resp', resp);
  };

  const validateFormsAndShowConfirmPopup = async () => {
    // const { isGstValid, isLtcValid } = await validateForms();
    // if (isGstValid && isLtcValid && state?.selectedTravellers?.length === totalTravellers) {
    setShowConfirmAndPayPopup(true);
    // }
  };

  return (
    <div>
      <TripSummaryStateProvider state={state}>
        <TripSummaryDispatchProvider dispatch={dispatch}>
          <div className={styles.trip_summary}>
            <div className={styles.trip_summary_left}>
              <div>
                <TripSummaryHeader />
              </div>
              <TripSummaryNote />
              {/* {flightPriceDetails && ( */}
              {flightPriceDetails && flightPriceDetails[currentLegIdx] && (
                <UcCard>
                  <FlightLegDetails
                    legDetails={flightPriceDetails[currentLegIdx]?.leg}
                    departDate={flightPriceDetails[currentLegIdx]?.leg?.departDate}
                    arriveDate={flightPriceDetails[currentLegIdx]?.leg?.arriveDate}
                  />
                </UcCard>
              )}
              {flightPriceDetails && flightPriceDetails[currentLegIdx] && (
                <UcCard>
                  <BaggageAllowance
                    checkInBaggage={flightPriceDetails[currentLegIdx]?.leg?.checkInBaggage}
                    cabinBaggage={flightPriceDetails[currentLegIdx]?.leg?.handBaggage}
                    excessBaggageOptions={flightPriceDetails[currentLegIdx]?.leg?.excessBaggageOptions}
                  />
                  <TimelineCancellationCharge
                    cancelPenalties={flightPriceDetails[currentLegIdx]?.leg?.cancelPenalties}
                    reschedulePenalties={flightPriceDetails[currentLegIdx]?.leg?.reschedulePenalties}
                    departDate={flightPriceDetails[currentLegIdx]?.leg?.departDate}
                  />
                </UcCard>
              )}
              {/* <div> */}
              <Accordion className={styles.card} expanded={accState.stepOneExpanded}>
                <AccordionSummary expandIcon={<DropdownArrowGreenIcon />} onClick={toggleStepOneAccordion}>
                  <div style={{ width: '100%' }}>
                    <div className={styles.section_heading}>
                      <span className={styles.section_number}>1</span>
                      <div className={styles.section_title}>
                        <div className={styles.title}>Traveller Details</div>
                        {/* <div className={styles[selectedCountClassName]}>
                            ({passengers.length}/{totalTravellers}){tripMode === 'reschedule' ? ' Added' : ''}
                          </div> */}
                      </div>
                    </div>
                    {!accState.stepOneExpanded && (
                      <div className={styles.selected_users}>
                        {/* {passengers.map((tv, key) => (
                            <TravellerCard
                              key={key}
                              name={`${tv.name.firstName} ${tv.name.lastName}`}
                              gender={tv.gender}
                              typeOfTraveller={tv.type}
                            />
                          ))} */}
                      </div>
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails>hello</AccordionDetails>
              </Accordion>
              <div>{existingTravellersLoaded && <TravellerWidget {...travellerWidgetProps} />}</div>

              <Accordion
                className={currentFormStep > 1 ? styles.card : styles.card_blocked}
                expanded={accState.stepTwoExpanded}>
                <AccordionSummary expandIcon={<DropdownArrowGreenIcon />} onClick={toggleStepTwoAccordion}>
                  <div style={{ width: '100%' }}>
                    <div className={styles.section_heading}>
                      <span className={styles.section_number}>2</span>
                      <div className={styles.section_title}>
                        {currentFormStep < 2 ? (
                          <div className={styles.title}>
                            Secure your Trip
                            <span className={styles.desc}>Add Suraksha and travel risk free</span>
                          </div>
                        ) : (
                          <div className={styles.title}>Suraksha Coverage</div>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionSummary>
                {/* {window?.screen?.width > 650 ? ( */}
                <AccordionDetails sx={{ padding: 0 }}>
                  {isSurakshaOpted ? (
                    <div className={styles.suraksha_banner}>
                      <BannerWithicon bannerType="suraksha" heading=" Your trip is now covered under suraksha" />
                    </div>
                  ) : (
                    <SurakshaChoice
                      selectedSuraksha={isSurakshaOpted}
                      onSelect={handleSurakshaSelection}
                      closeDrawer={surakshaChoiceCloseDrawerHandler}
                      refundAmountWithSuraksha={totalSurakshaRefundAmount?.toString()}
                      refundAmountWithoutSuraksha={totalRefundAmountWithoutSuraksha?.toString()}
                      perTravellerSurakshaAmt={surakshaAmountPerTraveller?.toString()}
                    />
                  )}
                </AccordionDetails>
                {/* ) : (
                    <SwipeableDrawer
                      anchor="bottom"
                      open={surakshaChoiceOpen}
                      onClose={surakshaChoiceCloseHandler}
                      onOpen={surakshaChoiceOpenHandler}
                      PaperProps={{
                        style: {
                          borderTopLeftRadius: '2rem',
                          borderTopRightRadius: '2rem',
                          height: '70%',
                          overflowX: 'hidden',
                        },
                      }}>
                      <SurakshaChoice
                        initialValue={isSurakshaOpted}
                        onSelect={handleSurakshaSelection}
                        closeDrawer={surakshaChoiceCloseDrawerHandler}
                      />
                      Hello
                    </SwipeableDrawer>
                  )} */}
              </Accordion>

              <Accordion
                className={currentFormStep > 2 ? styles.card : styles.card_blocked}
                expanded={accState.stepThreeExpanded}>
                <AccordionSummary expandIcon={<DropdownArrowGreenIcon />} onClick={toggleStepThreeAccordion}>
                  <div className={styles.section_heading}>
                    <span className={styles.section_number}>3</span>
                    <div className={styles.section_title}>
                      <div className={styles.title}>Extras</div>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={styles.extras}>
                    {extras &&
                      (extras || [])?.map((extrasOption, index: number) => {
                        const uniqueKey = `extras-${index}`;
                        return (
                          <ExtrasCard
                            key={uniqueKey}
                            heading={extrasOption.heading}
                            desc={extrasOption.desc}
                            openPopupCallback={() => openExtras(index as IFlightExtrasStep)}
                          />
                        );
                      })}
                    {/* <ExtrasCard
                        heading={extras[1].heading}
                        desc={extras[1].desc}
                        openPopupCallback={() => openExtras(1)}
                      />
                      <ExtrasCard
                        heading={extras[2].heading}
                        desc={extras[2].desc}
                        openPopupCallback={() => openExtras(2)}
                      /> */}
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* </div> */}

              {flightPriceDetailsData && flightPriceDetailsData?.isInsuranceEnabled && (
                <AddTravelInsurance
                  isInsuranceOpted={isInsuranceOpted}
                  handleInsuranceOpted={handleInsuranceSelection}
                  insuranceDetails={flightPriceDetailsData?.insuranceDetails}
                />
              )}

              {flightPriceDetailsData && flightPriceDetailsData?.isGstEnabled && (
                <div id="gstForm">
                  <CheckboxForm config={gstDetailsConfig} ref={gstFormRef} onFormSelect={handleGstSelection} />
                </div>
              )}

              {/* {flightPriceDetails && (flightPriceDetails[currentLegIdx] || {}) && (
                <div id="ltcForm">
                  <CheckboxForm config={ltcConfig} ref={ltcFormRef} onFormSelect={handleLtcSelection} />
                </div>
              )} */}

              {userData?.verificationStatus !== 'verified' &&
                armedForcesDonationAllowedData?.response &&
                armedForcesDonationAllowedData?.response?.isDonationAllowed && (
                  <ArmedForceDonation
                    isDonationOpted={isDonationOpted}
                    handleDonationOpted={handleDonationSelection}
                    armedForceDonationData={armedForcesDonationAllowedData?.response}
                  />
                )}

              {showConfirmAndPayPopup && (
                <ConfirmAndPayPopup
                  openCallback={handleConfirmAndPayPopup}
                  flightDetails={flightPriceDetails}
                  state={state}
                  proceed={saveBooking}
                />
              )}
            </div>
            <div className={styles.trip_summary_right}>
              {isCouponListLoading && !appliedCoupon?.coupon ? (
                <div>Loading Coupons...</div>
              ) : (
                couponList &&
                couponList?.response && (
                  <UcDiscountCoupon
                    couponsList={couponList && couponList?.response}
                    removeCoupon={removeCoupon}
                    validateCoupon={validateCoupon}
                    appliedCoupon={appliedCoupon}
                    isCouponRemovable
                  />
                )
              )}
              {fareList && <UcFareBreakupV2 fareList={fareList} totalFareCallback={(data: number) => {}} />}

              <div className={styles.cta_box}>
                <UcButton
                  className={styles.confirm_cta}
                  variant="contained"
                  type="button"
                  onClick={validateFormsAndShowConfirmPopup}>
                  Confirm & Pay
                </UcButton>
              </div>
              <div>
                <UcButton variant="contained" onClick={saveBooking}>
                  Save Booking
                </UcButton>
              </div>
            </div>
          </div>
          {flightPriceDetails && (
            <SwipeableDrawer
              anchor="bottom"
              open={viewMoreFlightDetails}
              onClose={viewMoreFlightDetailsHandler}
              onOpen={viewMoreFlightDetailsHandler}
              PaperProps={{
                style: {
                  height: '100%',
                  overflowX: 'hidden',
                },
              }}>
              <MSiteUcHeader backHandler={viewMoreFlightDetailsHandler}>
                <MSiteUcHeader.LeftContent>
                  <div>Flight Details</div>
                </MSiteUcHeader.LeftContent>
                <MSiteUcHeader.RightContent>
                  <ShareIcon />
                </MSiteUcHeader.RightContent>
              </MSiteUcHeader>
              <div className={styles.view_fts_details_container}>
                <TripSummaryNote />
                {flightPriceDetails && flightPriceDetails[currentLegIdx] && (
                  <div>
                    <UcCard>
                      <FlightLegDetails
                        legDetails={flightPriceDetails[currentLegIdx]?.leg}
                        departDate={flightPriceDetails[currentLegIdx]?.leg?.departDate}
                        arriveDate={flightPriceDetails[currentLegIdx]?.leg?.arriveDate}
                      />
                    </UcCard>
                    <UcButton className={styles.view_fts_details_btn} onClick={viewMoreFlightDetailsHandler}>
                      View Flight Details
                    </UcButton>
                    <BaggageAllowance
                      checkInBaggage={flightPriceDetails[currentLegIdx]?.leg?.checkInBaggage}
                      cabinBaggage={flightPriceDetails[currentLegIdx]?.leg?.handBaggage}
                      excessBaggageOptions={flightPriceDetails[currentLegIdx]?.leg?.excessBaggageOptions}
                    />
                    <TimelineCancellationCharge
                      cancelPenalties={flightPriceDetails[currentLegIdx]?.leg?.cancelPenalties}
                      reschedulePenalties={flightPriceDetails[currentLegIdx]?.leg?.reschedulePenalties}
                      departDate={flightPriceDetails[currentLegIdx]?.leg?.departDate}
                    />
                  </div>
                )}
              </div>
            </SwipeableDrawer>
          )}
          {window?.screen?.width > 650 ? (
            <Dialog
              open={showExtras}
              onClose={skipExtras}
              PaperProps={{
                className: 'popup-dialog',
                style: {
                  width: '60%',
                  height: '95%',
                  maxWidth: '1400px',
                  maxHeight: '800px',
                  borderRadius: '16px',
                  padding: '20px 20px 0px 20px',
                  overflowY: 'auto',
                },
              }}>
              <FlightExtras onSkip={() => skipExtras({}, 'skipped')} />
            </Dialog>
          ) : (
            <SwipeableDrawer
              anchor="bottom"
              open={flightExtrasOpen}
              onClose={flightExtrasCloseHandler}
              onOpen={flightExtrasOpenHandler}
              PaperProps={{
                style: {
                  padding: '0.5rem',
                  paddingTop: '2rem',
                  borderTopLeftRadius: '2rem',
                  borderTopRightRadius: '2rem',
                  height: '80%',
                  overflowX: 'hidden',
                },
              }}>
              <FlightExtras onSkip={() => skipExtras({}, 'skipped')} />
            </SwipeableDrawer>
          )}
        </TripSummaryDispatchProvider>
      </TripSummaryStateProvider>
    </div>
  );
}

export default FlightsTripSummary;
