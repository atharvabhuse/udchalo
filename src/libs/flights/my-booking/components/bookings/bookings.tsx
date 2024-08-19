import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  TextField,
} from '@mui/material';
import { SearchIcon } from '@uc/libs/shared/ui';
import { GetAllBookingsRequest, GetAllBookingsResponse, useGetAllBookings } from '@uc/services/network';
import { AxiosHeaders } from 'axios';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useReducer, useState } from 'react';
import BookingCard, { BookingCardTypes } from './booking-card/booking-card';
import { bookingConst } from './bookings.constant';
import styles from './bookings.module.scss';
import MyBookingsReducer, { MyBookingTabs, SortOrder, initialMyBookingState } from './my-bookings.reducer';
import NoBookingsFound from './no-bookings-found/no-bookings-found';
import TableHeader from './table-header/table-header';

export interface BookingPropsType {
  tabClick: (value: string) => void;
}

export interface GetAllbookingData {
  config: any;
  headers: AxiosHeaders;
  data: GetAllBookingsResponse;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}
export type Services = 'all' | 'travel' | 'shopping' | 'finance' | 'housing' | '';

function Bookings({ tabClick }: BookingPropsType) {
  const router = useRouter();
  const request: GetAllBookingsRequest = { isNewVersion2: true, startKey: null };
  const getAllBookings = useGetAllBookings();
  const [state, dispatch] = useReducer(MyBookingsReducer, initialMyBookingState);
  const { currentTabArray, showLoadMore, currentTab, pageLimit } = state;
  const [timeAndDateSortOrder, setTimeAndDateSortOrder] = useState<SortOrder>('DESC');
  const [isSearching, setIsSearching] = useState<string>('');
  const fetchBookings = () => {
    getAllBookings.mutate(request, {
      onSuccess(data: GetAllbookingData) {
        const response: GetAllBookingsResponse = data?.data;
        if (response.success) {
          dispatch({
            type: 'SET_ALL_BOOKINGS',
            payload: response?.response?.data,
          });
        }
      },
      onError(error) {
        console.log(error);
      },
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: MyBookingTabs) => {
    tabClick(newValue);
    dispatch({
      type: 'SWITCH_TABS',
      payload: newValue,
    });
    setTimeAndDateSortOrder('DESC');
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const onSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const searchingPNR: string = event.target.value;
    setIsSearching(searchingPNR);
    dispatch({
      type: 'SEARCH_PNR',
      payload: searchingPNR,
    });
  };

  const loadMoreHandler = () => {
    dispatch({ type: 'LOAD_MORE' });
  };

  const sortHandler = () => {
    switch (timeAndDateSortOrder) {
      case 'DESC':
        dispatch({
          type: 'SORT_BY_DATE_AND_TIME',
          payload: 'ASC',
        });
        setTimeAndDateSortOrder('ASC');
        break;
      case 'ASC':
        dispatch({
          type: 'SORT_BY_DATE_AND_TIME',
          payload: 'DESC',
        });
        setTimeAndDateSortOrder('DESC');
        break;
      default:
        break;
    }
  };

  const navigateToFlights = () => {
    router.push('/flights');
  };

  const renderBookingsConditionally = () => {
    let content: ReactNode;
    if (getAllBookings?.isLoading) {
      content = <CircularProgress size={45} className={styles.loaderSpinner} />;
    } else if (currentTabArray.length > 0) {
      content = (
        <TabPanel value={currentTab} className={styles.tab_panel}>
          <TableHeader sortHandler={sortHandler} dateAndTimeState={timeAndDateSortOrder} />
          {currentTabArray.slice(0, pageLimit).map((bookingData: BookingCardTypes, index: number) => (
            <div className={styles.booking_card_container} key={`my-bookings-${index}`}>
              <BookingCard key={bookingData.index} data={bookingData} />
            </div>
          ))}
        </TabPanel>
      );
    } else if (currentTabArray.length === 0 && isSearching) {
      content = <NoBookingsFound message="Sorry, No Bookings Found as per Search criteria." />;
    } else {
      content = (
        <NoBookingsFound
          message={`Sorry, No ${currentTab} Bookings Found.`}
          onClickHandler={navigateToFlights}
          buttonText="New Booking?"
        />
      );
    }
    return content;
  };

  return (
    <div className={styles.booking}>
      <div className={styles.bookings_root}>
        <div className={styles.my_bookings_box}>
          <div className={styles.my_bookings}>
            <span className={styles.lbl}>{bookingConst.pageHeader}</span>
            <FormControl
              className={styles.input_box}
              sx={{
                marginLeft: 2,
                marginTop: -0.5,
                marginBottom: 1,
                height: 39,
                minWidth: 150,
                '& fieldset': {
                  borderRadius: '8px',
                  border: '1px solid #c5d4e3',
                },
                '& MuiInputLabel-root': {
                  color: '#858585',
                  fontSize: '12px',
                  fontWeight: '400',
                },
                '& MuiInputBase-input-MuiOutlinedInput-input': {
                  width: '8rem',
                },
                '& MuiSvgIcon-root-MuiSelect-icon': {
                  color: 'red',
                },
              }}
              size="small">
              <InputLabel id="select-label">{bookingConst.service}</InputLabel>
              <Select labelId="select-label" id="simple-select" label="Services" defaultValue="travel">
                <MenuItem value="travel">Travel</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.search_pnr_box}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className={styles.search_icon} />
                  </InputAdornment>
                ),
              }}
              size="small"
              placeholder="Search PNR / Booking Id"
              className={styles.input_box}
              variant="outlined"
              onChange={onSearchHandler}
              sx={{
                '& fieldset': {
                  borderRadius: '8px',
                  border: '1px solid #c5d4e3',
                },
              }}
            />
          </div>
        </div>
        <div className={styles.table_box}>
          <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} variant="fullWidth">
                <Tab className={styles.tab_name} label={bookingConst.tabUpcomingLbl} value="Upcoming" />
                <Tab className={styles.tab_name} label={bookingConst.tabCompletedLbl} value="Completed" />
                <Tab className={styles.tab_name} label={bookingConst.tabCancelledLbl} value="Cancelled" />
                <Tab className={styles.tab_name} label={bookingConst.tabFailedLbl} value="Failed" />
              </TabList>
            </Box>
            {renderBookingsConditionally()}
          </TabContext>
        </div>
      </div>
      {showLoadMore && !getAllBookings?.isLoading && currentTabArray.length > pageLimit && (
        <div className={styles.load_more_row}>
          <button className={styles.load_more} type="button" onClick={loadMoreHandler}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
export default Bookings;
