import { GetAllBookingsResponseType } from '@uc/services/network';
import { orderBy } from 'lodash-es';
import { BookingCardTypes } from './booking-card/booking-card';

export interface MyBookingReducerState {
  allBookings: Array<BookingCardTypes>;
  upcomingBookings: Array<BookingCardTypes>;
  completedBookings: Array<BookingCardTypes>;
  cancelledBookings: Array<BookingCardTypes>;
  failedBookings: Array<BookingCardTypes>;
  currentTabArray: Array<BookingCardTypes>;
  pageLimit: number;
  currentTab: MyBookingTabs;
  showLoadMore: boolean;
}

export const ALL_BOOKING_STATUS = {
  flightSaved: 'flightSaved',
  pending: 'pending',
  bookingFailed: 'bookingFailed',
  booked: 'booked',
  cancellationRequested: 'cancellationRequested',
  cancellationRejected: 'cancellationRejected',
  cancelled: 'cancelled',
  rescheduled: 'rescheduled',
  refunded: 'refunded',
  rebooked: 'rebooked',
  processed: 'processed',
};

const BOOKING_STATUS_MAPPER = {
  flightSaved: 'In Progress',
  pending: 'In Progress',
  bookingFailed: 'Failed',
  booked: 'Confirmed',
  cancellationRequested: 'Cancellation Requested',
  cancellationRejected: 'Cancellation Rejected',
  cancelled: 'Cancelled',
  rescheduled: 'Rescheduled',
  refunded: 'Refund Processed',
  rebooked: 'Rebooked',
  processed: 'Processed',
  '': '',
  undefined: '',
  null: '',
};

export type MyBookingTabs = 'Upcoming' | 'Completed' | 'Cancelled' | 'Failed';

export type SortOrder = 'ASC' | 'DESC';

export interface MyBookingsReducerAction {
  type: MyBookingsReducerActionTypes;
  payload?: Array<GetAllBookingsResponseType> | string;
}

export type MyBookingsReducerActionTypes =
  | 'SET_ALL_BOOKINGS'
  | 'LOAD_MORE'
  | 'SWITCH_TABS'
  | 'SEARCH_PNR'
  | 'SORT_BY_DATE_AND_TIME';

export const initialMyBookingState: MyBookingReducerState = {
  allBookings: [],
  upcomingBookings: [],
  completedBookings: [],
  cancelledBookings: [],
  failedBookings: [],
  currentTabArray: [],
  pageLimit: 7,
  currentTab: 'Upcoming',
  showLoadMore: false,
};

const MyBookingsReducer = (state: MyBookingReducerState, action: MyBookingsReducerAction): MyBookingReducerState => {
  const getBookingData = (data: Array<GetAllBookingsResponseType>) => {
    const bookingDataArr: Array<BookingCardTypes> = [];
    data.forEach((item: GetAllBookingsResponseType, index) => {
      const [travelDate, travelTime] = item.dateOfJourney.split('T');
      const bookingData: BookingCardTypes = {
        name: '',
        lastName: '',
        bookingId: '',
        PNR: '',
        travelDate: '',
        travelTime: '',
        trip: { tripStatus: '', tripDesc: '', lobIcon: '', destination: '', origin: '' },
        noOfTravellerCount: '',
        index: 0,
        flightId: '',
        travelDateAndTime: new Date(item.dateOfJourney),
        displayStatus: '',
      };
      bookingData.PNR = item.pnr;
      bookingData.bookingId = item.bookingId;
      bookingData.name = item.passengers[0].name.firstName;
      bookingData.lastName = item?.passengers[0]?.name?.lastName;
      bookingData.noOfTravellerCount = String(item.passengers.length);
      bookingData.travelDate = travelDate;
      bookingData.travelTime = travelTime;
      bookingData.trip.origin = item.origin;
      bookingData.trip.destination = item.destination;
      bookingData.trip.tripDesc = 'One Way Trip';
      bookingData.trip.tripStatus = item.status;
      bookingData.index = index + 1;
      bookingData.flightId = item.flightId;
      bookingDataArr.push(bookingData);
    });
    return bookingDataArr;
  };

  const showLoadMoreHandler = (currentTab: MyBookingTabs, pageLimit): boolean => {
    let currentTabArrayLength = 0;
    switch (currentTab) {
      case 'Upcoming':
        currentTabArrayLength = state.upcomingBookings.length;
        break;
      case 'Completed':
        currentTabArrayLength = state.completedBookings.length;
        break;
      case 'Cancelled':
        currentTabArrayLength = state.cancelledBookings.length;
        break;
      case 'Failed':
        currentTabArrayLength = state.failedBookings.length;
        break;
      default:
        break;
    }
    return currentTabArrayLength > pageLimit;
  };

  const switchCurrentTabArray = (currentTab: MyBookingTabs) => {
    switch (currentTab) {
      case 'Upcoming':
        return state.upcomingBookings;
      case 'Completed':
        return state.completedBookings;
      case 'Cancelled':
        return state.cancelledBookings;
      case 'Failed':
        return state.failedBookings;
      default:
        return state.currentTabArray;
    }
  };

  const sortOrderHandler = (bookingDataList: Array<BookingCardTypes>, sortOrder: SortOrder) => {
    const sortedArray: Array<BookingCardTypes> = orderBy(
      bookingDataList,
      [(booking: BookingCardTypes) => booking.travelDateAndTime],
      [sortOrder.toLowerCase()]
    ) as Array<BookingCardTypes>;
    return sortedArray;
  };

  const sortbyDateAndTime = (sortOrder: SortOrder) => {
    const sortedArray: Array<BookingCardTypes> = sortOrderHandler([...state.currentTabArray], sortOrder);
    return { ...state, currentTabArray: sortedArray };
  };

  const setAllBookings = (bookings: Array<GetAllBookingsResponseType>) => {
    if (bookings) {
      const bookingDataArr: Array<BookingCardTypes> = getBookingData(bookings);
      const validUpcomingTripStatus = [
        ALL_BOOKING_STATUS.pending,
        ALL_BOOKING_STATUS.flightSaved,
        ALL_BOOKING_STATUS.booked,
        ALL_BOOKING_STATUS.rescheduled,
        ALL_BOOKING_STATUS.rebooked,
      ];
      const validCompletedTripStatus = [
        ALL_BOOKING_STATUS.booked,
        ALL_BOOKING_STATUS.rescheduled,
        ALL_BOOKING_STATUS.rebooked,
      ];
      const validCancelledTripStatus = [
        ALL_BOOKING_STATUS.cancelled,
        ALL_BOOKING_STATUS.cancellationRequested,
        ALL_BOOKING_STATUS.cancellationRejected,
        ALL_BOOKING_STATUS.refunded,
        ALL_BOOKING_STATUS.processed,
      ];

      const upcomingBookings: Array<BookingCardTypes> = [];
      const completedBookings: Array<BookingCardTypes> = [];
      const cancelledBookings: Array<BookingCardTypes> = [];
      const failedBookings: Array<BookingCardTypes> = [];

      bookingDataArr.forEach((everyBooking: BookingCardTypes) => {
        if (
          Math.floor(new Date(everyBooking.travelDate).getTime() - new Date().getTime()) > 0 &&
          validUpcomingTripStatus.includes(everyBooking.trip.tripStatus.toLocaleLowerCase())
        ) {
          const upcomingBooking = everyBooking;
          upcomingBooking.displayStatus = BOOKING_STATUS_MAPPER[everyBooking.trip.tripStatus] as string;
          upcomingBookings.push(upcomingBooking);
        } else if (
          Math.floor(new Date(everyBooking.travelDate).getTime() - new Date().getTime()) < 0 &&
          validCompletedTripStatus.includes(everyBooking.trip.tripStatus.toLocaleLowerCase())
        ) {
          const completedBooking = everyBooking;
          completedBooking.displayStatus = 'Completed';
          completedBookings.push(completedBooking);
        } else if (validCancelledTripStatus.includes(everyBooking.trip.tripStatus)) {
          const cancelledBooking = everyBooking;
          cancelledBooking.displayStatus = BOOKING_STATUS_MAPPER[everyBooking.trip.tripStatus] as string;
          cancelledBookings.push(cancelledBooking);
        } else if (everyBooking.trip.tripStatus === ALL_BOOKING_STATUS.bookingFailed) {
          const failedBooking = everyBooking;
          failedBooking.displayStatus = BOOKING_STATUS_MAPPER[everyBooking.trip.tripStatus] as string;
          failedBookings.push(failedBooking);
        }
      });

      const newState = {
        ...state,
        allBookings: bookingDataArr,
        completedBookings: sortOrderHandler(completedBookings, 'DESC'),
        upcomingBookings: sortOrderHandler(upcomingBookings, 'DESC'),
        cancelledBookings: sortOrderHandler(cancelledBookings, 'DESC'),
        failedBookings: sortOrderHandler(failedBookings, 'DESC'),
        currentTabArray: sortOrderHandler(upcomingBookings, 'DESC'),
        showLoadMore: showLoadMoreHandler(state.currentTab, state.pageLimit),
      };

      return newState;
    }
    return state;
  };

  const onLoadMore = () => ({
    ...state,
    pageLimit: state.pageLimit + 7,
    showLoadMore: showLoadMoreHandler(state.currentTab, state.pageLimit + 7),
  });

  const switchTab = (tab: MyBookingTabs) => {
    const showMore = showLoadMoreHandler(tab, state.pageLimit);
    return {
      ...state,
      currentTab: tab,
      showLoadMore: showMore,
      currentTabArray: switchCurrentTabArray(tab),
    };
  };

  const searchPnr = (searchingValue: string) => {
    let filteredValue: Array<BookingCardTypes>;
    const currentList: Array<BookingCardTypes> = switchCurrentTabArray(state.currentTab);
    if (searchingValue !== '') {
      filteredValue = currentList.filter((item: BookingCardTypes) => {
        const pnrMatches = item.PNR?.toUpperCase().includes(searchingValue.toLocaleUpperCase()) ?? false;
        const bookingIdMatches = item.bookingId?.toUpperCase().includes(searchingValue.toLocaleUpperCase()) ?? false;
        return pnrMatches || bookingIdMatches;
      });
    } else {
      filteredValue = switchCurrentTabArray(state.currentTab);
    }
    return {
      ...state,
      currentTabArray: filteredValue,
    };
  };

  let newState;

  switch (action.type) {
    case 'SET_ALL_BOOKINGS':
      newState = setAllBookings(action.payload as Array<GetAllBookingsResponseType>);
      break;
    case 'LOAD_MORE':
      newState = onLoadMore();
      break;
    case 'SWITCH_TABS':
      newState = switchTab(action.payload as MyBookingTabs);
      break;
    case 'SEARCH_PNR':
      newState = searchPnr(action.payload as string);
      break;
    case 'SORT_BY_DATE_AND_TIME':
      newState = sortbyDateAndTime(action.payload as SortOrder);
      break;
    default:
      return state;
  }
  return newState as MyBookingReducerState;
};

export default MyBookingsReducer;
