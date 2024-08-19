import { IMealOption } from '@uc/libs/flights/shared/ui';

export interface TravelDate {
  day: number;
  month: number;
  year: number;
}

export interface NotificationQueueType {
  info: string;
  variant: Variant;
  autoHideDuration: number;
}

export type Variant = 'default' | 'error' | 'success' | 'warning' | 'info';

export interface NotificationContextType {
  information: NotificationQueueType[];
  setInformation: React.Dispatch<React.SetStateAction<NotificationQueueType[]>>;
  sendNotification: (info: NotificationQueueType) => void;
}

export interface FlightSearchRequest {
  tripType: string;
  origin: string;
  destination: string;
  originCountryCode: string;
  destinationCountryCode: string;
  adults: number;
  children: number;
  infants: number;
  cabin: string;
  isDefence: boolean;
  userCategory: string;
  referrer: string;
  serviceNumber: string;
  departDate: TravelDate;
  returnDate?: TravelDate;
}

export interface FlightSearchInitResponse {
  success: boolean;
  response: {
    sessionId: string;
    suppliers: Array<{
      status: string;
      remainingSuppliers: number;
      errorSuppliers: number;
    }>;
  };
  sessionId: string;
  message: string;
}

export interface FlightSearchQuery {
  success: boolean;
  response: {
    sessionId: string;
    sharedUrl: boolean;
    status: string;
    search: {
      adults: number;
      cabin: string;
      children: number;
      createdAt: string;
      departDate: string;
      destination: string;
      destinationCountryCode: string;
      endUserIp: string;
      expirationTime: number;
      infants: number;
      isCovidBooking: false;
      isDefence: false;
      isEnabled: 1;
      isLTCClaim: false;
      origin: string;
      originCountryCode: string;
      sessionId: string;
      source: string;
      tripType: string;
      userVerificationStatus: string;
      isLoggedIn: boolean;
      returnDate: string;
      oldBookingId?: string;
      oldFlightId?: string;
    };
  };
  sessionId: string;
  message: string;
}

export interface FareCalendarRequest {
  Origin: string;
  Destination: string;
  DateOfJourney: string;
  DaysBefore: number;
  DaysAfter: number;
  IsDefense: boolean;
  SearchId: string;
  Cabin: string;
}

export interface FareCalendarV2Request {
  isDefenceSearch: boolean;
  userType: string;
  selectedMonth: string;
  selectedYear: string;
  sessionId: string;
  keyData: {
    origin: string;
    destination: string;
    cabin: string;
  };
}

export interface PostCouponList {}
export interface FareCalendarV2Response {
  [key: string]: {
    amount: string;
    color: string;
  };
}

export interface UserLoginRequest {
  field: string;
  isNewVersion: boolean;
}

export interface GetAllBookingsRequest {
  startKey: string | null;
  isNewVersion2: boolean;
}

export interface UserLoginResponse {
  success: boolean;
  isNewVersion: boolean;
  response: UserLoginResponseType;
  userId: string;
  message: string;
}

export interface UserLoginResponseType {
  showCaptcha: boolean;
}

export interface LoginViaOtpRequest {
  field: string;
  otp: string;
  recaptcha: null;
  isNewVersion: boolean;
  referralCode: string;
}

export interface LoginViaOtpResponse {
  success: boolean;
  response: UserLoginResponseData;
  userId: string;
  message: string;
}

export interface UserLoginResponseData {
  udchaloId: string;
  userId: string;
}

export interface GetProfileV2Response {
  success: boolean;
  response: ProfileV2ResponseType;
  userId: string;
  message: string;
}

export interface GetBalanceResponse {
  success: boolean;
  response: BalanceResponseType;
  userId: string;
  message: string;
}

export interface GetTravellerCountResponse {
  success: boolean;
  response: TravellerCountResponseType;
  userId: string;
  message: string;
}

export interface TravellerCountResponseType {
  count: number;
}

export interface BalanceResponseType {
  balance: number;
  ledgers: Array<any>;
}

export interface ProfileV2ResponseType {
  bannerOptions: any;
  profileBanner: string;
  flightTimingOptions: Array<string>;
  flightTiming: string;
  hotelTypeOptions: Array<string>;
  hotelType: string;
  nationalityOptions: Array<string>;
  email: string;
  userId: string;
  userRoles: Array<any>;
  phoneNumber: string;
  name: NameType;
  dateOfBirth: string;
  account: AccountType;
  settings: SettingType;
  signupType: string;
  signupMonth: string;
  isEnabled: number;
  isDefence: false;
  serviceNumber: string;
  userCategory: string;
  upLoads: UploadType;
  currentReferredAmt: number;
  homeAirport: string;
  workLocation: string;
  favouriteAirport: string;
  crmProvider: string;
  createdAt: string;
  gender: string;
  notificationReadAt: string;
  isGuest: false;
  domainGroup: null;
  domainVerificationStatus: null;
  domainVerificationDate: null;
  isNonTechnicalDependent: null;
  faujiFamilyVerificationStatus: null;
  isFaujiFamily: false;
  mid: string;
  relation: string;
  relationToArmedForces: string;
  ntdFormContent: null;
}

export interface NameType {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface SettingType {
  pushNotificationsActive: boolean;
  accountNotificationsActive: boolean;
  emailNewsLetterActive: boolean;
  whatsappNotificationsActive: boolean;
}
export interface UploadType {
  profilePicUrl: string;
}

export interface AccountType {
  verification: VerificationType;
}

export interface VerificationType {
  isPhoneVerified: boolean;
  isUserCategoryVerificationRequested: boolean;
  isEmailVerified: boolean;
  isUserCategoryVerified: boolean;
}

interface CreditsName {
  title: string;
  firstName: string;
  lastName: string;
}

interface CreditsCreatedBy {
  name: CreditsName;
  id: string;
}

export interface CreditsTransaction {
  amount: number;
  referenceId: string;
  referenceType: string;
  currentBalance: number;
  crDr: string;
  createdAt: string;
  createdBy: CreditsCreatedBy;
  transactionId: string;
  lastUpdatedBy: string;
  type: string;
}

export interface EarningCreditsData {
  transactions: CreditsTransaction[];
}

export interface EarningCreditsDataResponse {
  success: boolean;
  response: EarningCreditsData;
  message: string;
  userId: string;
}

export interface CoinRewardsTransaction {
  transactionId: string;
  service: string;
  bookingId: string;
  transactionDate: string;
  reward: number;
  expiry: string;
  isExpired: boolean;
  bookingAmount: number;
  crDr: string;
  remark: string;
  isUsed: boolean;
}

export interface EarningCoinRewardsData {
  userTransactions: CoinRewardsTransaction[];
  currentBalance: number;
  totalRewardEarned: number;
}

export interface EarningCoinRewardsDataResponse {
  success: boolean;
  response: EarningCoinRewardsData;
  message: string;
  errorCode: number;
}

export interface GetAllBookingsResponse {
  success: boolean;
  response: GetAllBookingsResponseTypes;
  userId: string;
  message: string;
}

export interface GetAllBookingsResponseTypes {
  data: Array<GetAllBookingsResponseType>;
}

export interface GetAllBookingsResponseType {
  collectionStatus: number;
  paymentProvider: string;
  isExclusive: boolean;
  status: string;
  brandName: string;
  contactDetails: ContactDetailsType;
  flightId: string;
  isIvyClubBooking: boolean;
  dateOfJourney: string;
  pnr: string;
  fare: FareType;
  segments: Array<SegmentsType>;
  loginDetails: LoginDetailsType;
  userId: string;
  freeReschedulingAllowed: boolean;
  arriveDate: string;
  isCabServiceOpted: number;
  ancillariesCancelPenalties: AncillariesCancelPenaltiesType;
  donationAmount: number;
  destination: string;
  isBalmerLawrie: boolean;
  isPostAncillaryPayment: boolean;
  destinationCityName: string;
  isEnabled: number;
  duration: number;
  createdMMYYYY: string;
  ltcDetails: any;
  origin: string;
  phoneNumber: string;
  isOfflineDiscount: boolean;
  isOfflineRescheduled: boolean;
  createdAt: string;
  source: string;
  isSeries: boolean;
  isCovidBooking: boolean;
  isRescheduledBooking: boolean;
  isDefence: boolean;
  handBaggage: number;
  supplierState: SupplierStateType;
  legId: string;
  paymentId: string;
  passengers: Array<PassengersType>;
  suraksha: SurakshaType;
  email: string;
  code: string;
  type: string;
  redemption: string;
  discount: DiscountCouponType;
  isLCC: string;
  destinationCountryCode: string;
  insurance: InsuranceType;
  error: ErrorTypes;
  airline: string;
  isSupplierSeries: boolean;
  freeMeal: boolean;
  checkInBaggage: 15;
  createdDate: string;
  departDate: string;
  isInsuranceOpted: boolean;
  isDonationOpted: boolean;
  originCountryCode: string;
  brand: BrandTypes;
  collectLater: boolean;
  createdFixedDate: string;
  isAllianceAir: boolean;
  isRefundable: boolean;
  cancelPenalties: Array<CancelPenaltiesTypes>;
  freeCancellationAllowed: false;
  rewardEarned: number;
  stops: number;
  bookingId: string;
  dateOfBooking: string;
  isSurakshaOpted: boolean;
  sessionId: string;
  sortKey: string;
  platform: string;
  updatedAt: string;
  isCovidCreditShellReschedule: boolean;
  freeSeatSelectionAllowed: boolean;
  benefits: Array<BenefitsType>;
  originCityName: string;
  rewardUsed: number;
}

export interface BenefitsType {
  bookingDateEnd: string;
  bookingDateStart: string;
  travelDateEnd: string;
  travelDateStart: string;
  type: string;
  value: string;
  key: string;
}

export interface CancelPenaltiesTypes {
  amount: number;
  hours: number;
  additionalGstPercent: number;
  udchaloCancellationFee: number;
  penaltyType: number;
}

export interface BrandTypes {
  category: string;
}

export interface InsuranceType {
  policies: Array<PoliciesType>;
  Policies: PoliciesTypes;
  message: string;
  status: string;
}

export interface ErrorTypes {
  errorMessage: string;
  errorCode: number;
}

export interface PoliciesType {
  uid: string;
  policyDetails: Array<PolicyDetailsType>;
}

export interface PolicyDetailsType {
  policy_number: string;
  policy_pdf: string;
  traveller_id: string;
  origin: string;
  policy_status: number;
  destination: string;
  error: string;
}

export interface PoliciesTypes {
  Policy: PolicyType;
}

export interface PolicyType {
  Status: boolean;
  PassengerCode: number;
  PolicyNumber: string;
}

export interface DiscountCouponType {
  description: string;
  amount: number;
  metadata: DiscountMetadata;
}

export interface DiscountMetadata {
  is_hidden: boolean;
  coupon_type: string;
}

export interface SurakshaType {
  totalCoverage: number;
  totalPremium: number;
  claimWindow: number;
  reasonId: number;
  status: string;
  fare: Array<FareTypes>;
}

export interface FareTypes {
  coverage: number;
  passengerId: string;
  passengerType: string;
  premium: number;
}

export interface PassengersType {
  serviceNumber: string;
  ancillaries: AncillariesType;
  passengerType: string;
  gender: string;
  name: NameType;
  passengerId: string;
  bookingStatus: string;
  dateOfBirth: string;
  travellerId: string;
  passportDetails: string;
  insuranceStatus: string;
  eticketNumber: string;
}

export interface AncillariesType {
  excessBaggage: ExcessBaggageType;
  passengerId: string;
  seats: Array<SeatsTypes>;
  meals: Array<MealsType>;
}

export interface SeatsTypes {
  isAvailable: boolean;
  column: number;
  isReclining: boolean;
  isExtraLegroom: boolean;
  isSeatPresent: boolean;
  seatNumber: string;
  price: number;
  name: string;
  seatSupplierState: SeatSupplierStateType;
  segmentIndex: number;
  seatId: number;
  row: number;
  isExitRow: boolean;
  seatLocation: number;
  isWing: boolean;
  status: string;
}

export interface MealsType {
  imgUrl: string;
  segmentIndex: number;
  code: string;
  text: string;
  price: number;
  status: string;
}

export interface SeatSupplierStateType {
  key: string;
}

export interface ExcessBaggageType {
  code: string;
  text: string;
  price: number;
  status: string;
}

export interface SupplierStateType {
  name: string;
}

export interface AncillariesCancelPenaltiesType {
  baggage: BaggageType;
  seatType: SeatsType;
  meals: MealType;
}
export interface BaggageType {
  baggageRefundHours: number;
  isBaggageRefundable: boolean;
}

export interface SeatsType {
  seatRefundHours: number;
  isSeatRefundable: boolean;
}

export interface MealType {
  mealRefundHours: number;
  isMealRefundable: boolean;
}

export interface LoginDetailsType {
  isLoggedIn: boolean;
  loginPage: string;
}

export interface SegmentsType {
  classOfService: string;
  arriveTerminal: string;
  aircraft: string;
  handBaggage: number;
  origin: string;
  checkInBaggage: number;
  arriveDate: string;
  destination: string;
  destinationCountryCode: string;
  cabin: string;
  departTerminal: string;
  flightNumber: number;
  layoverMinutes: number;
  duration: number;
  seatAvailable: number;
  layoverAirportCode: string;
  isInternational: boolean;
  originCountryCode: string;
  departDate: string;
  stops: number;
  airline: string;
  airlineName: string;
  handBaggageText: string;
  mileage: number;
}

export interface FareType {
  cmfDiscount: number;
  totalFare: number;
  totalInsuranceFare: number;
  airlineRescheduleFee: number;
  totalBaggageFare: number;
  priceDiff: number;
  fareCategory: string;
  totalSeatFare: number;
  baseTotalFare: number;
  totalTax: number;
  ancillariesRefundedAmount: number;
  totalFee: number;
  totalMealFare: number;
  totalAncillariesFare: number;
  totalConvenienceFee: number;
  passengerFares: Array<PassengerFaresType>;
  fareType: number;
  ancillaryFares: Array<AncillaryFaresType>;
  brand: BrandType;
  oldBookingFare: number;
}

export interface BrandType {
  name: string;
  qualifier: string;
}

export interface AncillaryFaresType {
  mealFares: Array<MealFaresType>;
  passengerId: string;
  seatFares: Array<SeatFaresType>;
  baggageFares: BaggageFaresType;
}

export interface SeatFaresType {
  isAvailable: boolean;
  column: number;
  isReclining: boolean;
  isExtraLegroom: boolean;
  isSeatPresent: boolean;
  seatNumber: string;
  price: number;
  name: string;
  seatSupplierState: SeatSupplierStateType;
  segmentIndex: number;
  seatId: number;
  row: number;
  isExitRow: boolean;
  seatLocation: number;
  isWing: boolean;
}

export interface BaggageFaresType {
  price: number;
  code: string;
  text: string;
}

export interface SeatSupplierStateVarType {
  key: string;
}

export interface MealFaresType {
  imgUrl: string;
  segmentIndex: number;
  code: string;
  text: string;
  price: number;
}

export interface PassengerFaresType {
  totalTax: number;
  insuranceFare: number;
  classOfService: string;
  fees: Array<FeesType>;
  baseFare: number;
  totalFare: number;
  quantity: number;
  passengerType: string;
  totalFee: number;
  fareBasisCode: string;
  taxes: Array<TaxesType>;
  totalConvenienceFee: number;
}

export interface TaxesType {
  amount: string;
  code: string;
}

export interface FeesType {
  amount: number;
  code: string;
}

export interface ContactDetailsType {
  name: NameTypes;
  email: string;
  phoneNumber: string;
}

export interface NameTypes {
  firstName: string;
  lastName: string;
}

export interface WebChekInResponse {
  success: boolean;
  response: Array<WebChekInResponseType>;
  message: string;
}

export interface WebChekInResponseType {
  code?: string;
  isSeatSelectionCompulsory?: boolean;
  isWebCheckInEnabled?: boolean;
  link?: string;
  name?: string;
}

export interface SignedUrlPayloadType {
  type: string;
  operation: string;
  fileName: string;
}

export interface IFlightHomePageDetailsResponse {
  data: {
    attributes: {
      FlightBookingBanner: IFlightLandingPageDetail[];
      TravelAdvisory: ITravelAdvisory;
      popularAirports: IPopularAirports[];
      whyBookUs: IWhyBookUs;
      domesticTopRoutes: ITopFlightRoute;
      internationalRoutes: ITopFlightRoute;
      createdAt: string;
      publishedAt: string;
      updatedAt: string;
    };
    id: number;
  };
  meta: any;
}
interface IFlightHomePageDetailsSection {
  id: number;
  title: string;
  isEnabled: boolean;
}
export interface ITravelAdvisory extends IFlightHomePageDetailsSection {
  TravelAdvisory: IFlightLandingPageDetail[] | null;
}

export interface ITopFlightRoute extends IFlightHomePageDetailsSection {
  topRoutes: IFlightRoute[] | null;
}

export interface IWhyBookUs extends IFlightHomePageDetailsSection {
  whyBookUs: IWhyBookWithUs[] | null;
}

interface IImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

interface IImageAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: IImageFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any; // You can replace `any` with a specific type if you know the structure.
  createdAt: string;
  updatedAt: string;
}

interface IImageData {
  id: number;
  attributes: IImageAttributes;
}

export interface IFlightLandingPageDetailsProp {
  id: number;
  title: string;
  description: string | null;
  descripton?: string | null;
  ctamobile: string | null;
  ctatext: string | null;
  isDomestic: boolean;
  isInternational: boolean;
}

export interface IFlightLandingPageDetail extends IFlightLandingPageDetailsProp {
  icon: {
    data: IImageData[];
  };
  bannerWeb?: {
    data: IImageData | null;
  };
}

export interface IPopularAirports {
  id: number;
  city: string;
  airport: string;
  cityCode: string;
}
export interface IWhyBookWithUs {
  id: number;
  icon: {
    data: IImageData;
  };
  name: string;
  description: string;
}

export interface IFlightRoute {
  id: number;
  source: string | null;
  soucecode: string | null;
  destination: string | null;
  destinationcode: string | null;
  sourceAirport: string | null;
  destinationAirport: string | null;
}

export interface IFlightBannerDetailsResponse {
  data: {
    attributes: {
      createdAt: string;
      publishedAt: string;
      updatedAt: string;
      HomePageFlight: IFlightBannerResponse[];
    };
    id: number;
  };
  meta: any;
}

export interface IFlightBannerResponse {
  id: number;
  name: string;
  cta: string | null;
  isDomestic: boolean;
  isInternational: boolean;
  position: string | null;
  banner_image: {
    data: IImageData[];
  };
  banner_image_web: {
    data: IImageData;
  };
}

export interface IHomePageDetailsResponse {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      BankOffers: IBankOffers;
      quickActions: IQuickActionResponse;
    };
  };
  meta: any;
}

export interface IBankOffers {
  id: number;
  filters: IBankOffersFilter[] | null;
  title?: string | null;
  isEnabled?: boolean;
  Bankoffercard: IBankOffersCard[];
}
export interface IBankOffersFilter {
  id: number;
  name: string | null;
}

export interface IBankOffersCard {
  id: number;
  title: string | null;
  description: string | null;
  couponcode: string | null;
  ctatext: string | null;
  cta: string | null;
  typeofoffer: string;
  interval: number;
  priority: number;
  device: IDevice;
  tnc: 'string';
  backgroundColour: string;
  logomobile: ILogoMobileAndDesktop;
  logodesktop: ILogoMobileAndDesktop;
  bankImage: {
    data: null;
  };
  BankImageMobile: {
    data: IImageData;
  };
}
interface IDevice {
  isIOSApp: boolean;
  isDesktop: boolean;
  isIOSMsite: boolean;
  isAndroidApp: boolean;
  isAndroidMsite: boolean;
}

interface ILogoMobileAndDesktop {
  data: IImageData[];
}

export interface IQuickActionResponse {
  id: number;
  filters: [] | null;
  title?: string | null;
  isEnabled?: boolean;
  quickActionBanner: IQuickAction[];
}

export interface IQuickAction {
  id: number;
  order: 1;
  actionName: string | null;
  badgeText: string | null;
  cta: string | null;
  device: IDevice;
  containerColor: string | null;
  iconContainerColor: string | null;
  ctaMobile: string | null;
  actionIcon_web: {
    data: IImageData;
  };
  actionIcon_mobile: {
    data: IImageData;
  };
}

export interface IPopularHolidaysDestinationResponse {
  success: boolean;
  response: IPopularHolidaysDestination[];
  message: string | null;
  errorCode: number;
}

export interface IPopularHolidaysDestination {
  packageId: number;
  title: string | null;
  duration: string | null;
  food: string | null;
  travel: string | null;
  amount: number;
  textAmount: string;
  category: string[];
  isEnabled: boolean;
  type: string;
  ispopular: boolean;
  cardImages: IPopularHolidayDestinationImage;
  carouselImages: IPopularHolidayDestinationImage;
  backgroundImages: IPopularHolidayDestinationImage;
}

interface IPopularHolidayDestinationImage {
  mobile: string[];
  desktop: string[];
}

export interface SearchQuery {
  message: string;
  response: any;
  sessionId: string;
  success: boolean;
}

export interface SearchFormServiceData {
  getAirports: any;
  getCabins: any;
}

export interface HomePageDetails {
  data: {
    attributes: any;
    id: number;
  };
  meta: any;
}

export interface ICouponListResponse {
  success: boolean;
  response: ICoupon[] | null;
  message: string;
}
export interface ICoupon {
  id?: number;
  code: string;
  campaign?: any;
  type: string;
  discount: IDiscount;
  metadata?: IMetadata;
  active: boolean;
  start_date?: string | null;
  expiration_date?: string | null;
  isbankoffer: boolean;
  isApplicable: boolean;
  voucherContent: IVoucherContent;
  actual_off: number;
  content: IContent;
  discountAmount: number;
  day_offer_description?: string | null;
}

export interface IDiscount {
  type: string;
  percent_off?: number;
  amount_limit?: number;
  amount_off?: number;
}

export interface IMetadata {
  voucher_type?: string;
  bank_offer?: string;
  mode?: string[];
  min_slab?: number;
  voucher_description?: string;
  bank_offer_discount_type?: string;
  discount_on?: string[];
  bank_name?: string;
  is_hidden?: boolean;
  actual_off: number;
  discountOn: number;
  canClubWithCashback?: boolean;
  coupon_type?: string;
  card_type?: string[];
  is_slab?: boolean;
  max_slab?: number;
}

export interface IVoucherContent {
  logo: string;
  headerText: string;
  descriptionText: string;
  saveText: string;
  disableText: string;
  isTnC: boolean;
}

export interface IContent {
  shortDesc: string[];
}

export interface IGetUserAuthenticationResponse {
  success: boolean;
  authenticated: boolean;
  message: string | null;
  code: number;
  response?: IUserAuthenticationResponse | null;
}

interface IUserAuthenticationResponse {
  userId: string | null;
  udchaloId: string | null;
}

export interface IFlightPriceListAPIResponse {
  alert: any;
  insuranceDetails: IFlightPriceListInsuranceDetails;
  isCreditShellEnabled: boolean;
  isGstEnabled: boolean;
  isInsuranceEnabled: boolean;
  isPriceV2Enabled: false;
  legIds: any;
  message: string | null;
  newPaymentFlow: boolean;
  sessionId: string;
  success: boolean;
  response: IFlightPriceListResponse[] | null;
}

export interface IFlightPriceListInsuranceDetails {
  basicPremium: number;
  cgst: number;
  igst: number;
  sgst: number;
  utst: number;
  netPremium: number;
}
export interface IFlightPriceListResponse {
  error: any;
  fare: IFlightPriceListFare;
  flightId: string | null;
  isFareChanged: boolean;
  leg: IFlightPriceListLeg;
  priceDiff: number;
  status: number;
}
interface IFlightPriceListFare {
  baseTotalFare: number;
  brand: IFlightPriceListFareBrand;
  cmfDiscount: number;
  fareCategory: string;
  fareType: number;
  priceDiff: number;
  totalConvenienceFee: number;
  totalCorporateConvenienceFees: number;
  totalFare: number;
  totalFee: number;
  totalTax: number;
  passengerFares: IFlightPriceListPassengerFare[];
}

interface IFlightPriceListFareBrand {
  name: string;
  qualifier: string;
}

interface IFlightPriceListPassengerFare {
  baseFare: number;
  classOfService: string;
  fareBasisCode: string;
  fees: IFlightPriceListPassengerFaresTax[] | null;
  passengerType: string;
  quantity: number;
  taxes: IFlightPriceListPassengerFaresTax[] | null;
  totalConvenienceFee: number;
  totalFare: number;
  totalTax: number;
}

interface IFlightPriceListPassengerFaresTax {
  amount: number;
  code: string;
}

interface IFlightPriceListLeg {
  legId: string;
  departDate: string;
  arriveDate: string;
  departOffset: number;
  arriveOffset: number;
  airline: string;
  classOfService: string;
  duration: number;
  fare: IFlightPriceListFare;
  isLCC: boolean;
  isDefence: boolean;
  freeMeal: boolean;
  isDiscounted: boolean;
  freeReschedulingAllowed: boolean;
  freeCancellationAllowed: boolean;
  freeSeatSelectionAllowed: boolean;
  isSeries: boolean;
  origin: string;
  destination: string;
  stops: number;
  isRefundable: boolean;
  checkInBaggage: number;
  handBaggage: number;
  provider: string;
  mode: string;
  isExclusive: boolean;
  isLtcEligible: boolean;
  isLtcEntitled: boolean;
  handBaggageText: string | null;
  supplierState: ISupplierState;
  isAggregator: boolean;
  isHoppingFlightSegment: boolean;
  fareType: string;
  excessBaggageOptions: IBaggageOption[] | null;
  reschedulePenalties: IRescheduleAndCancellationPenalty[] | null;
  cancelPenalties: IRescheduleAndCancellationPenalty[] | null;
  segments: IFlightPriceListSegment[] | [] | null;
}
interface ISupplierState {
  fareKey: string;
  ruleNumber: string;
  productClass: string;
  sellKey: string;
  stdDepartDate: string;
  signature: string;
  signatureTimeStamp: string;
  pricingTimeStamp: string;
}

interface IFlightPriceListSegment {
  isInternational: boolean;
  cabin: string;
  mileage: number;
  seatAvailable: number;
  layoverAirportCode: string | null;
  layoverMinutes: number;
  classOfService: string;
  stops: number;
  handBaggage: number;
  checkInBaggage: number;
  seatMap: {
    seats: IFlightPriceListSeat[] | null;
  };
  mealOptions: IMealOption[] | null;
}

interface IFlightPriceListSeat {
  row: number;
  column: number;
  isAvailable: boolean;
  seatId: number;
  seatNumber: string | null;
  isExtraLegroom: boolean;
  isExitRow: boolean;
  isSeatPresent: boolean;
  isReclining: boolean;
  isWing: boolean;
  seatLocation: number;
  seatSupplierState: {
    key: string | null;
  };
  price: number;
  name: string | null;
}

export interface IRescheduleAndCancellationPenalty {
  amount: number;
  hours: number;
  penaltyType: number;
  additionalGstPercent: number;
  udchaloCancellationFee?: number;
}

export interface IBaggageOption {
  code: string | null;
  price: number | null;
  text: string | null;
  value?: string | null;
}

export interface IGetTravellerResponse {
  success: boolean;
  authenticated: boolean;
  message: string;
  code: number;
  response?: ITraveller[] | null;
}
export interface ITraveller {
  travellerId: string | null;
  relationship: string | null;
  name: ITravellerName;
  gender: string | null;
  uploads: ITravellerUploads;
  dateOfBirth: string | null;
  isEnabled: number | null;
  isDefence: boolean;
  type: PassengerType;
  userId: string | null;
  age: number;
  passportNumber: number | null;
  passportIssuingDate: string | null;
  passportExpiryDate: string | null;
}

interface ITravellerName {
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  title: string | null;
}

interface ITravellerUploads {
  profilePicUrl: string | null;
}

export type PassengerType = 'Adult' | 'Child' | 'Infant';

export interface IArmedForceDonationApiResponse {
  success: boolean;
  authenticated: boolean;
  message: string;
  errorCode: number;
  response?: IArmedForceDonationResponse;
}

export interface IArmedForceDonationResponse {
  amount: number;
  product: string | null;
  tncLink: string | null;
  allowedRoles: any[];
  isEnabled: boolean;
  welfarePageLink: string | null;
  isDonationAllowed: boolean;
}

export interface IPaymentRedirectionApiResponse {
  success: boolean;
  message: string;
  response?: string;
  errorCode: number;
}

export interface ISaveBookingApiResponse {
  success: boolean;
  response: {
    bookingId: string | null;
    success: boolean;
  };
  message: string;
  sessionId?: string;
  bookingId?: string | null;
  userId?: string | null;
  securePaymentPageUrl?: string | null;
  bankOfferMethod?: string | null;
  promocode?: string | null;
}

export interface IFlightPriceAddonsConfigApiResponse {
  message: string | null;
  response?: IFlightPriceAddonsConfigResponse;
  success: boolean;
}

export interface IFlightPriceAddonsConfigResponse {
  cabService: ICabServiceResponse;
  refundProtect: IRefundProtect[];
  suraksha: ISurakshaResponse[];
  showBnp1Banner: boolean;
}
interface ICabServiceResponse {
  bookTimings: { interval: number; buffer: number };
  isFullFeatureEnabled: boolean;
  locationService: string | null;
  returnFlightSupport: boolean;
  seatsPermitted: number;
}
interface IRefundProtect {
  details: {
    benefits: string[] | null;
    covidTerms: string | null;
    tnc: string | null;
  };
  fareInPercentage: number;
  isEnabled: boolean;
  landingPageData: ILandingPageData;
}

interface ILandingPageData {
  benefits: {
    title: string;
  }[];
  benefitsHeader: string | null;
  cta: {
    ctaButton: {
      link: string;
      text: string;
    };
    title: string | null;
  };
  faqList: {
    content: string | null;
    title: string | null;
  }[];
  imgUrls: {
    desktop: string | null;
    mobile: string;
  };
  terms: string;
}

export interface ISurakshaResponse {
  isEnabled: boolean;
  legId: 'Leg:ee566aee-7c6f-4fd7-9983-b7f217c53e34|SCPREFIX:BOM:GOI:1720051200000';
  details: {
    coverage: {
      onward: number;
      return: number;
    };
    premium: {
      onward: number;
      return: number;
    };
    totalCoverage: {
      onward: number;
      return: number;
    };
    totalPremium: {
      onward: number;
      return: number;
    };
    refundCharges: number;
    landingPageData: {
      title: string;
      tnc: string;
      description: string;
      reasons: {
        id: number;
        content: string[];
        tncLink: string;
      };
    };
    fareConfig: {
      isSlabBasedFare: boolean;
      fareInPercentage: number;
      fareSlabs: {
        coverage: number;
        premium: number;
      }[];
      isAncillaryIncluded: boolean;
      isNewSurakshaVersion: boolean;
    };
    target: string[];
    claimWindow: number;
  };
}
