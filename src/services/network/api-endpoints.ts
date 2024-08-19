// const apiServerUrl = '/server/api';
// const apiServerUrl = 'https://sandbox-server-proxy-preprod.udchalo.com/server/api';
const apiServerUrl = 'https://stage-server-proxy-preprod.udchalo.com/server/api';
// const apiServerUrl = 'https://dev-server-proxy-preprod.udchalo.com/server/api';
// const apiServerUrl = 'https://prod-server.udchalo.com/api';

const userServerUrl = 'https://users-stage-api-preprod.udchalo.com';
// const userServerUrl = 'https://users-dev-api-preprod.udchalo.com';

const configServerUrl = 'https://static.udchalo.com/configs/stage';
// const configServerUrl = 'https://static.udchalo.com/configs/dev';

const flightHomePageUrl = 'https://static-preprod.udchalo.com';

// const insuranceServerUrl = 'https://insurance-stage-api-preprod.udchalo.com';
const insuranceServerUrl = 'https://insurance-dev-api-preprod.udchalo.com';

const supportUrl = 'https://support-stage-api-preprod.udchalo.com';
// const supportUrl = 'https://support-dev-api-preprod.udchalo.com';

// const supportUrlV2 = 'https://supportv2-prod-api.udchalo.com';
const supportUrlV2 = 'https://supportv2-stage-api-preprod.udchalo.com';
// const supportUrlV2 = 'https://supportv2-dev-api-preprod.udchalo.com';

const strapiServerUrlDev = 'https://dev-cms.udchalo.com/api';

export const apiUrls = {
  addTraveler: `${apiServerUrl}/user/addTraveller`,
  deleteTraveler: `${apiServerUrl}/user/deleteTraveller/`,
  getAirports: `${apiServerUrl}/flights/getAirports`,
  getCabins: `${apiServerUrl}/flights/cabins`,
  postSearchInit: `${apiServerUrl}/flights/v2/searchInit`,
  getSearchRequest: `${apiServerUrl}/flights/getRequest/`,
  postFareCalendar: `${apiServerUrl}/flights/getfarecalendar`,
  postFareCalendarV2: `${apiServerUrl}/flights/getfarecalendarV2`,
  getFlightSearchResults: `${apiServerUrl}/flights/v2/searchResult`,
  getRescheduleFlightSearchResults: `${apiServerUrl}/flights/v2/reschedule/searchResult`,
  getFlightReview: `${apiServerUrl}/flights/review`,
  getRescheduleFlightReview: `${apiServerUrl}/flights/reschedule-review`,
  postSupportLog: `${apiServerUrl}/support/log`,
  getUserAuthenticated: `${apiServerUrl}/user/authenticated`,
  postCouponList: `${apiServerUrl}/coupon/v2/list`,
  postUpdateTraveler: `${apiServerUrl}/user/updateTraveller`,
  postPriceUrl: `${apiServerUrl}/flights/price`,
  sendOtpForPhoneNumberVerification: `${apiServerUrl}/user/sendOtp`,
  verifyOtpForPhoneNumberVerification: `${apiServerUrl}/user/verifyOtp`,
  sendOtpForEmailVerification: `${userServerUrl}/send-email-otp`,
  verifyOtpForEmailVerification: `${userServerUrl}/verifyEmail`,
  sendEmailVerificationLink: `${apiServerUrl}/user/sendEmailVerificationLink`,
  sendOtpForLoginV2: `${apiServerUrl}/user/sendOtpForLoginV2`,
  loginViaOtpV2: `${apiServerUrl}/user/loginViaOtpV2`,
  getProfileV2: `${apiServerUrl}/user/getProfileV2`,
  logout: `${apiServerUrl}/user/logout`,
  getBalance: `${apiServerUrl}/wallet/getBalance`,
  getRewardTransactions: `${apiServerUrl}/reward/transactions`,
  getTravellersCountsFlights: `${apiServerUrl}/user/getTravellersCount/flights`,
  postPriceAddOns: `${apiServerUrl}/flights/travel/addons/pricing`,
  postPriceAddOnsConfig: `${apiServerUrl}/flights/travel/addons/config`,
  getTravellersData: `${apiServerUrl}/user/getTravellers`,
  getStaticHomepageData: `${configServerUrl}/homepage.json`,
  getHolidayDestination: `${supportUrlV2}/holidays/package/list?device=mobile`,
  getFlightHomePageData: `${flightHomePageUrl}/FlightHomePage.json`,
  updateProfile: `${apiServerUrl}/user/updateProfile`,
  updateProfilePic: `${apiServerUrl}/user/updateProfilePic`,
  updateNotificationSettings: `${apiServerUrl}/user/updateSettings`,
  postSaveBooking: `${apiServerUrl}/flights/saveBooking`,
  getPaymentRedirectLink: `${supportUrl}/configs/payment/v2/url`,
  getBookResult: `${apiServerUrl}/flights/bookResult/`,
  getBookStatus: `${apiServerUrl}/flights/bookStatus/`,
  postCouponApply: `${apiServerUrl}/coupon`,
  postAddTraveller: `${apiServerUrl}/user/addTraveller`,
  getTravellers: `${apiServerUrl}/user/getTravellers`,
  postUpdateTraveller: `${apiServerUrl}/user/updateTraveller`,
  getBookingFromPNR: `${apiServerUrl}/user/bookingFromPnr`,
  getAllBookings: `${apiServerUrl}/user/getAllBookings`,
  getBookingDetails: `${apiServerUrl}/user/getBookingDetails`,
  checkIn: `${apiServerUrl}/flights/check-in`,
  getRefundModeList: `${apiServerUrl}/cancellations/listRefundModes`,
  getEstimatedRefund: `${apiServerUrl}/flights/estimatedRefund`,
  getSurakshaReasons: `${insuranceServerUrl}/suraksha/get/reason`,
  postAddCancellation: `${apiServerUrl}/cancellations/addCancellation`,
  fileUploadUrl: `${supportUrl}/sigened-urlV2`,
  getReferralCode: `${apiServerUrl}/referral`,
  getAirlineRules: `${apiServerUrl}/flights/airlines/rules`,
  rescheduleSearch: `${apiServerUrl}/flights/reschedule/searchInit`,
  refundModes: `${apiServerUrl}/cancellations/listRefundModes`,
  validateIFSC: `${apiServerUrl}/neft/validateIFSC`,
  NEFTAdd: `${apiServerUrl}/neft/add`,
  getSurakshaBookingDetails: 'https://flight-stage-api-preprod.udchalo.com/suraksha/booking/details',
  getNPSSurvey: `${supportUrl}/nps-survey/check-validity/flightConfirmation?mobile=0`,
  npsSurveyAdd: `${supportUrl}/nps-survey/feedback/add`,
  getPopularHolidayDestination: `${supportUrlV2}/holidays/popular/package/list`,
  isArmedForcesDonationAllowed: `${supportUrlV2}/isDonationAllowed/flights`,
  getFareChange: `${apiServerUrl}/flights/fareChange`,
};

export const configUrls = {
  getStaticHomepageData: `${configServerUrl}/homepage.json`,
  airlines: `${configServerUrl}/airlines.json?v=3`,
  miscConfig: `${configServerUrl}/misc_config.json`,
  homePage: `${configServerUrl}/homepage.json`,
  udChaloGeneralConfig: '/udChaloGeneralConfig.json',
  downloadTicketUrl: `${apiServerUrl}/support/getPdf`,
};

export const cmsUrls = {
  getHomePageFlightDetails: `${strapiServerUrlDev}/home-pagedomestic?populate=deep,50`,
  getBannerDetails: `${strapiServerUrlDev}/banner?populate=deep,50`,
  getHomePageDetails: `${strapiServerUrlDev}/home-page?populate=deep,50`,
};
