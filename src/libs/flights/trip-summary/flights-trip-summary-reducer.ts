import {
  IBaggageOption,
  ICoupon,
  IFlightPriceListAPIResponse,
  IFlightPriceListResponse,
  ISurakshaResponse,
} from '@uc/services/network';
import { IMealOption } from '../shared/ui';
import { calculateFareList, calculateSurakshaAmounts } from './utils/trip-summary-data.utils';
export type IFlightExtrasStep = 0 | 1 | 2;
export interface IFlightTripSummaryReducerAction {
  type: FlightTripSummaryReducerActionTypes;
  payload: any;
}
export interface IAppliedCoupon {
  coupon: ICoupon | null;
  isValid: boolean;
  actualDiscount?: number;
}
export type FlightTripSummaryReducerActionTypes =
  | 'SET_FLIGHT_DETAILS'
  | 'SET_CURRENT_LEG'
  | 'SELECT_TRAVELLER'
  | 'DESELECT_TRAVELLER'
  | 'SET_CONTACT_DETAILS'
  | 'SELECT_SEAT'
  | 'DESELECT_SEAT'
  | 'SELECT_MEAL'
  | 'DESELECT_MEAL'
  | 'SET_BAGGAGE_SELECTION'
  | 'SET_CURRENT_SEGMENT'
  | 'SET_CURRENT_TRAVELLER'
  | 'SET_COUPON_CODE'
  | 'SET_CURRENT_STEP'
  | 'SET_GST_SELECTION'
  | 'SET_LTC_SELECTION'
  | 'SET_GST_DETAILS'
  | 'SET_DONATION_SELECTION'
  | 'SET_SURAKSHA_SELECTION'
  | 'SET_INSURANCE_SELECTION'
  | 'SET_TOTAL_FARELIST'
  | 'SET_SURAKSHA_AMOUNT'
  | 'SET_NEW_FORM_STEP';

interface IBookingPassgengerName {
  title?: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

interface IBookingContactDetails {
  receiveInfoOnWhatsApp: boolean;
  phoneNumber: string;
  email: string;
  name: IBookingPassgengerName;
}

interface IBookingGSTDetails {
  uinNumber: string;
  companyName: string;
  companyEmail: string;
}

interface ISurakshaAmounts {
  surakshaAmountPerTraveller: number;
  totalSurakshaRefundAmount: number;
  totalRefundAmountWithoutSuraksha: number;
}

interface IDonationPayload {
  isOpted: boolean;
  amount: number;
}

interface ISurakshaAmountPayload {
  surakshaResponse: ISurakshaResponse[];
  totalTravellers: number;
}
export interface IFlightTripSummaryState {
  flightPriceDetails: IFlightPriceListResponse[];
  selectedTravellers: any[]; // Array to store the selected travellers
  isSurakshaOpted: boolean;
  currentJourneyType: string; // Reference to know wether onward or return
  currentFlightId: string; // Referene to store the current flightId i.e. onward or return
  currentFormStep: number;
  currentStep: IFlightExtrasStep; // reference to stepper having seat, meal and baggege
  currentLegIdx: number; // reference to know the current leg of the journey i.e. onward or return
  currentSegmentIdx: number; // reference to know the current segment of the journey
  currentTravellerIdx: number; // reference to know the currently selected traveller from selected travellers
  isGstOpted: boolean;
  gstDetails?: IBookingGSTDetails; // reference to store the gst details shared by user
  isInsuranceOpted: boolean;
  isRefundProtectionOpted: boolean;
  refundProtectionOnAddOns: boolean;
  isDonationOpted: boolean;
  donationAmount: number;
  appliedCoupon: IAppliedCoupon;
  bankOfferMethod: string;
  selectedSeatsMap: Map<string, any[]>;
  selectedMealsMap: Map<string, IMealOption[]>;
  currentSeatsMapKey: string;
  contactDetails: IBookingContactDetails;
  fareList: any;
  totalFare: number;
  flightPriceData: Partial<IFlightPriceListAPIResponse>;
  surakshaAmounts: ISurakshaAmounts;
}

export const initialFtsValue: IFlightTripSummaryState = {
  flightPriceDetails: [],
  selectedTravellers: [],
  isSurakshaOpted: false,
  currentJourneyType: 'onward',
  currentLegIdx: 0,
  currentFlightId: '',
  currentFormStep: 1,
  currentStep: 0,
  currentSegmentIdx: 0,
  currentTravellerIdx: 0,
  isGstOpted: false,
  gstDetails: {
    uinNumber: '',
    companyEmail: '',
    companyName: '',
  },
  isInsuranceOpted: false,
  isRefundProtectionOpted: false,
  refundProtectionOnAddOns: false,
  isDonationOpted: false,
  donationAmount: 0,
  appliedCoupon: {
    coupon: null,
    isValid: false,
    actualDiscount: 0,
  },
  selectedSeatsMap: new Map(),
  selectedMealsMap: new Map(),
  currentSeatsMapKey: '',
  contactDetails: null,
  bankOfferMethod: '',
  fareList: null,
  totalFare: 0,
  flightPriceData: null,
  surakshaAmounts: {
    surakshaAmountPerTraveller: 0,
    totalSurakshaRefundAmount: 0,
    totalRefundAmountWithoutSuraksha: 0,
  },
};
const FlightTripSummaryReducer = (
  state: IFlightTripSummaryState,
  action: IFlightTripSummaryReducerAction
): IFlightTripSummaryState => {
  const getNewAncillariesObject = () => {
    const newAncObject = {
      [state.currentFlightId]: {
        seats: [],
        meals: [],
        baggage: null,
      },
    };
    return newAncObject;
  };

  const getSeatMapKey = (flightId: string, segmentIdx: number) => `${flightId}_${segmentIdx}`;

  const getNextAction = () => {
    const {
      selectedTravellers,
      flightPriceDetails,
      currentTravellerIdx,
      currentSegmentIdx,
      currentLegIdx,
      currentStep,
      currentSeatsMapKey,
      currentFlightId,
    } = state;
    let nextTravellerIndex = currentTravellerIdx;
    let nextSegmentIndex = currentSegmentIdx;
    let nextStepIndex = currentStep;
    let currentSeatMapKey = currentSeatsMapKey;
    const hasNextTraveller = currentTravellerIdx < (selectedTravellers && selectedTravellers?.length - 1);
    // Check if we have any more travellers
    if (hasNextTraveller) {
      nextTravellerIndex += 1;
    } else {
      // Check if we have any more segments
      const hasNextSegment =
        currentSegmentIdx <
        (flightPriceDetails && (flightPriceDetails[currentLegIdx] || {})?.leg?.segments?.length - 1);
      if (hasNextSegment) {
        nextSegmentIndex += 1;
        // Reset the traveller index
        currentSeatMapKey = getSeatMapKey(currentFlightId, nextSegmentIndex);
        nextTravellerIndex = 0;
      } else {
        // Check if we have any more steps
        const hasNextStep = currentStep < 3;
        if (hasNextStep) {
          nextStepIndex += 1;
          // Reset the traveller index and segment index
          nextTravellerIndex = 0;
          nextSegmentIndex = 0;
          currentSeatMapKey = getSeatMapKey(currentFlightId, nextSegmentIndex);
        }
      }
    }
    return {
      currentTravellerIdx: nextTravellerIndex,
      currentSegmentIdx: nextSegmentIndex,
      currentStep: nextStepIndex,
      currentSeatsMapKey: currentSeatMapKey,
    };
  };

  const resetCurrentTravellerIndex = () => {
    if (state.selectedTravellers.length) {
      return { ...state, currentTravellerIdx: 0 };
    }
  };

  const setCurrentSegment = (segmentIndex: number) => {
    resetCurrentTravellerIndex();
    return {
      ...state,
      currentSegmentIdx: segmentIndex,
      currentSeatsMapKey: getSeatMapKey(state.currentFlightId, segmentIndex),
    };
  };

  const setCurrentTraveller = (travellerNumber: number) => ({
    ...state,
    currentTravellerIdx: travellerNumber,
  });

  const setFlightDetails = (apiResponse: IFlightPriceListAPIResponse) => {
    const { response: flightPriceDetails, ...flightPriceData } = apiResponse;
    const currentFlightId = flightPriceDetails[state.currentLegIdx].flightId;
    const currentSeatsMapKey = getSeatMapKey(currentFlightId, state.currentSegmentIdx);
    return { ...state, flightPriceDetails, currentFlightId, currentSeatsMapKey, flightPriceData };
  };

  const setCurrentLeg = (legIdx: number) => {
    const currentFlightId = state.flightPriceDetails[legIdx].flightId;
    return { ...state, currentFlightId };
  };

  const selectTraveller = (passenger: any) => {
    const { selectedTravellers } = state;
    const ancillaries = getNewAncillariesObject();
    const traveller = { ...passenger, ancillaries };
    return { ...state, selectedTravellers: [...selectedTravellers, traveller] };
  };

  const deselectTraveller = (traveller: any) => {
    const { selectedTravellers } = state;
    const updatedArray = selectedTravellers.filter((tv: any) => tv.travellerId !== traveller.travellerId);
    return { ...state, selectedTravellers: [...updatedArray] };
  };

  const getNewFormStep = () => {
    const { currentFormStep } = state;
    return { ...state, currentFormStep: currentFormStep < 3 ? currentFormStep + 1 : currentFormStep };
  };

  const addContactDetails = (data: IBookingContactDetails) => ({ ...state, contactDetails: data });

  const selectSeat = (seat: any) => {
    const { seatNumber, price } = seat;
    const { selectedTravellers, currentTravellerIdx, currentFlightId, currentSegmentIdx, selectedSeatsMap } = state;
    const traveller = selectedTravellers[currentTravellerIdx];
    traveller?.ancillaries[currentFlightId].seats.push({
      seatNumber,
      amount: price,
      segmentIndex: currentSegmentIdx,
    });

    const seatMapKey = getSeatMapKey(currentFlightId, currentSegmentIdx);
    const selectedSeats = selectedSeatsMap.get(seatMapKey);
    if (selectedSeats) {
      selectedSeats.push(seat);
    } else {
      selectedSeatsMap.set(seatMapKey, [seat]);
    }
    const nextActions = getNextAction();
    return { ...state, ...nextActions };
  };

  const deselectSeat = (seat: any) => {
    const { selectedTravellers, currentTravellerIdx, currentFlightId, currentSegmentIdx, selectedSeatsMap } = state;
    const traveller = selectedTravellers[currentTravellerIdx];
    const ancillaries = traveller?.ancillaries[currentFlightId];
    const { seats: currentSeats } = ancillaries;
    const updatedSeats = currentSeats.filter(s => s.seatNumber !== seat.seatNumber);
    ancillaries.seats = updatedSeats;
    const seatMapKey = getSeatMapKey(currentFlightId, currentSegmentIdx);
    const selectedSeats = selectedSeatsMap?.get(seatMapKey);
    if (selectedSeats) {
      const updatedSelectedSeats = (selectedSeats || [])?.filter(
        selectedSeat => selectedSeat.seatNumber !== seat.seatNumber
      );
      selectedSeatsMap.set(seatMapKey, updatedSelectedSeats);
    }
    return { ...state };
  };

  const selectMeal = (meal: IMealOption) => {
    const { text, code, price } = meal;
    const { selectedTravellers, currentTravellerIdx, currentFlightId, currentSegmentIdx, selectedMealsMap } = state;
    const traveller = selectedTravellers[currentTravellerIdx];
    traveller?.ancillaries[currentFlightId].meals.push({
      mealId: code,
      segmentIndex: currentSegmentIdx,
      price,
      text,
      code,
    });
    const mealMapKey = getSeatMapKey(currentFlightId, currentSegmentIdx);
    const selectedMeals = selectedMealsMap?.get(mealMapKey);
    if (selectedMeals) {
      selectedMeals.push(meal);
    } else {
      selectedMealsMap.set(mealMapKey, [meal]);
    }
    const nextActions = getNextAction();
    return { ...state, ...nextActions };
  };

  const deSelectMeal = (meal: IMealOption) => {
    const { selectedTravellers, currentTravellerIdx, currentFlightId, currentSegmentIdx, selectedMealsMap } = state;
    const traveller = selectedTravellers[currentTravellerIdx];
    const ancillaries = traveller?.ancillaries[currentFlightId];
    const { meals: currentMeals = [] } = ancillaries;
    const isMealPresent = currentMeals?.some(presentMeal => presentMeal?.code === meal?.code);

    if (!isMealPresent) {
      console.log('selectedMealsMap', selectedMealsMap);
      return { ...state };
    }
    const updatedMeals =
      currentMeals && (currentMeals || [])?.filter(selectedMeal => selectedMeal?.code !== meal?.code);
    ancillaries.meals = updatedMeals;
    const mealMapKey = getSeatMapKey(currentFlightId, currentSegmentIdx);
    const selectedMeals = selectedMealsMap?.get(mealMapKey);
    if (selectedMeals) {
      const updatedSelectedMeals =
        selectedMeals && (selectedMeals || [])?.filter(selectedMeal => selectedMeal?.code !== meal?.code);
      selectedMealsMap?.set(mealMapKey, updatedSelectedMeals);
    }
    return { ...state };
  };

  const setExcessBaggage = (selectedBaggage: IBaggageOption) => {
    const { currentTravellerIdx, selectedTravellers, currentFlightId } = state;
    const traveller = selectedTravellers[currentTravellerIdx];
    traveller.ancillaries[currentFlightId].baggage = selectedBaggage;

    return { ...state };
  };

  const setCouponCode = (couponInfo: IAppliedCoupon) => {
    const isBankOffer = couponInfo?.coupon?.metadata?.voucher_type === 'bankoffer';
    const mode = couponInfo?.coupon?.metadata?.mode;
    const bankOfferMethod = isBankOffer && mode ? mode?.toString()?.split(',')?.join('_') : null;
    const newState = { ...state, appliedCoupon: couponInfo, bankOfferMethod };
    return newState;
  };
  const setLtcSelection = (selected: boolean) => ({ ...state, isLtcSelected: selected });

  const setGstSelection = (selected: boolean) => ({ ...state, isGstOpted: selected });

  const setGstDetails = (gstDetails: any) => ({ ...state, gstDetails });

  const setCurrentStep = (step: IFlightExtrasStep) => ({ ...state, currentStep: step });

  const setDonationSelection = (donation: IDonationPayload) => {
    const { isOpted, amount } = donation;
    return { ...state, isDonationOpted: isOpted, donationAmount: amount };
  };

  const setSurakshaSelection = (selectedValue: boolean) => ({ ...state, isSurakshaOpted: selectedValue });

  const setInsuranceSelection = (selectedValue: boolean) => ({ ...state, isInsuranceOpted: selectedValue });

  const setTotalFareList = fareList => ({ ...state, fareList });

  const setSurakshaAmount = (surakshaAmountPayload: ISurakshaAmountPayload) => {
    const { totalTravellers, surakshaResponse } = surakshaAmountPayload;
    const { currentLegIdx, flightPriceDetails, selectedTravellers, appliedCoupon } = state;
    const flightLegId = flightPriceDetails[currentLegIdx]?.leg?.legId;
    // const totalTravellers = selectedTravellers?.length;
    const surakshaAmounts = calculateSurakshaAmounts(surakshaResponse, flightLegId, totalTravellers, appliedCoupon);
    return surakshaAmounts ? { ...state, surakshaAmounts } : { ...state };
  };

  let newFtsState;
  switch (action.type) {
    case 'SET_FLIGHT_DETAILS':
      newFtsState = setFlightDetails(action?.payload);
      break;
    case 'SET_CURRENT_LEG':
      newFtsState = setCurrentLeg(action?.payload);
      break;
    case 'SELECT_TRAVELLER':
      newFtsState = selectTraveller(action?.payload);
      break;
    case 'DESELECT_TRAVELLER':
      newFtsState = deselectTraveller(action?.payload);
      break;
    case 'SET_CONTACT_DETAILS':
      newFtsState = addContactDetails(action?.payload as IBookingContactDetails);
      break;
    case 'SELECT_SEAT':
      newFtsState = selectSeat(action?.payload);
      break;
    case 'DESELECT_SEAT':
      newFtsState = deselectSeat(action?.payload);
      break;
    case 'SELECT_MEAL':
      newFtsState = selectMeal(action?.payload);
      break;
    case 'DESELECT_MEAL':
      newFtsState = deSelectMeal(action?.payload);
      break;
    case 'SET_BAGGAGE_SELECTION':
      newFtsState = setExcessBaggage(action?.payload);
      break;
    case 'SET_COUPON_CODE':
      newFtsState = setCouponCode(action?.payload);
      break;
    case 'SET_CURRENT_STEP':
      newFtsState = setCurrentStep(action?.payload as IFlightExtrasStep);
      break;
    case 'SET_CURRENT_SEGMENT':
      newFtsState = setCurrentSegment(action?.payload as number);
      break;
    case 'SET_CURRENT_TRAVELLER':
      newFtsState = setCurrentTraveller(action?.payload as number);
      break;
    case 'SET_GST_SELECTION':
      newFtsState = setGstSelection(action.payload);
      break;
    case 'SET_LTC_SELECTION':
      newFtsState = setLtcSelection(action.payload);
      break;
    case 'SET_GST_DETAILS':
      newFtsState = setGstDetails(action.payload);
      break;
    case 'SET_DONATION_SELECTION':
      newFtsState = setDonationSelection(action?.payload as IDonationPayload);
      break;
    case 'SET_SURAKSHA_SELECTION':
      newFtsState = setSurakshaSelection(action?.payload as boolean);
      break;
    case 'SET_INSURANCE_SELECTION':
      newFtsState = setInsuranceSelection(action?.payload as boolean);
      break;
    case 'SET_TOTAL_FARELIST':
      newFtsState = setTotalFareList(action?.payload);
      break;
    case 'SET_SURAKSHA_AMOUNT':
      newFtsState = setSurakshaAmount(action?.payload as ISurakshaAmountPayload);
      break;
    case 'SET_NEW_FORM_STEP':
      newFtsState = getNewFormStep();
      break;
    default:
      break;
  }
  calculateFareList(newFtsState);
  console.log('NFS: ', newFtsState);
  return newFtsState as IFlightTripSummaryState;
};

export default FlightTripSummaryReducer;
