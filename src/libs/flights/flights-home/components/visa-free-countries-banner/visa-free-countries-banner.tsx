import { IFlightBannerResponse } from '@uc/services/network';
import Image from 'next/image';
import styles from './visa-free-countries-banner.module.scss';

interface VisaFreeCountriesBannerProps {
  visaFreeCountriesData: IFlightBannerResponse;
}
function VisaFreeCountriesBanner(props: VisaFreeCountriesBannerProps) {
  const { visaFreeCountriesData } = props;
  return (
    <div style={{ maxWidth: '100%', maxHeight: '100%' }} className={styles.visa_free_countries_banner_container}>
      <div className={styles.visa_free_countries_banner_web}>
        {visaFreeCountriesData && (
          <Image
            className={styles.visa_free_countries_banner_image}
            src={visaFreeCountriesData.banner_image_web.data.attributes.url}
            layout="responsive"
            width={visaFreeCountriesData.banner_image_web.data.attributes.width}
            height={visaFreeCountriesData.banner_image_web.data.attributes.height}
            alt={visaFreeCountriesData.banner_image_web.data.attributes.name}
          />
        )}
      </div>
      <div className={styles.visa_free_countries_banner_msite}>
        {visaFreeCountriesData && (
          <Image
            className={styles.visa_free_countries_banner_image}
            src={visaFreeCountriesData.banner_image.data[0].attributes.url}
            layout="responsive"
            width={visaFreeCountriesData.banner_image.data[0].attributes.width}
            height={visaFreeCountriesData.banner_image.data[0].attributes.height}
            alt={visaFreeCountriesData.banner_image.data[0].attributes.name}
          />
        )}
      </div>
    </div>
  );
}

export default VisaFreeCountriesBanner;
