import next from 'next/types';
import { FlightTripSummaryState } from './models';

export interface FlightTripSummaryReducerAction {
  type: FlightTripSummaryReducerActionTypes;
  payload?: any;
}

export type FlightTripSummaryReducerActionTypes =
  | 'SET_FLIGHT_DETAILS'
  | 'SELECT_TRAVELLER'
  | 'DESELECT_TRAVELLER'
  | 'ADD_CONTACT_DETAILS'
  | 'SET_SURAKSHA_SELECTION'
  | 'SET_SEAT_SELECTION'
  | 'SET_MEAL_SELECTION'
  | 'SET_BAGGAGE_SELECTION'
  | 'SET_INSURANCE_SELECTION'
  | 'SET_DONATION_SELECTION'
  | 'ADD_TRAVELLER'
  | 'UPDATE_TRAVELLER'
  | 'SET_CURRENT_STEP'
  | 'SET_CURRENT_SEGMENT'
  | 'SET_CURRENT_USER'
  | 'SET_GST_SELECTION'
  | 'SET_LTC_SELECTION'
  | 'SET_GST_DETAILS'
  | 'SET_LTC_DETAILS'
  | 'SET_COUPON_CODE'
  | 'SET_SAVED_TRAVELLERS'
  | 'SET_CURRENT_TRAVELLER'
  | 'SET_BOOKING_DETAILS'
  | 'SET_RESCHEDULE_FLIGHT_DETAILS';

export function flightTripSummaryReducer(
  state: FlightTripSummaryState,
  action: FlightTripSummaryReducerAction
): FlightTripSummaryState {
  const addTraveller = (data: any) => {
    const { savedTravellers } = state;
    savedTravellers?.push(data);
    return { ...state, savedTravellers };
  };

  const updateTraveller = (data: any) => ({ ...state });

  const getNewAncillariesObject = () => ({
    [state.currentFlightId]: {
      seats: new Map<number, any>(),
      meals: new Map<number, any>(),
    },
  });

  const getNewFormStep = () => {
    const { currentFormStep } = state;
    return currentFormStep < 3 ? currentFormStep + 1 : currentFormStep;
  };

  const resetCurrentTravellerIndex = () => {
    if (state.passengers.length) {
      state.extras.currentTravellerIndex = 0;
    }
  };

  const setSavedTravellers = (travellers: any) => ({ ...state, savedTravellers: travellers });

  const getNextAction = () => {
    const {
      passengers,
      segments,
      extras: { currentTravellerIndex, currentSegmentIndex, currentStep },
    } = state;
    let nextTravellerIndex = currentTravellerIndex;
    let nextSegmentIndex = currentSegmentIndex;
    let nextStepIndex = currentStep;

    const hasNextTraveller = currentTravellerIndex < passengers.length - 1;
    // Check if we have any more travellers
    if (hasNextTraveller) {
      nextTravellerIndex += 1;
    } else {
      // Check if we have any more segments
      const hasNextSegment = currentSegmentIndex < segments.length - 1;
      if (hasNextSegment) {
        nextSegmentIndex += 1;
        // Reset the traveller index
        nextTravellerIndex = 0;
      } else {
        // Check if we have any more steps
        const hasNextStep = currentStep < 3;
        if (hasNextStep) {
          nextStepIndex += 1;
          // Reset the traveller index and segment index
          nextTravellerIndex = 0;
          nextSegmentIndex = 0;
        }
      }
    }

    return {
      currentTravellerIndex: nextTravellerIndex,
      currentSegmentIndex: nextSegmentIndex,
      currentStep: nextStepIndex,
    };
  };

  const getNextTravellerIndex = () => {
    const {
      passengers,
      extras: { currentTravellerIndex },
    } = state;
    let nextTravellerIndex = currentTravellerIndex;
    nextTravellerIndex += currentTravellerIndex < passengers.length - 1 ? 1 : 0;
    return nextTravellerIndex;
  };

  const selectTraveller = (traveller: any) => {
    const {
      passengers,
      extras: { currentTravellerIndex },
    } = state;
    const passenger = { ...traveller, ancillaries: getNewAncillariesObject() };

    // Add or replace existing traveller
    if (!passengers.length) {
      passengers.push(passenger);
    } else {
      const alreadySelected = passengers.find(
        t => t.name.firstName === traveller.name.firstName && t.name.lastName === traveller.name.lastName
      );
      if (!alreadySelected) {
        passengers.push(passenger);
      }
    }
    // Set traveller as currentTraveller if this is first traveller
    let firstTraveller = currentTravellerIndex;
    if (passengers.length === 1) {
      firstTraveller = 0;
    }
    return {
      ...state,
      passengers,
      extras: { ...state.extras, currentTravellerIndex: firstTraveller },
    };
  };

  const deselectTraveller = (traveller: any) => {
    const { passengers } = state;
    const newTravellerArray = passengers;
    if (newTravellerArray.length) {
      const travellerIndex = newTravellerArray.findIndex(
        t => t.name.firstName === traveller.name.firstName && t.name.lastName === traveller.name.lastName
      );
      if (travellerIndex > -1) {
        newTravellerArray.splice(travellerIndex, 1);
      }
    }
    return { ...state, passengers: newTravellerArray };
  };

  const addContactDetails = (data: any) => {
    const currentFormStep = getNewFormStep();
    return { ...state, contactDetails: data, currentFormStep };
  };

  const setCurrentStep = (step: number) => ({ ...state, extras: { ...state.extras, currentStep: step } });

  const setCurrentSegment = (segmentIndex: number) => {
    resetCurrentTravellerIndex();
    const { segments } = state;
    return {
      ...state,
      extras: {
        ...state.extras,
        currentSegment: segments[segmentIndex],
        currentSegmentIndex: segmentIndex,
      },
    };
  };

  const setCurrentTraveller = (traveller: any) => ({
    ...state,
    extras: { ...state.extras, currentTravellerIndex: traveller },
  });

  const setFlightDetails = (resp: any) => {
    const { response: flightDetails, ...additionalFlightDetails } = resp;
    const { segments } = flightDetails[0].leg;
    const currentSegmentIndex = 0;
    const currentFlightId = flightDetails[0].flightId;
    const extras = {
      currentStep: 0,
      currentSegmentIndex,
      currentSegment: segments[currentSegmentIndex],
    };
    return {
      ...state,
      flightDetails,
      additionalFlightDetails,
      segments,
      extras,
      currentFlightId,
    };
  };

  const setRescheduleFlightDetails = (resp: any) => {
    const { response: rescheduleFlightDetails } = resp;
    const segments = rescheduleFlightDetails?.onwardLeg?.brandedFlights[0]?.segments;
    const currentFlightId = rescheduleFlightDetails?.onwardLeg?.flightId;
    return {
      ...state,
      rescheduleFlightDetails,
      segments,
      currentFlightId,
    };
  };

  const setSeatSelection = (seat: any) => {
    const {
      passengers,
      currentFlightId,
      extras: { currentTravellerIndex, currentSegmentIndex },
    } = state;
    const segmentSeat = { ...seat, segmentIndex: currentSegmentIndex };
    const passenger = passengers[currentTravellerIndex];
    passenger.ancillaries[currentFlightId].seats.set(currentSegmentIndex, segmentSeat);

    // set next traveller if any
    // const nextTravellerIndex = getNextTravellerIndex();
    // return { ...state, extras: {...state.extras, currentTravellerIndex: nextTravellerIndex} };
    const nextActions = getNextAction();
    return { ...state, extras: { ...state.extras, ...nextActions } };
  };

  const setMealSelection = (meal: any) => {
    const {
      passengers,
      currentFlightId,
      extras: { currentTravellerIndex, currentSegmentIndex },
    } = state;
    const segmentMeal = { ...meal, segmentIndex: currentSegmentIndex };
    const passenger = passengers[currentTravellerIndex];
    passenger.ancillaries[currentFlightId].meals.set(currentSegmentIndex, segmentMeal);

    // set next traveller if any
    // const nextTravellerIndex = getNextTravellerIndex();
    // return { ...state, extras: {...state.extras, currentTravellerIndex: nextTravellerIndex} };
    const nextActions = getNextAction();
    return { ...state, extras: { ...state.extras, ...nextActions } };
  };

  const setBaggageSelection = (baggage: any) => {
    const {
      passengers,
      currentFlightId,
      extras: { currentTravellerIndex, currentSegmentIndex },
    } = state;
    const passenger = passengers[currentTravellerIndex];
    // passenger.baggage = baggage;
    passenger.ancillaries[currentFlightId].baggage = baggage;

    // set next traveller if any
    // const nextTravellerIndex = getNextTravellerIndex();
    // return { ...state, extras: {...state.extras, currentTravellerIndex: nextTravellerIndex} };
    const nextActions = getNextAction();
    return { ...state, extras: { ...state.extras, ...nextActions } };
  };

  const setCouponCode = (couponInfo: any) => {
    const { coupon } = couponInfo;
    const bankOfferMethod =
      coupon?.metadata?.voucher_type === 'bankoffer'
        ? coupon.metadata.mode
          ? coupon.metadata.mode.toString().replaceAll(',', '_')
          : null
        : null;
    return { ...state, coupon, bankOfferMethod };
  };

  const setSurakshaSelection = (selected: boolean) => {
    const currentFormStep = getNewFormStep();
    return { ...state, isSurakshaOpted: selected, currentFormStep };
  };

  const setInsuranceSelection = (selected: boolean) => ({ ...state, isInsuranceOpted: selected });

  const setDonationSelection = (selected: boolean) => ({ ...state, isDonationOpted: selected });

  const setLtcSelection = (selected: boolean) => ({ ...state, isLtcSelected: selected });

  const setGstSelection = (selected: boolean) => ({ ...state, isGstSelected: selected });

  const setLtcDetails = (ltcDetails: any) => ({ ...state, ltcDetails });

  const setGstDetails = (gstDetails: any) => ({ ...state, gstDetails });

  const setBookingDetails = (bookingDetails: any) => {
    const currentFormStep = 3;
    return {
      ...state,
      bookingDetails,
      currentFormStep,
      passengers: bookingDetails?.passengers,
      isSurakshaOpted: bookingDetails?.isSurakshaOpted,
    };
  };

  let newState;

  switch (action.type) {
    case 'SET_FLIGHT_DETAILS':
      newState = setFlightDetails(action.payload);
      break;
    case 'SET_SAVED_TRAVELLERS':
      newState = setSavedTravellers(action.payload);
      break;
    case 'SET_SEAT_SELECTION':
      newState = setSeatSelection(action.payload);
      break;
    case 'SET_MEAL_SELECTION':
      newState = setMealSelection(action.payload);
      break;
    case 'SET_BAGGAGE_SELECTION':
      newState = setBaggageSelection(action.payload);
      break;
    case 'ADD_TRAVELLER':
      newState = addTraveller(action.payload);
      break;
    case 'UPDATE_TRAVELLER':
      newState = updateTraveller(action.payload);
      break;
    case 'SELECT_TRAVELLER':
      newState = selectTraveller(action.payload);
      break;
    case 'DESELECT_TRAVELLER':
      newState = deselectTraveller(action.payload);
      break;
    case 'ADD_CONTACT_DETAILS':
      newState = addContactDetails(action.payload);
      break;
    case 'SET_CURRENT_STEP':
      newState = setCurrentStep(action.payload);
      break;
    case 'SET_CURRENT_SEGMENT':
      newState = setCurrentSegment(action.payload);
      break;
    case 'SET_CURRENT_TRAVELLER':
      newState = setCurrentTraveller(action.payload);
      break;
    case 'SET_COUPON_CODE':
      newState = setCouponCode(action.payload);
      break;
    case 'SET_SURAKSHA_SELECTION':
      newState = setSurakshaSelection(action.payload);
      break;
    case 'SET_INSURANCE_SELECTION':
      newState = setInsuranceSelection(action.payload);
      break;
    case 'SET_DONATION_SELECTION':
      newState = setDonationSelection(action.payload);
      break;
    case 'SET_GST_SELECTION':
      newState = setGstSelection(action.payload);
      break;
    case 'SET_LTC_SELECTION':
      newState = setLtcSelection(action.payload);
      break;
    case 'SET_GST_DETAILS':
      newState = setGstDetails(action.payload);
      break;
    case 'SET_LTC_DETAILS':
      newState = setLtcDetails(action.payload);
      break;
    case 'SET_BOOKING_DETAILS':
      newState = setBookingDetails(action.payload);
      break;
    case 'SET_RESCHEDULE_FLIGHT_DETAILS':
      newState = setRescheduleFlightDetails(action.payload);
      break;
  }
  console.log('NFS:', newState);
  return newState as FlightTripSummaryState;
}

export default flightTripSummaryReducer;
