import { GreyCalendarIcon, InfoIcon } from '@uc/assets/images';
import { useEffect, useReducer, useState } from 'react';
// TODO: absolute path will be replaced with nx conventional path
import ClickAwayListener from '@mui/material/ClickAwayListener';
import DestinationReplace from '@uc/assets/images/destination_replace_icon.svg';
import FaujiFamilyIcon from '@uc/assets/images/fauji_family_icon.svg';
import {
  FareCalendarV2Request,
  FlightSearchInitResponse,
  FlightSearchRequest,
  IPopularAirports,
  usePostGetFareCalendarV2,
  usePostSearchInit,
} from '@uc/services/network';
import { retriveValueFromLocalStorage, setToLocalStorage } from '@uc/utils/web-storage-utils';
import { format } from 'date-fns';
import CitySearch from '../city-search/city-search';
import CitySearchMsite from '../city-search/city-search-msite';
import FlightsDatePicker from '../flights-date-picker/flights-date-picker';
import DatePickerMsite from '../flights-date-picker/flights-date-picker-msite';
import TravelerSelect from '../traveller-select/traveller-select';
import TravelerSelectMsite from '../traveller-select/traveller-select-msite';
import { FlightSearchFormReducerActionTypes, flightSearchFormReducer } from './flight-search-form-reducer';
import styles from './flight-search-form.module.scss';
import InfoToolTip from './info-tool-tip';

export interface FlightSearchFormProps {
  airportList: any;
  cabinTypes: any;
  initialFormData: FlightSearchRequest;
  onSearch: (searchResponse: FlightSearchInitResponse) => void;
  showSearchInline?: boolean;
  recentSearchData?: Array<FlightSearchRequest>;
  popularAirports?: IPopularAirports[];
}
type departDate = {
  day: number;
  month: number;
  year: number;
};
interface FormErrors {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
}

export const FLIGHT_POPULAR_LOCATION = [
  { name: 'Bengaluru', airport: 'Kempegowda Intl Airport', code: 'BLR', countryCode: 'IN' },
  { name: 'Hyderabad', airport: 'Hyderabad Airport', code: 'HYD', countryCode: 'IN' },
  { name: 'Mumbai', airport: 'Chhatrapati Shivaji International Airport', code: 'BOM', countryCode: 'IN' },
  { name: 'Pune', airport: 'Lohegaon Airport', code: 'PNQ', countryCode: 'IN' },
  { name: 'Delhi', airport: 'Indira Gandhi International Airport', code: 'DEL', countryCode: 'IN' },
];

export function FlightSearchForm(props: FlightSearchFormProps) {
  const { showSearchInline, cabinTypes, recentSearchData, initialFormData, onSearch, airportList, popularAirports } =
    props;
  const [openToolTip, setOpenToolTip] = useState({
    armedForce: false,
    faujiFamily: false,
  });

  const handleTooltipClose = (value: 'armedForce' | 'faujiFamily') => {
    switch (value) {
      case 'armedForce':
        setOpenToolTip(prevState => ({
          ...prevState,
          armedForce: false,
        }));
        break;
      case 'faujiFamily':
        setOpenToolTip(prevState => ({
          ...prevState,
          faujiFamily: false,
        }));
        break;
      default:
        break;
    }
  };
  const handleTooltipOpen = (value: 'armedForce' | 'faujiFamily') => {
    switch (value) {
      case 'armedForce':
        setOpenToolTip(prevState => ({
          ...prevState,
          armedForce: true,
        }));
        break;
      case 'faujiFamily':
        setOpenToolTip(prevState => ({
          ...prevState,
          faujiFamily: true,
        }));
        break;
      default:
        break;
    }
  };

  const TRIP_TYPES = { ONE_WAY: 'oneway', ROUND_WAY: 'roundtrip' };
  const airportListVar = airportList
    ? Object.entries(airportList).map(([key, value]) => ({
        code: key,
        ...(value as object),
      }))
    : [];
  const [formData, dispatch] = useReducer(flightSearchFormReducer, initialFormData);
  const [showReturnDatePopper, setShowReturnDatePopper] = useState(false);
  const [isFaujiFamily, setFaujiFamily] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [fareData, setFareData] = useState({});
  const searchInitMutation = usePostSearchInit();
  const getFareCalendarV2Mutation = usePostGetFareCalendarV2();
  const [errors, setErrors] = useState<FormErrors>({
    origin: '',
    departDate: '',
    destination: '',
    returnDate: '',
  });

  const getFareCalendarV2Request = () => {
    const {
      isDefence,
      origin,
      destination,
      cabin,
      departDate: { month, year },
    } = formData;
    const fareCalendarRequest: FareCalendarV2Request = {
      isDefenceSearch: isDefence,
      selectedMonth: `${month + 1}`,
      selectedYear: `${year}`,
      sessionId: 'search page',
      userType: 'notVerified',
      keyData: {
        origin,
        destination,
        cabin,
      },
    };
    return fareCalendarRequest;
  };

  const getFareCalendar = () => {
    const fareCalendarRequest = getFareCalendarV2Request();
    getFareCalendarV2Mutation.mutate(fareCalendarRequest, {
      onSuccess(data, variables, context) {
        setFareData(data.data.response);
      },
      onError(error, variables, context) {},
    });
  };

  useEffect(getFareCalendar, [formData.origin, formData.destination]);

  useEffect(() => {
    dispatch({
      type: FlightSearchFormReducerActionTypes.SET_LAST_SEARCH,
      payload: initialFormData,
    });
  }, [initialFormData]);

  const setTripType = (tripType: string) => {
    dispatch({
      type: FlightSearchFormReducerActionTypes.SET_TRIP_TYPE,
      payload: tripType,
    });
    if (tripType === 'oneway') {
      setErrors(prevState => ({
        ...prevState,
        returnDate: '',
      }));
    }
  };
  const setOrigin = (data: any) =>
    dispatch({
      type: FlightSearchFormReducerActionTypes.SET_ORIGIN,
      payload: data,
    });

  const setDestination = (data: any) => {
    dispatch({
      type: FlightSearchFormReducerActionTypes.SET_DESTINATION,
      payload: data,
    });
    if (formData.origin !== data) {
      setErrors(prevState => ({
        ...prevState,
        destination: '',
      }));
    }
  };
  const setOnwardDate = (data: any) => {
    dispatch({
      type: FlightSearchFormReducerActionTypes.SET_ONWARD_DATE,
      payload: data,
    });
  };
  const setReturnDate = (data: any) => {
    dispatch({
      type: FlightSearchFormReducerActionTypes.SET_RETURN_DATE,
      payload: data,
    });
    setErrors(prevState => ({
      ...prevState,
      returnDate: '',
    }));
  };

  const setTravelerData = (data: any) =>
    dispatch({
      type: FlightSearchFormReducerActionTypes.SET_TRAVELER_DATA,
      payload: data,
    });

  const toggleOriginDest = () => dispatch({ type: FlightSearchFormReducerActionTypes.TOGGLE_TO_FROM });
  const toggleArmedForces = () => {
    dispatch({ type: FlightSearchFormReducerActionTypes.TOGGLE_IS_DEFENCE });
    setFaujiFamily(false);
  };
  const toggleFaujiFamily = () => {
    setFaujiFamily(!isFaujiFamily);
    if (formData.isDefence) {
      dispatch({ type: FlightSearchFormReducerActionTypes.TOGGLE_IS_DEFENCE });
    }
  };

  const toggleFaujiFamilyAndArmedForces = () => {};

  const isTripTypeActive = (tripType: string) => (tripType === formData.tripType ? styles.active : '');

  const initialDepartDate = new Date(formData.departDate.year, formData.departDate.month, formData.departDate.day);

  const returnDate = formData.returnDate
    ? new Date(formData.returnDate.year, formData.returnDate.month, formData.returnDate.day)
    : undefined;
  const today = new Date();

  const validateSearchResultForm = () => {
    const formErrors: any = {};
    if (!formData.origin) {
      formErrors.origin = 'Origin is required';
    }

    if (!formData.destination) {
      formErrors.destination = 'Destination is required';
    }

    if (formData.origin === formData.destination) {
      formErrors.destination = 'From & To cannot be same';
    }

    if (!formData.departDate) {
      formErrors.departDate = 'Departure date is required';
    }

    if (formData?.tripType === 'roundtrip' && formData.returnDate === undefined) {
      formErrors.returnDate = 'Return date is required';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const storeRecentSearchesInLocalStorage = (recentSearches: FlightSearchRequest) => {
    const storedRecentSearchArray: Array<FlightSearchRequest> =
      (retriveValueFromLocalStorage('udchalo-webstorage|recentsearches') as Array<FlightSearchRequest>) || [];
    const sameSearchDataIndex =
      storedRecentSearchArray &&
      storedRecentSearchArray?.findIndex(
        search => search?.origin === recentSearches?.origin && search?.destination === recentSearches?.destination
      );
    if (sameSearchDataIndex !== -1) {
      storedRecentSearchArray?.splice(sameSearchDataIndex, 1);
    }
    storedRecentSearchArray?.push(recentSearches);
    if (storedRecentSearchArray.length > 5) {
      storedRecentSearchArray?.splice(0, storedRecentSearchArray.length - 5);
    }
    setToLocalStorage('recentsearches', storedRecentSearchArray);
  };

  const searchFlights = () => {
    setIsSearching(true);
    if (validateSearchResultForm()) {
      const { departDate, returnDate, isDefence } = formData;
      const newDepartDate = { ...departDate, month: departDate.month + 1 };
      const newReturnDate = returnDate ? { ...returnDate, month: returnDate.month + 1 } : returnDate;
      const serviceNumber = isDefence ? '12345' : null;
      const payload = { ...formData, departDate: newDepartDate, returnDate: newReturnDate, serviceNumber };

      searchInitMutation.mutate(payload as any, {
        onSuccess: (response, variables, context) => {
          setIsSearching(false);
          onSearch(response.data);
        },
        onError(error, variables, context) {},
      });
      storeRecentSearchesInLocalStorage(formData);
    } else {
      setIsSearching(false);
    }
  };

  const recentSearchFlightSearch = (payload: FlightSearchRequest) => {
    dispatch({
      type: FlightSearchFormReducerActionTypes.SET_LAST_SEARCH,
      payload,
    });
  };

  const recentSearchesRender = () => {
    if (recentSearchData) {
      const searchesToRender: Array<FlightSearchRequest> = recentSearchData.slice(0, -1);
      const lastTwoSearches = searchesToRender.length > 2 ? searchesToRender.slice(-2) : searchesToRender;
      return (
        <div className={styles.recent_search_section_cards}>
          {lastTwoSearches &&
            lastTwoSearches.map((search: FlightSearchRequest, index) => {
              // const originCity = airportList[search.origin] ? search.origin : null;
              // const destinationCity: any = airportList[search.destination] ? search.destination : null;
              const originCity = airportList[search.origin] ? airportList[search.origin].city : null;
              const destinationCity = airportList[search.destination] ? airportList[search.destination].city : null;
              const { year, month, day } = search.departDate;
              const departDate = new Date(year, month, day);
              const departDateString = departDate.toLocaleDateString('en-US', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              });
              const formattedDate = format(departDate, 'E, dd MMM yyyy');

              return (
                <div
                  key={`searchesToRender-${index}`}
                  className={styles.card}
                  onClick={() => recentSearchFlightSearch(search)}>
                  <div className={styles.route_text}>
                    {originCity} → {destinationCity}
                  </div>
                  <div className={styles.route_date_info}>
                    <GreyCalendarIcon alt="calendar" className={styles.calendar_icon} />
                    <span className={styles.route_date}>{formattedDate}</span>
                  </div>
                </div>
              );
            })}
        </div>
      );
    }
    return null;
  };

  const infoToolTipForFaujiFamily = () => (
    <div>
      <div className={styles.tool_tip_container_msite}>
        <ClickAwayListener onClickAway={() => handleTooltipClose('faujiFamily')}>
          <div>
            <InfoToolTip
              title="Select this option if you are a serving or a retired Fauji, or if you are a Dependent with a valid Dependent Identity Card."
              placement="bottom-start"
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => handleTooltipClose('faujiFamily')}
              open={openToolTip.faujiFamily}
              disableFocusListener
              disableHoverListener
              disableTouchListener>
              <div
                role="button"
                tabIndex={0}
                aria-label="Open Fauji Family tooltip"
                onClick={() => handleTooltipOpen('faujiFamily')}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleTooltipOpen('faujiFamily');
                  }
                }}>
                <InfoIcon className={styles.info_icon} />
              </div>
            </InfoToolTip>
          </div>
        </ClickAwayListener>
      </div>
      <div className={styles.tool_tip_container}>
        <InfoToolTip
          title="Select this option if you are a serving or a retired Fauji, or if you are a Dependent with a valid Dependent Identity Card."
          placement="bottom-start">
          <div>
            <InfoIcon className={styles.info_icon} />
          </div>
        </InfoToolTip>
      </div>
    </div>
  );

  const infoToolTipForArmedForces = () => (
    <div>
      <div className={styles.tool_tip_container_msite}>
        <ClickAwayListener onClickAway={() => handleTooltipClose('armedForce')}>
          <div>
            <InfoToolTip
              title="Select this option if you are a serving or a retired Fauji, or if you are a Dependent with a valid Dependent Identity Card."
              placement="bottom-start"
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => handleTooltipClose('armedForce')}
              open={openToolTip.armedForce}
              disableFocusListener
              disableHoverListener
              disableTouchListener>
              <div
                role="button"
                tabIndex={0}
                aria-label="Open armed force tooltip"
                onClick={() => handleTooltipOpen('armedForce')}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleTooltipOpen('armedForce');
                  }
                }}>
                <InfoIcon className={styles.info_icon} />
              </div>
            </InfoToolTip>
          </div>
        </ClickAwayListener>
      </div>
      <div className={styles.tool_tip_container}>
        <InfoToolTip
          title="Select this option if you are a serving or a retired Fauji, or if you are a Dependent with a valid Dependent Identity Card."
          placement="bottom-start">
          <div>
            <InfoIcon className={styles.info_icon} />
          </div>
        </InfoToolTip>
      </div>
    </div>
  );

  const initialValuesForDatePickerMsite = { departureDate: initialDepartDate, returnDate: returnDate };
  const errorMessagesforDatePickerMsite = { departDate: errors.departDate, returnDate: errors.returnDate };

  const searchButtonCss =
    recentSearchData && recentSearchData.length > 1
      ? styles.search_flight_btn
      : `${styles.search_flight_btn} ${styles.search_flight_btn_wo_recent_search}`;

  return (
    <div className={`${styles.flight_search_form_container} ${showSearchInline ? styles.inline_search : ''}`}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab_item} ${isTripTypeActive(TRIP_TYPES.ONE_WAY)}`}
          onClick={() => setTripType('oneway')}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              setTripType('oneway');
            }
          }}
          role="button"
          tabIndex={0}>
          One Way
        </div>
        <div
          className={`${styles.tab_item} ${isTripTypeActive(TRIP_TYPES.ROUND_WAY)}`}
          onClick={() => setTripType('roundtrip')}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              setTripType('roundtrip');
            }
          }}
          role="button"
          tabIndex={0}>
          Round Trip
        </div>
      </div>

      <div className={styles.flight_search_form}>
        <div className={styles.row_one}>
          <div className={styles.locations}>
            <CitySearch
              cityCode={formData.origin}
              fieldLabel="Origin"
              placeholder="From"
              airportList={airportListVar}
              onCitySelect={setOrigin}
              errorMessage={errors.origin}
            />
            <div className={styles.swap_icon}>
              <DestinationReplace onClick={toggleOriginDest} />
            </div>
            <CitySearch
              cityCode={formData.destination}
              fieldLabel="Destination"
              placeholder="To"
              airportList={airportListVar}
              onCitySelect={setDestination}
              errorMessage={errors.destination}
            />
          </div>
          <div className={styles.locations_msite}>
            <CitySearchMsite
              cityCode={formData.origin}
              fieldLabel="Origin"
              placeholder="From"
              airportList={airportListVar}
              onCitySelect={setOrigin}
              errorMessage={errors.origin}
              recentSearches={recentSearchData}
              popularSearches={popularAirports && popularAirports}
            />
            <div className={styles.swap_icon}>
              <DestinationReplace onClick={toggleOriginDest} />
            </div>
            <CitySearchMsite
              cityCode={formData.destination}
              fieldLabel="Destination"
              placeholder="To"
              airportList={airportListVar}
              onCitySelect={setDestination}
              errorMessage={errors.destination}
              recentSearches={recentSearchData}
              popularSearches={popularAirports && popularAirports}
            />
          </div>

          <div className={styles.travel_dates}>
            <FlightsDatePicker
              label="Departure"
              placeholder=""
              minDate={today}
              initialValue={initialDepartDate}
              fareData={fareData}
              onDateSelect={setOnwardDate}
              errorMessage={errors.departDate}
            />
            <FlightsDatePicker
              label=""
              placeholder="+ Add Return"
              minDate={initialDepartDate}
              initialValue={returnDate}
              onDateSelect={setReturnDate}
              errorMessage={errors.returnDate}
            />
          </div>
          <div className={styles.travel_dates_msite}>
            <DatePickerMsite
              labelForDeparture="Departure"
              placeholderForDeparture=""
              labelForReturn=""
              placeholderForReturn="+ Add Return Date"
              minDate={today}
              initialValue={initialValuesForDatePickerMsite}
              fareData={fareData}
              onwardDateSelect={setOnwardDate}
              returnDateSelect={setReturnDate}
              errorMessage={errorMessagesforDatePickerMsite}
              tripType={formData.tripType}
              setRoundTrip={() => setTripType('roundtrip')}
            />
          </div>

          <div className={styles.travellers}>
            <div className={styles.traveller_select_web}>
              <TravelerSelect
                cabinTypes={cabinTypes}
                initialValue={{
                  adults: formData?.adults,
                  cabin: formData?.cabin,
                  children: formData?.children,
                  infants: formData?.infants,
                }}
                onTravelerInfoUpdate={setTravelerData}
              />
            </div>
            <div className={styles.traveller_select_msite}>
              <TravelerSelectMsite
                cabinTypes={cabinTypes}
                initialValue={{
                  adults: formData?.adults,
                  cabin: formData?.cabin,
                  children: formData?.children,
                  infants: formData?.infants,
                }}
                onTravelerInfoUpdate={setTravelerData}
              />
            </div>
          </div>
          {showSearchInline && (
            <div className={styles.inline_form_cta}>
              <button type="button" className={styles.search_flight_btn} onClick={searchFlights} disabled={isSearching}>
                {isSearching ? `Searching...` : `Search Flight`}
              </button>
            </div>
          )}
        </div>

        <div className={styles.row_two}>
          <div className={styles.toggle_btns}>
            <div className={styles.af_btn}>
              <button
                type="button"
                className={`${formData.isDefence ? styles.active : ''}`}
                onClick={toggleArmedForces}>
                Armed Forces
              </button>
              {infoToolTipForArmedForces()}
            </div>
            <div className={styles.ff_btn}>
              <button type="button" className={`${isFaujiFamily ? styles.active : ''}`} onClick={toggleFaujiFamily}>
                <FaujiFamilyIcon />
                Fauji Family
              </button>
              {infoToolTipForFaujiFamily()}
            </div>
          </div>
          <div className={styles.form_cta}>
            <button type="button" className={searchButtonCss} onClick={searchFlights} disabled={isSearching}>
              {isSearching ? `Searching...` : `Search Flight`}
            </button>
          </div>
          {recentSearchData?.length > 1 && (
            <div className={styles.recent_search_section}>
              <div className={styles.recent_search_section_text}>Recent Searches:</div>
              {recentSearchesRender()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlightSearchForm;
