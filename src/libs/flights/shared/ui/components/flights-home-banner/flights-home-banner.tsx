import { UcCarousel } from '@uc/libs/shared/ui';
import { IFlightLandingPageDetail } from '@uc/services/network';
import Image from 'next/image';
import styles from './flights-home-banner.module.scss';

export interface FlightsHomeBannerProps {
  flightHomeBannerData: IFlightLandingPageDetail[];
  isDomestic?: boolean;
}

export function FlightsHomeBanner(props: FlightsHomeBannerProps) {
  const { flightHomeBannerData, isDomestic } = props;
  const slides =
    flightHomeBannerData &&
    (flightHomeBannerData || [])
      ?.filter(bannerData => bannerData?.isDomestic === isDomestic)
      ?.map((bannerData: IFlightLandingPageDetail) => (
        <div id={`${bannerData?.id}`} className={styles.banner_container}>
          <Image
            className={styles.banner_image}
            src={bannerData?.bannerWeb?.data?.attributes?.url}
            alt={bannerData?.title}
            width={bannerData?.bannerWeb?.data?.attributes?.width}
            height={bannerData?.bannerWeb?.data?.attributes?.height}
            priority
          />
        </div>
      ));

  const slidesMsite =
    flightHomeBannerData &&
    (flightHomeBannerData || [])
      ?.filter(bannerData => bannerData?.isDomestic === isDomestic)
      ?.map((bannerData: IFlightLandingPageDetail) => (
        <div id={`${bannerData?.id}`} className={styles.banner_container}>
          <Image
            className={styles.banner_image}
            src={bannerData?.icon?.data[0]?.attributes?.url}
            alt={bannerData?.icon?.data[0]?.attributes?.name}
            width={bannerData?.icon?.data[0]?.attributes?.width}
            height={bannerData?.icon?.data[0]?.attributes?.height}
            priority
          />
        </div>
      ));
  return (
    <div className={styles.home_banner_container}>
      <div className={styles.home_banner_web}>
        <UcCarousel slides={slides} slidesPerView={1} spaceBetween={0} showPagination hideSwiperButtons />
      </div>
      <div className={styles.home_banner_msite}>
        <UcCarousel slides={slidesMsite} slidesPerView={1} spaceBetween={0} showPagination hideSwiperButtons />
      </div>
    </div>
  );
}

export default FlightsHomeBanner;
