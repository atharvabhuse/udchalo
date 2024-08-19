import { FlightSearchRequest, TravelDate } from '@uc/services/network';

export interface FlightSearchFormReducerAction {
  type: FlightSearchFormReducerActionTypes;
  payload?: any;
}

export enum FlightSearchFormReducerActionTypes {
  SET_ORIGIN = 'SET_ORIGIN',
  SET_DESTINATION = 'SET_DESTINATION',
  SET_ORIGIN_DESTINATION = 'SET_ORIGIN_DESTINATION',
  SET_TRIP_TYPE = 'SET_TRIP_TYPE',
  SET_ONWARD_DATE = 'SET_ONWARD_DATE',
  SET_RETURN_DATE = 'SET_RETURN_DATE',
  SET_TRAVELER_DATA = 'SET_TRAVELER_DATA',
  TOGGLE_IS_DEFENCE = 'TOGGLE_IS_DEFENCE',
  TOGGLE_TO_FROM = 'TOGGLE_TO_FROM',
  SET_LAST_SEARCH = 'SET_LAST_SEARCH',
}

export function flightSearchFormReducer(
  state: FlightSearchRequest,
  action: FlightSearchFormReducerAction
): FlightSearchRequest {
  const setTripType = (tripType: string) => {
    const returnDate = tripType === 'oneway' ? undefined : state.returnDate;
    const newState = { ...state, tripType, returnDate };
    return newState;
  };

  const getTravelDate = (date: Date): TravelDate => {
    const travelDate = new Date(date);
    return {
      year: travelDate.getFullYear(),
      month: travelDate.getMonth(),
      day: travelDate.getDate(),
    };
  };

  const setOrigin = (data: any) => {
    const { code: origin, countryCode: originCountryCode } = data;
    return { ...state, origin, originCountryCode };
  };

  const setDestination = (data: any) => {
    const { code: destination, countryCode: destinationCountryCode } = data;
    return { ...state, destination, destinationCountryCode };
  };

  const setOriginAndDestination = (data: any) => {
    const { origin, originCountryCode, destination, destinationCountryCode } = data;
    return { ...state, origin, originCountryCode, destination, destinationCountryCode };
  };

  const switchOriginDest = () => {
    const { origin, originCountryCode, destination, destinationCountryCode } = state;
    return {
      ...state,
      origin: destination,
      originCountryCode: destinationCountryCode,
      destination: origin,
      destinationCountryCode: originCountryCode,
    };
  };

  const setOnwardDate = (date: any) => {
    const departDate = getTravelDate(date);
    let nextDayReturn = {};

    if (state.tripType === 'roundtrip' && state.returnDate) {
      nextDayReturn = { returnDate: undefined };
    }
    return { ...state, ...nextDayReturn, departDate };
  };

  const setReturnDate = (data: any) => {
    const returnDate = getTravelDate(data);
    return { ...state, returnDate, tripType: 'roundtrip' };
  };

  const setTravelerData = (data: any) => {
    const { adults, cabin, infants, children } = data;
    return { ...state, adults, cabin, infants, children };
  };

  const toggleArmedForces = () => {
    const { isDefence } = state;
    return { ...state, isDefence: !isDefence };
  };

  const setLastRecentSearch = (data: FlightSearchRequest) => {
    const payLoad = data;
    const { departDate = '', returnDate = '' } = payLoad;
    const departDateObject = departDate && new Date(departDate.year, departDate.month, departDate.day);
    const returnDateObject = returnDate && new Date(returnDate.year, returnDate.month, returnDate.day);
    const currentDateObject = new Date();
    const currentDay = currentDateObject.getDate();
    const currentMonth = currentDateObject.getMonth();
    const currentYear = currentDateObject.getFullYear();
    const convertedCurrentDate = { day: currentDay, month: currentMonth, year: currentYear };
    if (departDateObject && departDateObject < currentDateObject) {
      payLoad.departDate = convertedCurrentDate;
    }
    if (returnDate && returnDateObject < currentDateObject) {
      payLoad.returnDate = convertedCurrentDate;
    }
    return payLoad;
  };

  let newState;

  switch (action.type) {
    case FlightSearchFormReducerActionTypes.SET_ORIGIN:
      newState = setOrigin(action.payload);
      break;

    case FlightSearchFormReducerActionTypes.SET_DESTINATION:
      newState = setDestination(action.payload);
      break;

    case FlightSearchFormReducerActionTypes.SET_ORIGIN_DESTINATION:
      newState = setOriginAndDestination(action.payload);
      break;

    case FlightSearchFormReducerActionTypes.SET_TRIP_TYPE:
      newState = setTripType(action.payload);
      break;

    case FlightSearchFormReducerActionTypes.SET_ONWARD_DATE:
      newState = setOnwardDate(action.payload);
      break;

    case FlightSearchFormReducerActionTypes.SET_RETURN_DATE:
      newState = setReturnDate(action.payload);
      break;

    case FlightSearchFormReducerActionTypes.SET_TRAVELER_DATA:
      newState = setTravelerData(action.payload);
      break;

    case FlightSearchFormReducerActionTypes.TOGGLE_IS_DEFENCE:
      newState = toggleArmedForces();
      break;

    case FlightSearchFormReducerActionTypes.TOGGLE_TO_FROM:
      newState = switchOriginDest();
      break;

    case FlightSearchFormReducerActionTypes.SET_LAST_SEARCH:
      newState = setLastRecentSearch(action.payload as FlightSearchRequest);
      break;
    default:
      break;
  }

  return newState;
}

export default flightSearchFormReducer;
