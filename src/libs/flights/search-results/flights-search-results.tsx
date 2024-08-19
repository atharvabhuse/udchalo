'use client';

import { Dialog, SwipeableDrawer, styled } from '@mui/material';
import Pen from '@uc/assets/images/Pen.svg';
import Sort from '@uc/assets/images/Sort.svg';
import Reset from '@uc/assets/images/reset.svg';
import { FlightSearchForm } from '@uc/libs/flights/shared/ui';
import {
  FlightNotFound,
  MSiteUcHeader,
  Notification,
  UcBankOfferCarousel,
  UcCarousel,
  UcDatePriceCarousel,
  UcSortMenu,
  UcVisaServicesCarousel,
} from '@uc/libs/shared/ui';
import {
  FareCalendarV2Request,
  FlightSearchInitResponse,
  FlightSearchRequest,
  HomePageDetails,
  SearchFormServiceData,
  SearchQuery,
  useAirportCodeToCityNameConverter,
  useDateToTextConverter,
  useGetFlightSearchResults,
  useGetRescheduleFlightSearchResults,
  usePostGetFareCalendarV2,
  useGetFlightsFareChangeDetails,
  usePostSearchInit
} from '@uc/services/network';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { Filter } from './components/filter/filter';
import { FlightSummary } from './components/flight-summary/flight-summary';
import Loader from './components/loader/loader';
import styles from './flights-search-results.module.scss';
import { FlightSearchResultsReducerActionTypes, flightsSearchResultsReducer } from './flights-search-results.reducer';
import { AirlinesObj } from './models';
import FareDropPopup from './components/fare-drop-popup/fare-drop-popup';
import { id } from 'date-fns/locale';
import { getSearchInitPayloadFromSearchQuery } from '@uc/services/search-form-services';

interface ComputedFlightsData {
  airlineList: AirlinesObj;
  sorted_airline_array: Array<any>;
  fastestFlight: number;
  cheapestFlight: number;
  morningCheapFlight: number;
  afternoonCheapFlight: number;
  eveningCheapFlight: number;
  nightCheapFlight: number;
  faujiArray: number[];
}
export interface FlightsSearchResultsProps {
  tripMode?: string;
  searchQuery: SearchQuery;
  searchFormServiceData: SearchFormServiceData;
  homePageDetails: HomePageDetails;
}

export interface FlightFareChangeDetails {
  message: string;
  response: {
    fareDrop: {
      fareDiff: number | null;
      message: string | null;
    };
    fareIncrease: {
      fareDiff: number | null;
      message: string | null;
    };
    noFareChange: {
      fareDiff: number | null;
      message: string | null;
    };
    type: string;
  };
  sessionId: string;
  success: boolean;
}



export function FlightsSearchResults(props: FlightsSearchResultsProps) {
  const [onwardFlightId, setOnwardFlightId] = useState<string>('');
  const [returnFlightId, setReturnFlightId] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toggleDrawerLeft, setToggleDrawerLeft] = useState(true);

  const { searchFormServiceData, tripMode, searchQuery, homePageDetails } = props;
  const { sessionId = '' } = searchQuery;
  const router = useRouter();

  const onSearch = (searchResponse: FlightSearchInitResponse) => {
    router.push(`/flights/results/${searchResponse?.sessionId}`);
  };

  const loadTripSummary = (flightId: string, returnFlightId: string | null) => {
    router.push(
      `/flights/review/${sessionId}?onwardId=${flightId}&returnId=${returnFlightId ?? ''}&adults=${searchQuery?.response
        ?.search?.adults}`
    );
  };

  const backHandler = () => {
    router.push('/flights');
  };

  const { getAirports, getCabins } = searchFormServiceData;
  const {
    data: searchResultResponse,
    isLoading: isLoadingSearchResults,
    isRefetching,
  }: any = useGetFlightSearchResults(sessionId && sessionId, { enabled: !tripMode });
  const { isSuccess: isFareDataFetched, mutate: getFareCalendarV2Mutation } = usePostGetFareCalendarV2();

  const { data: flightFareChangeDetails, isLoading: isLoadingflightFareChangeDetails, }: {
    data: any,
    isLoading: boolean,
  } = useGetFlightsFareChangeDetails(sessionId, { enabled: !!sessionId });

  const searchInitMutation = usePostSearchInit();

  const [dialogueOpen, setDialogueOpen] = useState(false);

  useEffect(() => {
    if (!isLoadingflightFareChangeDetails && flightFareChangeDetails.success) {
      const timeoutId = setTimeout(() => {
        if (flightFareChangeDetails.response.type === 'fareDrop' || flightFareChangeDetails.response.type === "fareIncrease")
          setDialogueOpen(true)
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [isLoadingflightFareChangeDetails,flightFareChangeDetails]);

  const message = flightFareChangeDetails?.response?.type === "fareIncrease"
    ? flightFareChangeDetails?.response?.fareIncrease?.message
    : flightFareChangeDetails?.response?.fareDrop?.message;

  const title = flightFareChangeDetails?.response?.type === "fareIncrease"
    ? 'Fare Increase'
    : 'Fare Drop';

  const {
    data: rescheduleFlightSearchResultResponse,
    isLoading: isLoadingRescheduleFlightSearchResults,
    isRefetching: isRescheduleFlightRefetching,
  }: any = useGetRescheduleFlightSearchResults(sessionId && sessionId, { enabled: !!tripMode });

  const [state, dispatch] = useReducer(flightsSearchResultsReducer, {
    searchQuery,
    filteredResults: {},
    sort: 'Prices_Cheapest',
  });

  const {
    tripType,
    origin,
    destination,
    originCountryCode,
    destinationCountryCode,
    adults,
    children,
    infants,
    cabin,
    isDefence,
    departDate,
  } = searchQuery?.response?.search ?? {};
  const isRoundTrip = tripType === 'roundtrip';
  const depDate = new Date(searchQuery?.response?.search?.departDate);
  const departTravelDate = { day: depDate.getDate(), month: depDate.getMonth(), year: depDate.getFullYear() };
  const retDate = isRoundTrip ? new Date(searchQuery?.response?.search?.returnDate) : undefined;
  const returnTravelDate = retDate
    ? { day: retDate.getDate(), month: retDate.getMonth(), year: retDate.getFullYear() }
    : undefined;

  const searchFlightHandler = (searchResponse: FlightSearchInitResponse) => onSearch(searchResponse);
  const setFareData = (data: any) =>
    dispatch({ type: FlightSearchResultsReducerActionTypes.SET_FARE_DATA, payload: data });
  const setSearchResult = (data: any) =>
    dispatch({ type: FlightSearchResultsReducerActionTypes.SET_SEARCH_RESULT, payload: data });
  const onFilter = (filter: any) =>
    dispatch({ type: FlightSearchResultsReducerActionTypes.SET_FILTER, payload: filter });
  const onSort = (sort: any) => dispatch({ type: FlightSearchResultsReducerActionTypes.SET_SORT, payload: sort });
  const onResetFilters = () => dispatch({ type: FlightSearchResultsReducerActionTypes.RESET_FILTER, payload: {} });
  const [flightSearchFormObj, setFlightSearchFormObj] = useState<FlightSearchRequest>({
    tripType: '',
    origin: '',
    destination: '',
    originCountryCode: '',
    destinationCountryCode: '',
    adults: 0,
    children: 0,
    infants: 0,
    cabin: '',
    isDefence: undefined,
    userCategory: '',
    referrer: '',
    serviceNumber: null,
    departDate: undefined,
    returnDate: undefined
  });

  const initialFormData: FlightSearchRequest = {
    tripType,
    origin,
    destination,
    originCountryCode,
    destinationCountryCode,
    adults,
    children,
    infants,
    cabin,
    isDefence,
    userCategory: 'Retail',
    referrer: '',
    serviceNumber: null,
    departDate: flightSearchFormObj?.departDate ? flightSearchFormObj?.departDate : departTravelDate,
    returnDate: returnTravelDate,
  };

  const onDateSliderSelection = (data: string) => {
    const newDepartDate = { day: Number(data.split('-')[0]), month: Number(data.split('-')[1]), year: Number(data.split('-')[2]) };
    const searchPayload = getSearchInitPayloadFromSearchQuery(searchQuery);
    searchPayload.departDate = newDepartDate;
    searchInitMutation.mutate(searchPayload as any, {
      onSuccess: (response, variables, context) => {
        onSearch(response.data);
      },
      onError(error, variables, context) { },
    });

  };

  const getFareCalendarV2Request = () => {
    const {
      isDefence: searchIsDefence,
      origin: searchOrigin,
      destination: searchDestination,
      cabin: searchCabin,
      departDate,
    } = searchQuery?.response?.search ?? {};
    const SearchDepDate = new Date(departDate);
    const fareCalendarRequest: FareCalendarV2Request = {
      isDefenceSearch: isDefence,
      selectedMonth: `${depDate.getMonth() + 1}`,
      selectedYear: `${depDate.getFullYear()}`,
      sessionId: 'search page',
      userType: 'notVerified',
      keyData: {
        origin: searchOrigin,
        destination: searchDestination,
        cabin: searchCabin,
      },
    };
    return fareCalendarRequest;
  };

  const getFareCalendar = () => {
    const fareCalendarRequest = getFareCalendarV2Request();
    getFareCalendarV2Mutation(fareCalendarRequest, {
      onSuccess(data, variables, context) {
        if (data.data.success) {
          setFareData(data.data.response);
        }
      },
      onError(error, variables, context) { },
    });
  };

  useEffect(() => {
    if (!isFareDataFetched) {
      getFareCalendar();
    }
    setSearchResult(searchResultResponse?.data?.response);
  }, [searchResultResponse]);

  useEffect(() => {
    setSearchResult(rescheduleFlightSearchResultResponse?.data?.response);
  }, [rescheduleFlightSearchResultResponse]);

  const loadTripSummaryFn = (flightId: string, mode: 'onward' | 'return') => {
    if (mode === 'onward') {
      setOnwardFlightId(flightId);
    } else {
      setReturnFlightId(flightId);
    }

    if (isRoundTrip) {
      if (onwardFlightId && flightId) {
        loadTripSummary(onwardFlightId, flightId);
      }
    } else {
      loadTripSummary(flightId, '');
    }
  };

  const {
    searchResult,
    onwardFlightsList,
    returnFlightsList,
    cheapestDefenceFlightId,
    fastestFlightId,
    filters,
    sort,
    fareCarouselData,
    defenceFlightsCount,
    cheapestRegularFlightId,
  } = state;

  const stubArray = [1, 2, 3];
  const airportList = getAirports?.response;
  const originCity = airportList ? airportList[searchQuery?.response?.search?.origin]?.city : '';
  const destinationCity = airportList ? airportList[searchQuery?.response?.search?.destination]?.city : '';

  const slides = homePageDetails.data.attributes.BankOffers.Bankoffercard.map((data, index) => (
    <UcBankOfferCarousel data={data} key={`index- ${index}`} />
  ));

  const [expandedAccordionId, setExpandedAccordionId] = React.useState(null);

  const onAccordionClick = (flightId)=> {
    setExpandedAccordionId(flightId);
  }

  const OnwardList = onwardFlightsList ? (
    onwardFlightsList.map((o: any, i: number) => {
      const onwardFlightId:string = o?.brandedFlights[0]?.flightId;
      return (
      <Fragment key={onwardFlightId}>
        {i === 4 && (
          <div className={styles.carousal}>
            <UcCarousel slides={slides} spaceBetween={0} slidesPerView={1} showPagination hideSwiperButtons />
          </div>
        )}
        <FlightSummary
          flightDetails={o}
          isCheapest={onwardFlightId === cheapestDefenceFlightId}
          isFastest={onwardFlightId === fastestFlightId}
          shouldExpand={!isRoundTrip}
          bookFlight={flightId => loadTripSummaryFn(flightId, 'onward')}
          tripMode={tripMode || ''}
          isDefence={o?.brandedFlights[0]?.isDefence}
          onAccordionClick={flightId => onAccordionClick(flightId)}
          isExpanded={expandedAccordionId === onwardFlightId}
          isCheapestRegularFare={onwardFlightId === cheapestRegularFlightId && isDefence}
        />
      </Fragment>)
    })
  ) : (
    <div>No flights found</div>
  );

  const ReturnList =
    isRoundTrip && returnFlightsList ? (
      returnFlightsList.map((o: any, i: number) => (
        <FlightSummary
          key={o.brandedFlights[0].flightId}
          flightDetails={o}
          isCheapest={o.brandedFlights[0].flightId === cheapestDefenceFlightId}
          isFastest={o.brandedFlights[0].flightId === fastestFlightId}
          shouldExpand={false}
          isReturnFlight
          bookFlight={flightId => loadTripSummaryFn(flightId, 'return')}
          isDefence={o.brandedFlights[0].isDefence}
          onAccordionClick={flightId => onAccordionClick(flightId)}
          isExpanded={expandedAccordionId === onwardFlightId}
          isCheapestRegularFare={o.brandedFlights[0].flightId === cheapestRegularFlightId && isDefence}

        />
      ))
    ) : (
      <div>No return flights found</div>
    );

  const [open, setOpen] = useState(false);
  const updateFormPopupOpenHandler = () => {
    setOpen(true);
  };
  const popupStyle = {
    borderRadius: '1rem',
    padding: '0.5rem',
  };

  const { dateMonth, day } = useDateToTextConverter(searchQuery?.response?.search?.departDate);
  const { city: originCityName } = useAirportCodeToCityNameConverter(
    getAirports?.response,
    searchQuery?.response?.search?.origin
  );
  const { city: destinationCityName } = useAirportCodeToCityNameConverter(
    getAirports?.response,
    searchQuery?.response?.search?.destination
  );

  const searchResultMobileHeaderData = {
    travellers: searchQuery?.response?.search?.adults,
    cabin: searchQuery?.response?.search?.cabin,
    originCode: searchQuery?.response?.search?.origin,
    destinationCode: searchQuery?.response?.search?.destination,
    originCity,
    destinationCity,
    date: dateMonth,
    day
  };

  const sortHandler = () => setDrawerOpen(true);
  const closeHandler = () => setDrawerOpen(false);
  const openHandler = () => setDrawerOpen(true);

  const toggleClickHandler = (text: string) => {
    if (text === 'sort') {
      setToggleDrawerLeft(true);
    } else {
      setToggleDrawerLeft(false);
    }
  };

  const [sortFilterMobileOptions, setSortFilterMobileOptions] = useState('');
  const sortFilterMobileApplyHandler = () => setDrawerOpen(false);

  const handleSortingForMobile = (sortType: string) => {
    const updatedSortOptionsArray = sort.map(sortOptions => ({
      ...sortOptions,
      options: sortOptions?.options?.map(option => {
        const optionKey = `${sortOptions?.heading}_${option?.label}`;
        const selected = sortType === optionKey;
        return {
          ...option,
          selected,
        };
      }) || [],
    }));

    onSort(updatedSortOptionsArray);
    setSortFilterMobileOptions(sortType);
  };


  const handleFilteringForMobile = (filterType: string, filterTypeOption: string) => {
    const updatedFilterOptions = {
      ...filters,
      [filterType]: {
        ...filters[filterType],
        options: (filters[filterType]?.options || []).map(option => ({
          ...option,
          selected: option?.label?.includes(filterTypeOption),
        })),
      },
    };

    onFilter(updatedFilterOptions);
    setSortFilterMobileOptions(filterTypeOption);
  };


  const sortFilterMobileOptionsHandler = (btnText: string) => handleSortingForMobile(btnText);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.screen.width);
  }, []);

  const renderFlightSearchForm = () => {
    if (windowWidth > 600) {
      return (
        <FlightSearchForm
          airportList={airportList}
          cabinTypes={getCabins?.response}
          initialFormData={initialFormData}
          onSearch={searchFlightHandler}
          showSearchInline
        />
      );
    }
    return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ style: popupStyle }}
        slotProps={{
          root: {
            style: {
              position: "absolute",
              zIndex: 1000
            },
          },
        }}
      >
        <FlightSearchForm
          airportList={airportList}
          cabinTypes={getCabins?.response}
          initialFormData={initialFormData}
          onSearch={searchFlightHandler}
          showSearchInline
        />
      </Dialog>
    );
  };

  const dialogPaperStyle = {
    width: windowWidth > 600 ? '45%' : '95%',
    height: windowWidth > 600 ? '85%' : '55%',
    maxWidth: '1400px',
    maxHeight: '800px',
    borderRadius: '16px',
    padding: '40px 20px 40px 20px',
    display: 'flex',
    justifyContent: 'center',
  };

  const loaderDateArr = new Date(departDate).toString()?.split(' ');
  const loaderDate = `${loaderDateArr[2]} ${loaderDateArr[1]}, ${loaderDateArr[3]}`;
  const loaderData = {
    originCity: airportList ? airportList[origin]?.city : '',
    originAirport: airportList ? `${airportList[origin]?.airport_name} airport` : '',
    destinationCity: airportList ? airportList[destination]?.city : '',
    destinationAirport: airportList ? `${airportList[destination]?.airport_name} airport` : '',
    date: loaderDate,
    isDefence,
  };
  const remainingSuppliers = searchResultResponse?.data?.response?.suppliersState[0]?.remainingSuppliers;

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>, fn: () => void) => {
    if (event.key === 'Enter') {
      fn();
    }
  };

  const defenceFlightsOrNot = isDefence ? `${defenceFlightsCount} Flights found with Fauji Fares` : `${OnwardList?.length}  Flights found`;

  return (
    <>
      <MSiteUcHeader backHandler={backHandler}>
        <MSiteUcHeader.LeftContent>
          <div className={styles.search_result_header_row}>
            <div className={styles.search_result_header_column1}>
              <div className={styles.search_result_header_flight}>
                {`${originCityName} (${searchResultMobileHeaderData.originCode}) - ${destinationCityName} (${searchResultMobileHeaderData.destinationCode})`}
              </div>
              <div className={styles.search_result_header_flight_details}>
                {searchResultMobileHeaderData.date}, {searchResultMobileHeaderData.day} |{searchResultMobileHeaderData.travellers} Traveller(s) |
                {searchResultMobileHeaderData.cabin}
              </div>
            </div>
            <div
              className={styles.search_result_header_column2}
              onClick={updateFormPopupOpenHandler}
              onKeyDown={e => keyDownHandler(e, updateFormPopupOpenHandler)}
              role="button"
              tabIndex={0}
              aria-label="Update Form">
              <Pen />
            </div>
          </div>
        </MSiteUcHeader.LeftContent>
        <MSiteUcHeader.RightContent>
          <Notification />
        </MSiteUcHeader.RightContent>
      </MSiteUcHeader>

      <div className={styles.search_form_container}>
        {isLoadingRescheduleFlightSearchResults ? '' : renderFlightSearchForm()}
      </div>
      <div className={styles.result_container}>
        <div className={onwardFlightsList?.length > 0 ? styles.filter_view : styles.filter_view_none}>
          {filters && window.innerWidth > 600 && onwardFlightsList?.length > 0 && (
            <Filter filters={filters} onFilter={onFilter} onReset={onResetFilters} />
          )}
        </div>

        {(isLoadingSearchResults || isRefetching || remainingSuppliers !== 0) && tripMode !== 'reschedule' && (
          <Dialog
            open
            PaperProps={{
              style: dialogPaperStyle,
            }}>
            <Loader loaderData={loaderData} />
          </Dialog>
        )}
        <div>
          {((windowWidth < 600 && onwardFlightsList?.length > 0) || (windowWidth > 600 && onwardFlightsList?.length >= 0 )) && (
            <UcDatePriceCarousel
              faresList={fareCarouselData}
              selectedDate={searchQuery?.response.search.departDate}
              onDateSliderDateSelection={onDateSliderSelection}
            />
          )}
          {onwardFlightsList?.length > 0 ? (
            <div className={styles.flights_search_result_box}>
              <UcVisaServicesCarousel items={stubArray} />
              {/* {defenceFlightsCount ? (
                <div className={styles.fauji_flights}>{defenceFlightsCount} Flights found with Fauji Fares</div>
              ) : (
                ''
              )} */}
              <div className={styles.flights_length}>{defenceFlightsOrNot}</div>
              <div className={styles.list_header_container}>
                <div className={styles.list_header}>
                  <div className={styles.from_to}>
                    {originCity} to {destinationCity}
                  </div>
                  <UcSortMenu sortOptions={sort} onSort={onSort} />
                </div>

                {isRoundTrip && (
                  <div className={styles.list_header}>
                    <div className={styles.from_to}>
                      {destinationCity} to
                      {originCity}
                    </div>
                    <UcSortMenu sortOptions={sort} onSort={onSort} />
                  </div>
                )}
              </div>
              <div className={styles.list_container}>
                <div className={styles.list_view}>{OnwardList}</div>
                {isRoundTrip && <div className={styles.list_view}>{ReturnList}</div>}
              </div>
              <div className={styles.sort_filter_mobile}>
                <div
                  onClick={sortHandler}
                  onKeyDown={e => keyDownHandler(e, sortHandler)}
                  role="button"
                  tabIndex={0}
                  className={styles.sort_filter_section1}>
                  <Sort className={styles.sort} />
                  <div className={styles.sort_filter_section1_heading}>sort & filters</div>
                </div>
                <div className={styles.sort_filter_section2}>
                  <button
                    type="button"
                    onClick={() => sortFilterMobileOptionsHandler('Prices_Cheapest')}
                    className={
                      sortFilterMobileOptions === 'Prices_Cheapest'
                        ? styles.sort_filter_option_active
                        : styles.sort_filter_option
                    }>
                    Cheapest
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFilteringForMobile('stops', 'Non-Stop')}
                    className={
                      sortFilterMobileOptions === 'Non-Stop'
                        ? styles.sort_filter_option_active
                        : styles.sort_filter_option
                    }>
                    Non Stop
                  </button>
                  <button
                    type="button"
                    onClick={() => sortFilterMobileOptionsHandler('Excess Baggage_Maximum check-in baggage')}
                    className={
                      sortFilterMobileOptions === 'Excess Baggage_Maximum check-in baggage'
                        ? styles.sort_filter_option_active
                        : styles.sort_filter_option
                    }>
                    Excess baggage
                  </button>
                </div>
              </div>
              <div className={styles.swiper_drawer_box}>
                <SwipeableDrawer
                  anchor="bottom"
                  open={drawerOpen}
                  onClose={closeHandler}
                  onOpen={openHandler}
                  PaperProps={{ style: { backgroundColor: 'transparent' } }}
                  className={styles.swiper}>
                  <div className={styles.swiper_drawer_content}>
                    <div className={styles.toggle_row}>
                      <button
                        type='button'
                        onClick={() => toggleClickHandler('sort')}
                        className={`${toggleDrawerLeft === true ? styles.toggle_button_active : styles.toggle_button}`}>
                        Sort
                      </button>
                      <button
                        type='button'
                        onClick={() => toggleClickHandler('filter')}
                        className={`${toggleDrawerLeft === false ? styles.toggle_button_active : styles.toggle_button}`}>
                        Filter
                      </button>
                    </div>
                    <div className={styles.resetRow}>
                      <Reset />
                      <div className={styles.resetText}>Reset All</div>
                    </div>
                    {toggleDrawerLeft ? (
                      <div className={styles.sort_content}>
                        <div className={styles.sort_heading}>Prices</div>
                        <div className={styles.sort_radio_button}>
                          <input className={styles.inp} type="radio" name="flightType" />
                          <div>Cheapest</div>
                        </div>

                        <div className={styles.sort_heading}>Duration</div>
                        <div className={styles.sort_radio_button}>
                          <input className={styles.inp} type="radio" name="flightType" />
                          <div>Shortest</div>
                        </div>

                        <div className={styles.sort_heading}>Excess Baggage</div>
                        <div className={styles.sort_radio_button_full}>
                          <input className={styles.inp} type="radio" name="flightType" />
                          <div>Maximum Check-in baggage</div>
                        </div>

                        <div className={styles.sort_heading}>Depart Time</div>
                        <div className={styles.sort_btn_row}>
                          <div className={styles.sort_radio_button}>
                            <input className={styles.inp} type="radio" name="flightType" />
                            <div>Earliest</div>
                          </div>
                          <div className={styles.sort_radio_button}>
                            <input className={styles.inp} type="radio" name="flightType" />
                            <div>Late</div>
                          </div>
                        </div>

                        <div className={styles.sort_heading}>Arrival Time</div>
                        <div className={styles.sort_btn_row}>
                          <div className={styles.sort_radio_button}>
                            <input className={styles.inp} type="radio" name="flightType" />
                            <div>Earliest</div>
                          </div>
                          <div className={styles.sort_radio_button}>
                            <input className={styles.inp} type="radio" name="flightType" />
                            <div>Late</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>{filters && <Filter filters={filters} onFilter={onFilter} onReset={onResetFilters} />}</div>
                    )}
                    <div className={styles.apply_btn_row}>
                      <button type='button' onClick={sortFilterMobileApplyHandler} className={styles.apply_btn}>
                        Apply
                      </button>
                    </div>
                  </div>
                </SwipeableDrawer>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.not_found}>
                <FlightNotFound />
                <p className={styles.title}>No Flights Found!</p>
                <p className={styles.desc}>
                  We could not find any flights for the filters applied.
                  <br />
                  Please Reset the Filters or Modify your Search.
                </p>
                <div className={styles.row}>
                  <button type="button" className={styles.reset_btn} onClick={onResetFilters}>
                    Reset Filters
                  </button>
                  <button type="button" className={styles.modify_btn} onClick={() => window.scrollTo(0, 0)}>
                    Modify Search
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {dialogueOpen && <FareDropPopup message={message} title={title} />}
    </>
  );
}

export default FlightsSearchResults;
