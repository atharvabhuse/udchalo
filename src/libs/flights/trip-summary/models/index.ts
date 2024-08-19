export interface FlightTripSummaryState {
  adults: number;
  children: number;
  infants: number;
  onwardFlightId: string;
  returnFlightId: string;
  segments: Array<any>;
  passengers: Array<any>;
  savedTravellers?: Array<any>;
  contactDetails?: any;
  isGstSelected: boolean;
  gstDetails?: any;
  isLtcSelected: boolean;
  ltcDetails?: any;
  bookingDetails?: any;
  extras: {
    currentStep: number;
    currentSegmentIndex: number;
    currentSegment: any;
    currentTravellerIndex?: any;
  };
  additionalFlightDetails?: any;
  flightDetails?: any;
  currentFlightId: string;
  currentFormStep: number;

  coupon?: any;
  bankOfferMethod?: string;
  isSurakshaOpted?: boolean;
  isInsuranceOpted?: boolean;
  isRefundProtectionOpted?: boolean;
  refundProtectionOnAddOns?: boolean;
  isDonationOpted?: boolean;
}
