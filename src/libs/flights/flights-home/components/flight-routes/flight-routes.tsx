import Image from 'next/image';
import ArrowIcon from '@uc/assets/images/arrowIcon.svg';
import RoutesDashedLine from '@uc/assets/images/routesDashedLine.svg';
import CreditCard from '@uc/assets/images/CreditCard.png';
import { ArrowIconMsite, RoutesDashedLineMsite, UcCarousel } from '@uc/libs/shared/ui';
import { IFlightBannerResponse, IFlightRoute, ITopFlightRoute } from '@uc/services/network';
import styles from './flight-routes.module.scss';

const heading = 'Top Defence Flight Routes';

interface FlightRoutesProps {
  onSelect: (data: IFlightRoute) => void;
  advertisementBannerData: IFlightBannerResponse;
  flightRoutes: ITopFlightRoute;
}

function FlightRoutes(props: FlightRoutesProps) {
  const { onSelect, advertisementBannerData, flightRoutes } = props;
  const flightRoutesSlider =
    advertisementBannerData &&
    (advertisementBannerData?.banner_image?.data || [])?.map(bannerImage => (
      <div className={styles.routes_carousel_image} key={bannerImage?.id}>
        <Image
          className={styles.carousel_image}
          src={bannerImage?.attributes?.url}
          width={bannerImage?.attributes?.width}
          height={bannerImage?.attributes?.height}
          alt={bannerImage?.attributes?.name}
          priority
        />
      </div>
    ));

  const emitSelectedRoute = (route: IFlightRoute) => onSelect(route);

  return (
    <div className={styles.main_routes_container}>
      <div className={styles.main}>
        <div className={styles.main_routes}>
          <div className={styles.container}>
            <div className={styles.heading}>
              <div>{flightRoutes?.title || heading}</div>
            </div>

            <div className={styles.routes_container}>
              <div className={styles.routes}>
                {flightRoutes &&
                  (flightRoutes?.topRoutes || [])?.map((flightRoute: IFlightRoute) => (
                    <div className={styles.card} key={flightRoute?.id}>
                      <div className={styles.route_locations}>
                        <div className={`${styles.location}`}>
                          <h1 className={styles.city_full_form}>{flightRoute?.source}</h1>
                          <h1 className={styles.city_short_form}>{flightRoute?.soucecode}</h1>
                        </div>

                        <div className={styles.dashed_line}>
                          <RoutesDashedLine className={styles.dashed_line_web} />
                          <RoutesDashedLineMsite className={styles.dashed_line_msite} />
                        </div>

                        <div className={styles.destination}>
                          <h1 className={styles.city_full_form}>{flightRoute?.destination}</h1>
                          <h1 className={styles.city_short_form}>{flightRoute?.destinationcode}</h1>
                        </div>
                      </div>
                      <div className={styles.select_icon}>
                        <ArrowIcon className={styles.select_icon_web} onClick={() => emitSelectedRoute(flightRoute)} />
                        <ArrowIconMsite
                          className={styles.select_icon_msite}
                          onClick={() => emitSelectedRoute(flightRoute)}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              <div className={styles.image_cards}>
                {advertisementBannerData && (
                  <div className={styles.first_card}>
                    <Image
                      className={styles.advertisement_image}
                      src={advertisementBannerData?.banner_image_web?.data?.attributes?.url}
                      width={advertisementBannerData?.banner_image_web?.data?.attributes?.width}
                      height={advertisementBannerData?.banner_image_web?.data?.attributes?.height}
                      alt={advertisementBannerData?.banner_image_web?.data?.attributes?.name}
                      priority
                    />
                  </div>
                )}
                <div className={styles.second_card}>
                  <Image src={CreditCard} width={380} height={225} alt="creditCardImage" priority />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.routes_carousel_container}>
        <UcCarousel slides={flightRoutesSlider} spaceBetween={10} slidesPerView={1} showPagination />
      </div>
    </div>
  );
}

export default FlightRoutes;
