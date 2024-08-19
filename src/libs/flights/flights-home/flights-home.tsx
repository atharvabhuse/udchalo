import { FlightSearchForm, FlightsHomeBanner } from '@uc/libs/flights/shared/ui';
import { Faqs, MSiteUcHeader, SettingIcon, useSharedAppStateContext } from '@uc/libs/shared/ui';
import {
  FlightSearchInitResponse,
  FlightSearchRequest,
  IFlightBannerDetailsResponse,
  IFlightHomePageDetailsResponse,
  IFlightRoute,
  IHomePageDetailsResponse,
  IPopularHolidaysDestinationResponse,
} from '@uc/services/network';
import { useRouter } from 'next/navigation';
import { retriveValueFromLocalStorage } from '@uc/utils/web-storage-utils';
import { useEffect, useState } from 'react';
import Blogs from './components/blogs/blogs';
import BookNow from './components/book-now/book-now';
import DownloadApp from './components/download-app/download-app';
import FlightRoutes from './components/flight-routes/flight-routes';
import HolidayDestination from './components/holiday-destination/holiday-destination';
import Offers from './components/offers/offers';
import PopularData from './components/popular-data/popular-data';
import QuickActions from './components/quick-actions/quick-actions';
import Referral from './components/referral/referral';
import Testimonials from './components/testimonials/testimonials';
import TravelAdvisory from './components/travel-advisory/travel-advisory';
import TripPlanning from './components/trip-planning/trip-planning';
import WhyBookUs from './components/why-book-us/why-book-us';
import styles from './flights-home.module.scss';

export interface FlightsHomeProps {
  cmsServiceData: ICmsServiceData;
  searchFormServiceData: ISearchFormService;
  popularHolidayDestinations: IPopularHolidaysDestinationResponse;
  homePageConfigsData: any;
}

interface ICmsServiceData {
  homePageDetails: IHomePageDetailsResponse | null;
  bannerDetails: IFlightBannerDetailsResponse | null;
  flightHomePageDetails: IFlightHomePageDetailsResponse | null;
}
interface ISearchFormService {
  getAirports: any;
  getCabins: any;
}

export function FlightsHome(props: FlightsHomeProps) {
  const { cmsServiceData, searchFormServiceData, popularHolidayDestinations, homePageConfigsData } = props;
  const { homePageDetails = null, bannerDetails = null, flightHomePageDetails = null } = cmsServiceData;
  const { getAirports = null, getCabins = null } = searchFormServiceData;
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.screen.width);
  }, []);
  const today = new Date();
  const defaultFormData: FlightSearchRequest = {
    tripType: 'oneway',
    origin: 'DEL',
    destination: 'IXL',
    originCountryCode: 'IN',
    destinationCountryCode: 'IN',
    adults: 1,
    children: 0,
    infants: 0,
    cabin: 'Economy',
    isDefence: false,
    userCategory: 'Retail',
    referrer: '',
    serviceNumber: null,
    departDate: {
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
    },
  };

  const router = useRouter();

  const flightSearch = (searchResponse: FlightSearchInitResponse) => {
    router.push(`/flights/results/${searchResponse.sessionId}`);
  };

  const onQuickActions = (quickAction: string) => {
    const name = quickAction.split(' ').join('-').toLowerCase();
    if (name === 'modify-flight' || name === 'refund-status') {
      router.push('/user/bookings');
    } else {
      router.push(`/flights/${name}`);
    }
  };

  const backHandler = () => {};

  const prefilledRecentSearch = () => {
    const recentSearchesData: Array<FlightSearchRequest> =
      (retriveValueFromLocalStorage('udchalo-webstorage|recentsearches') as Array<FlightSearchRequest>) || [];
    const lastSearch =
      recentSearchesData && recentSearchesData[recentSearchesData?.length && recentSearchesData.length - 1];
    if (lastSearch) {
      const departDateObj = new Date(
        lastSearch.departDate.year,
        lastSearch.departDate.month,
        lastSearch.departDate.day
      );
      const returnDateObj = lastSearch?.returnDate
        ? new Date(lastSearch.returnDate.year, lastSearch.returnDate.month, lastSearch.returnDate.day)
        : undefined;

      if (departDateObj < today) {
        lastSearch.departDate = {
          day: today.getDate(),
          month: today.getMonth(),
          year: today.getFullYear(),
        };
      }
      if (returnDateObj && returnDateObj < today) {
        lastSearch.returnDate = {
          day: today.getDate(),
          month: today.getMonth(),
          year: today.getFullYear(),
        };
      }
      return { initialFormData: lastSearch, recentSearchesData };
    }
    return { initialFormData: defaultFormData, recentSearchesData };
  };

  const [quickAction, setQuickAction] = useState('');
  const { userData, validateAuthentication } = useSharedAppStateContext();
  const [formData, setFormData] = useState<FlightSearchRequest>(defaultFormData);
  const [recentSearches, setRecentSearches] = useState<FlightSearchRequest[]>([]);

  const updateSearchFormData = (selectedRoute: IFlightRoute) => {
    const { soucecode: sourceCode, destinationcode: destinationCode } = selectedRoute;
    const newFormData = {
      ...formData,
      origin: sourceCode,
      destination: destinationCode,
    };
    setFormData(newFormData);
    window.scrollTo(0, 10);
  };

  const handleQuickAction = (action: string) => {
    if (userData?.userId) {
      onQuickActions(action);
    } else {
      setQuickAction(action);
      validateAuthentication();
    }
  };

  useEffect(() => {
    if (quickAction) {
      onQuickActions(quickAction);
    }
  }, [userData?.userId]);

  useEffect(() => {
    const { initialFormData, recentSearchesData } = prefilledRecentSearch();
    if (initialFormData) {
      setFormData(initialFormData);
    }
    if (recentSearchesData) {
      setRecentSearches(recentSearchesData);
    }
  }, []);

  function findDatabyBannerDetails(name: string) {
    return bannerDetails && bannerDetails?.data?.attributes?.HomePageFlight?.find(obj => obj.name === name);
  }
  return (
    <div>
      <MSiteUcHeader backHandler={backHandler}>
        <MSiteUcHeader.LeftContent>
          <h1>Search Flights</h1>
        </MSiteUcHeader.LeftContent>

        <MSiteUcHeader.RightContent>
          <div className={styles.support_icon}>
            <SettingIcon />
            <h1>Support</h1>
          </div>
        </MSiteUcHeader.RightContent>
      </MSiteUcHeader>
      <div className={styles.flights_home}>
        <div className={styles.content_section_backgroundImg} />
        {flightHomePageDetails && (
          <FlightsHomeBanner
            flightHomeBannerData={flightHomePageDetails?.data?.attributes?.FlightBookingBanner || []}
            isDomestic
          />
        )}
        <div className={styles.form_container}>
          {!getAirports || !getCabins ? (
            <div className="box shine" />
          ) : (
            <FlightSearchForm
              airportList={getAirports && getAirports?.response}
              cabinTypes={getCabins && getCabins?.response}
              initialFormData={formData && formData}
              onSearch={flightSearch}
              recentSearchData={recentSearches && recentSearches}
              popularAirports={
                (flightHomePageDetails && flightHomePageDetails?.data?.attributes?.popularAirports) || []
              }
            />
          )}
        </div>
        <section className={styles.content_section}>
          <BookNow />
        </section>
        {homePageDetails && (
          <>
            <section className={styles.content_section}>
              <Offers offersData={homePageDetails?.data?.attributes?.BankOffers} windowWidth={windowWidth} />
            </section>
            <section className={styles.content_section}>
              <QuickActions
                onQuickActionClick={handleQuickAction}
                quickActionData={homePageDetails?.data?.attributes?.quickActions}
                windowWidth={windowWidth}
              />
            </section>
          </>
        )}
        {bannerDetails && (
          <section className={styles.content_section}>
            <Referral referralData={findDatabyBannerDetails('Referral Banner')} />
          </section>
        )}
        {flightHomePageDetails && (
          <section className={styles.content_section}>
            <TravelAdvisory
              travelAdvisoryData={flightHomePageDetails?.data?.attributes?.TravelAdvisory}
              windowWidth={windowWidth}
            />
          </section>
        )}
        {/* <section className={styles.content_section}>
          <VisaFreeCountriesBanner visaFreeCountriesData={findDatabyBannerDetails('Visa Free Countries Banner')} />
        </section> */}
        {flightHomePageDetails && bannerDetails && (
          <section className={styles.content_section}>
            <FlightRoutes
              onSelect={updateSearchFormData}
              advertisementBannerData={findDatabyBannerDetails('advertisement Banner')}
              flightRoutes={flightHomePageDetails?.data?.attributes?.domesticTopRoutes}
            />
          </section>
        )}
        {windowWidth >= 900 && (
          <section className={styles.content_section}>
            <DownloadApp />
          </section>
        )}
        {bannerDetails && (
          <section className={styles.content_section}>
            <TripPlanning tripPlanningData={findDatabyBannerDetails('international Promo')} />
          </section>
        )}
        {popularHolidayDestinations && (
          <section className={styles.content_section}>
            <HolidayDestination
              popularHolidayDestinations={popularHolidayDestinations?.response || []}
              windowWidth={windowWidth}
            />
          </section>
        )}
        <section className={styles.content_section}>
          <Testimonials windowWidth={windowWidth} />
        </section>
        <section className={styles.content_section}>
          <Blogs />
        </section>
        <section className={styles.content_section}>
          <Faqs faqData={homePageConfigsData && homePageConfigsData?.flightFaqsData} />
        </section>
        {flightHomePageDetails && (
          <section className={styles.content_section}>
            <WhyBookUs
              whyBookUsDetails={flightHomePageDetails?.data?.attributes?.whyBookUs}
              windowWidth={windowWidth}
            />
          </section>
        )}
        <section className={styles.content_section}>
          <PopularData />
        </section>
      </div>
    </div>
  );
}

export default FlightsHome;
