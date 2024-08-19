
import { FlightsSearchResults } from '@uc/libs/flights/search-results';
import { searchFormService } from '@uc/services/search-form-services';
import { getHomePageDetails } from '@uc/services/cms-services';
import { getSearchRequest } from '@uc/services/get-search-request';
import FareDropPopup from '@uc/libs/flights/search-results/components/fare-drop-popup/fare-drop-popup';
import { redirect } from 'next/navigation';

async function SearchResults({ params }: { params: { sessionId: string } }) {
  const sessionId = params?.sessionId || '';

  const searchFormServiceData = await searchFormService();
  const searchRequest = await getSearchRequest(sessionId);
  const homePageDetails = await getHomePageDetails();

    if(searchRequest?.data?.message === 'wrong sessionId' || searchRequest?.data?.message === 'session expired'){
      redirect('/flights');
    }

  return (
    <>
      <FlightsSearchResults
        searchFormServiceData={searchFormServiceData && searchFormServiceData}
        searchQuery={searchRequest && searchRequest?.data}
        homePageDetails={homePageDetails}
      />
    </>
  );
}

export default SearchResults;
