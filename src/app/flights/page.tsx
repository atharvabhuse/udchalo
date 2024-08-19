import { FlightsHome } from '@uc/libs/flights/flights-home';
import { getAllCmsServicesData } from '@uc/services/cms-services';
import { getHomePageData } from '@uc/services/config-services';
import { getPopularHolidayDestinationService } from '@uc/services/popular-holiday-service';
import { searchFormService } from '@uc/services/search-form-services';

async function FlightsHomePage() {
  const strapiServiceData = await getAllCmsServicesData();
  const searchFormServiceData = await searchFormService();
  const popularHolidayDestinations = await getPopularHolidayDestinationService();
  const getHomePageConfigs = await getHomePageData();
  return (
    <FlightsHome
      cmsServiceData={strapiServiceData && strapiServiceData}
      searchFormServiceData={searchFormServiceData && searchFormServiceData}
      popularHolidayDestinations={popularHolidayDestinations && popularHolidayDestinations}
      homePageConfigsData={getHomePageConfigs && getHomePageConfigs}
    />
  );
}

export default FlightsHomePage;
