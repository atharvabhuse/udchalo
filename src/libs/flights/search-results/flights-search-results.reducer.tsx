import { FareCalendarV2Response, FlightSearchQuery } from '@uc/services/network';
import { countBy, groupBy, orderBy, sortBy } from 'lodash-es';
import { format, parse } from 'date-fns';
import { AfternoonIcon, EveningIcon, MorningIcon, NightIcon } from '@uc/libs/shared/ui';
import {
  FlightSearchFilters,
  FlightSearchResultState,
  MultiSelectFilterConfig,
  MultiSelectOption,
  SliderFilterConfig,
  SortMenuConfig,
} from './models';

export interface FlightSearchResultsReducerAction {
  type: FlightSearchResultsReducerActionTypes;
  payload?: any;
}

export enum FlightSearchResultsReducerActionTypes {
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
  SET_SEARCH_RESULT = 'SET_SEARCH_RESULT',
  SET_FARE_DATA = 'SET_FARE_DATA',
  SET_FILTER = 'SET_FILTER',
  SET_SORT = 'SET_SORT',
  RESET_FILTER = 'RESET_FILTER',
}

export function flightsSearchResultsReducer(
  state: FlightSearchResultState,
  action: FlightSearchResultsReducerAction
): FlightSearchResultState {
  const sort: Array<SortMenuConfig> = [
    { heading: 'Prices', options: [{ label: 'Cheapest', selected: true }] },
    { heading: 'Duration', options: [{ label: 'Shortest', selected: false }] },
    {
      heading: 'Excess Baggage',
      options: [{ label: 'Maximum check-in baggage', selected: false }],
    },
    {
      heading: 'Depart Time',
      options: [
        { label: 'Earliest', selected: false },
        { label: 'Late', selected: false },
      ],
    },
    {
      heading: 'Arrival Time',
      options: [
        { label: 'Earliest', selected: false },
        { label: 'Late', selected: false },
      ],
    },
  ];

  const setSearchQuery = (searchQuery: FlightSearchQuery) => ({ ...state, searchQuery });

  const computeDurationAndFastest = (
    searchResult: any
  ): { tripDuration: SliderFilterConfig; fastestFlightId: string } => {
    let min;
    let max;
    let value = 0;
    let fastestFlightId = '';
    if (searchResult?.length) {
      const ascDurationArray = orderBy(searchResult, ['duration']);
      fastestFlightId = ascDurationArray[0].brandedFlights[0].flightId;
      min = ascDurationArray[0].duration;
      max = ascDurationArray[ascDurationArray.length - 1].duration;
      value = max;
    }

    const tripDuration: SliderFilterConfig = {
      enabled: true,
      label: 'Trip Duration',
      min,
      max,
      value,
    };
    return { tripDuration, fastestFlightId };
  };

  const computeStopsFilter = (searchResult: any): { stops: MultiSelectFilterConfig; stopsMap: any } => {
    const stopsMap = searchResult ? groupBy(searchResult, 'stops') : { 0: [], 1: [] };
    const stopsList: MultiSelectOption[] = [];
    const nonStopLabel = `Non-Stop (${stopsMap[0]?.length || 0} Flights)`;
    stopsList.push({ label: nonStopLabel, value: 0, selected: false });
    const oneStopLabel = `1 Stop (${stopsMap[1]?.length || 0} Flights)`;
    stopsList.push({ label: oneStopLabel, value: 1, selected: false });
    const allLabel = `All Flights (${searchResult?.length || 0} Flights)`;
    stopsList.push({ label: allLabel, value: -1, selected: false });

    return {
      stops: { enabled: true, label: 'Stops', options: stopsList },
      stopsMap,
    };
  };

  const computePrefAirlinesFilter = (
    searchResult: any
  ): { preferredAirlines: MultiSelectFilterConfig; airlineMap: any } => {
    const options: MultiSelectOption[] = [];
    let airlineMap = {};
    if (searchResult?.length) {
      airlineMap = groupBy(searchResult, 'airline');
      const airlinesCount = countBy(searchResult, 'airline');
      const airlinesMap = new Map(Object.entries(airlinesCount));
      const sortedAirlineMap = new Map([...airlinesMap.entries()].sort((a: any, b: any) => b[1] - a[1]));

      [...sortedAirlineMap].forEach((value: any, index: number) => {
        if (index < 3) {
          const [airline, count] = value;
          options.push({
            label: `${airline} (${count} Flights)`,
            value: airline,
            selected: false,
            iconUrl: `https://static.udchalo.com/client_assets/img/airline_logo/${airline}.png`,
          });
        }
      });
    }

    options.push({
      label: 'All of the above',
      value: -1,
      selected: false,
      iconUrl: '',
    });

    return {
      preferredAirlines: {
        enabled: true,
        label: 'Preferred Airlines',
        options,
      },
      airlineMap,
    };
  };

  const createDepartureFilter = (): MultiSelectFilterConfig => {
    const options = [];
    options.push({
      label: '12AM - 6AM',
      value: '0-6',
      icon: 'early_morning',
      selected: false,
      iconSVG: NightIcon,
    });
    options.push({
      label: '6AM - 12PM',
      value: '6-12',
      icon: 'morning',
      selected: false,
      iconSVG: EveningIcon,
    });
    options.push({
      label: '12PM - 6PM',
      value: '12-18',
      icon: 'evening',
      selected: false,
      iconSVG: AfternoonIcon,
    });
    options.push({
      label: '6PM - 12AM',
      value: '18-0',
      icon: 'night',
      selected: false,
      iconSVG: MorningIcon,
    });
    return { enabled: true, label: 'Departure', options };
  };

  const computePriceAndCheapest = (
    searchResult: any
  ): { price: SliderFilterConfig; cheapestDefenceFlightId: string; cheapestRegularFlightId: string } => {
    const ascPriceArray = orderBy(searchResult, ['brandedFlights[0].fare.totalFare']);
    let min;
    let max;
    let value = 0;
    let cheapestDefenceFlightId = '';
    let cheapestRegularFlightId = '';
    if (searchResult?.length) {
      cheapestDefenceFlightId = ascPriceArray[0].brandedFlights[0].flightId;
      min = ascPriceArray[0].brandedFlights[0].fare.totalFare;
      max = ascPriceArray[ascPriceArray.length - 1].brandedFlights[0].fare.totalFare;
      value = max;
      cheapestRegularFlightId = ascPriceArray?.find(data => data?.brandedFlights?.[0]?.isDefence === false)
        ?.brandedFlights?.[0]?.flightId;
    }
    const price: SliderFilterConfig = {
      enabled: true,
      label: 'Price',
      min,
      max,
      value,
    };
    return { price, cheapestDefenceFlightId, cheapestRegularFlightId };
  };

  const computeFilters = (searchResult: any) => {
    const { price, cheapestDefenceFlightId, cheapestRegularFlightId } = computePriceAndCheapest(searchResult);
    const { tripDuration, fastestFlightId } = computeDurationAndFastest(searchResult);
    const { stops, stopsMap } = computeStopsFilter(searchResult);
    const { preferredAirlines, airlineMap } = computePrefAirlinesFilter(searchResult);
    const departure = createDepartureFilter();
    return {
      price,
      stops,
      baggage: {
        enabled: true,
        label: 'Excess Baggae',
        options: [{ label: 'Maximum check-in baggage', value: 'max', selected: false }],
      },
      departure,
      preferredAirlines,
      tripDuration,
      fastestFlightId,
      cheapestDefenceFlightId,
      cheapestRegularFlightId,
      filteredResults: { stopsMap, airlineMap },
    };
  };

  const getDefenceFlightCount = (flightList: Array<any>) => {
    let count = 0;
    if (flightList?.length > 0) {
      flightList.forEach(fl => {
        count += fl.brandedFlights[0].isDefence ? 1 : 0;
      });
    }
    return count;
  };

  const applySort = (sortArg: Array<SortMenuConfig>, flightsList: Array<any>) => {
    let currentSort = '';
    sortArg.every(section => {
      const selectedOption = section.options.find(option => option.selected === true);
      currentSort = `${section.heading}_${selectedOption?.label}`;
      return !selectedOption;
    });

    let sortedFlightsList = [];
    switch (currentSort) {
      case 'Prices_Cheapest':
        sortedFlightsList = orderBy(flightsList, ['brandedFlights[0].fare.totalFare']);
        break;
      case 'Duration_Shortest':
        sortedFlightsList = orderBy(flightsList, ['duration']);
        break;
      case 'Excess Baggage_Maximum check-in baggage':
        sortedFlightsList = orderBy(flightsList, ['brandedFlights[0].checkInBaggage']);
        break;
      case 'Depart Time_Earliest':
        sortedFlightsList = orderBy(flightsList, ['departDate'], ['asc']);
        break;
      case 'Depart Time_Late':
        sortedFlightsList = orderBy(flightsList, ['departDate'], ['desc']);
        break;
      case 'Arrival Time_Earliest':
        sortedFlightsList = orderBy(flightsList, ['arriveDate'], ['asc']);
        break;
      case 'Arrival Time_Late':
        sortedFlightsList = orderBy(flightsList, ['arriveDate'], ['desc']);
        break;
      default:
        break;
    }
    return sortedFlightsList;
  };

  const setSearchResult = (searchResultResp: any) => {
    const searchResult = searchResultResp?.onwardLegs || searchResultResp;
    const onwardLegs = searchResult;
    const returnLegs = searchResult?.returnLegs;
    const { cheapestDefenceFlightId, cheapestRegularFlightId, fastestFlightId, filteredResults, ...filters } =
      computeFilters(onwardLegs);
    const defenceFlightsCount = getDefenceFlightCount(onwardLegs);
    const onwardFlightsList = applySort(sort, onwardLegs);
    const returnFlightsList = applySort(sort, returnLegs);
    return {
      ...state,
      searchResult,
      onwardFlightsList,
      returnFlightsList,
      defenceFlightsCount,
      filteredResults,
      filters,
      cheapestDefenceFlightId,
      cheapestRegularFlightId,
      fastestFlightId,
      sort,
    };
  };

  const createFareCarousalData = (fareData: any) => {
    const fareCarouselData: any[] = [];
    Object.values(fareData).forEach((month: any) => {
      Object.keys(month).forEach((key: string) => {
        const date = parse(key, 'dd-MM-y', new Date());
        const fareItem = {
          dateTime: date.getTime(),
          formattedDateString: format(date, 'dd MMM, E'),
          dateString: key,
          ...month[key],
        };
        fareCarouselData.push(fareItem);
      });
    });
    return sortBy(fareCarouselData, ['dateTime']);
  };

  const setFareData = (fareData: FareCalendarV2Response) => {
    const fareCarouselData = createFareCarousalData(fareData);
    return { ...state, fareData, fareCarouselData };
  };

  const getSelectedValues = (collection: MultiSelectOption[]) =>
    collection
      .filter(o => o.selected)
      .map(o => o.value)
      .sort();

  const filterByDepartureTime = (departTimeString: string, deparuteFilter: MultiSelectOption[]) => {
    let inFilter = false;
    const hours = new Date(departTimeString).getHours();
    // 12AM-6AM
    if (deparuteFilter[0].selected && hours < 6) {
      inFilter = true;
    }
    // 6AM-12PM
    if (deparuteFilter[1].selected && hours >= 6 && hours < 12) {
      inFilter = true;
    }
    // 12PM-6PM
    if (deparuteFilter[2].selected && hours >= 12 && hours < 18) {
      inFilter = true;
    }
    // 6PM-12AM
    if (deparuteFilter[3].selected && hours >= 18 && hours < 24) {
      inFilter = true;
    }
    return inFilter;
  };

  const applyFilters = (selectedFilters: FlightSearchFilters) => {
    const { searchResult, onwardFlightsList: flightsList } = state;
    const { price, stops, baggage, departure, preferredAirlines, tripDuration } = selectedFilters;

    let result = flightsList;
    if (selectedFilters && searchResult) {
      // -1 indicates all stops filter
      const stopsArray = getSelectedValues(stops.options);
      const isAllStops = stopsArray.length ? stopsArray.find(val => val === -1) : true;

      // -1 indicates all airlines filter
      const airlinesArray = getSelectedValues(preferredAirlines.options);
      const isAllAirlines = airlinesArray.length ? airlinesArray.find(val => val === -1) : true;

      const departureArray = getSelectedValues(departure.options);
      const selectedDeparturesCount = departureArray.length;
      const isAllDepartures = !!(selectedDeparturesCount === 0 || selectedDeparturesCount === 4);

      result = searchResult?.filter((o: any) => {
        const inPriceFilter = o.brandedFlights[0].fare.totalFare <= price?.value;
        const inDurationFilter = o.duration <= tripDuration?.value;
        const inStopsFilter = isAllStops ? true : stopsArray.filter(stop => o.stops === stop).length > 0;
        const inAirlinesFilter = isAllAirlines
          ? true
          : airlinesArray.filter(airline => o.airline === airline).length > 0;
        const inDepartFilter = isAllDepartures ? true : filterByDepartureTime(o.departDate, departure.options);
        return inPriceFilter && inDurationFilter && inStopsFilter && inDepartFilter && inAirlinesFilter;
      });
    }
    return result;
  };

  const setFilters = (filters: FlightSearchFilters) => {
    const flightsList = applyFilters(filters);
    const defenceFlightsCount = getDefenceFlightCount(flightsList);
    return { ...state, filters, onwardFlightsList: flightsList, defenceFlightsCount };
  };

  const resetFilters = () => {
    const { filters } = state;
    if (filters) {
      filters.price.value = filters.price.max;
      filters.tripDuration.value = filters.tripDuration.max;
      filters.stops.options.forEach(o => {
        o.selected = false;
      });

      filters.departure.options.forEach(o => {
        o.selected = false;
      });

      filters.preferredAirlines.options.forEach(o => {
        o.selected = false;
      });
      return setFilters(filters);
    }
    return { ...state };
  };

  const setSort = (sortArg: Array<SortMenuConfig>) => {
    const { onwardFlightsList: flightsList } = state;
    const sortedFlightsList = applySort(sortArg, flightsList);
    return { ...state, onwardFlightsList: sortedFlightsList, sortArg };
  };

  let newState;

  switch (action.type) {
    case FlightSearchResultsReducerActionTypes.SET_SEARCH_QUERY:
      newState = setSearchQuery(action.payload);
      break;
    case FlightSearchResultsReducerActionTypes.SET_SEARCH_RESULT:
      newState = setSearchResult(action.payload);
      break;
    case FlightSearchResultsReducerActionTypes.SET_FARE_DATA:
      newState = setFareData(action.payload);
      break;
    case FlightSearchResultsReducerActionTypes.SET_FILTER:
      newState = setFilters(action.payload);
      break;
    case FlightSearchResultsReducerActionTypes.SET_SORT:
      newState = setSort(action.payload);
      break;
    case FlightSearchResultsReducerActionTypes.RESET_FILTER:
      newState = resetFilters();
      break;
    default:
      break;
  }

  return newState;
}

export default flightsSearchResultsReducer;
