import { FareCalendarV2Response, FlightSearchQuery, FlightSearchRequest } from '@uc/services/network';

export interface FilterConfig {
  enabled: boolean;
  label: string;
}

export interface SliderFilterConfig extends FilterConfig {
  min: number;
  max: number;
  value: number;
}

export interface MultiSelectOption {
  label: string;
  iconUrl?: string;
  value: any;
  selected: boolean;
}

export interface MultiSelectFilterConfig extends FilterConfig {
  options: Array<MultiSelectOption>;
}

export interface SingleSelectFilterConfig extends FilterConfig {
  options: Array<MultiSelectOption>;
}

export interface FlightSearchFilters {
  price: SliderFilterConfig;
  stops: MultiSelectFilterConfig;
  baggage: SingleSelectFilterConfig;
  departure: MultiSelectFilterConfig;
  preferredAirlines: MultiSelectFilterConfig;
  tripDuration: SliderFilterConfig;
}

export interface SortMenuConfig {
  heading: string;
  options: Array<{
    label: string;
    selected: boolean;
  }>;
}

export interface ResultObj {
  airline: string;
  arriveDate: string;
  arriveOffset: number;
  departDate: string;
  departOffset: number;
  brandedFlights: any;
  destination: string;
  duration: number;
  isLCC: boolean;
  mode: string;
  origin: string;
  stops: number;
  vouchers: Array<{ discountAmount: string }>;
}

export interface AirlinesObj {
  [key: string]: number;
}

export interface FilterObj {
  [key: string]: Array<[number | string]>;
}

export interface FlightSearchResultState {
  searchQuery: FlightSearchQuery;
  searchResult?: any;
  fareData?: FareCalendarV2Response;
  fareCarouselData?: any;
  sort?: any;
  filters?: FlightSearchFilters;
  fastestFlightId?: string;
  cheapestDefenceFlightId?: string;
  cheapestRegularFlightId?: string;
  onwardFlightsList?: any;
  returnFlightsList?: any;
  defenceFlightsCount?: number;
  filteredResults: {
    stopsMap?: any;
    airlineMap?: any;
  };
}
