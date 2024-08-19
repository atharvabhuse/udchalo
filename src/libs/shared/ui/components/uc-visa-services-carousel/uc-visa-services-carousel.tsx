import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Scrollbar, A11y, Pagination } from 'swiper';
import { VisaServices } from '@uc/libs/shared/ui';
import styles from './uc-visa-services-carousel.module.scss';

SwiperCore.use([Navigation, Scrollbar, A11y, Pagination]);

/* eslint-disable-next-line */
export interface UcVisaServicesCarouselProps {
  items: any;
}

export function UcVisaServicesCarousel({ items }: UcVisaServicesCarouselProps) {
  const backgroundImage = <VisaServices />;
  const backgroundImagePath = '@uc/assets/images/visaServicesBackgroundImage.svg';
  return (
    <div
      className={styles.carousal}
      style={{
        // height: '5vmax',
        backgroundColor: 'transparent',
      }}>
      <Swiper slidesPerView={1} className={styles.swipper_wrapper} pagination={{ clickable: true }}>
        {items?.map((data: object, index: number) => (
          <SwiperSlide className={styles.swiper_slide} key={`items-${index}`}>
            {window.innerWidth > 600 ? (
              <div className={styles.green_banner}>
                Relax In Our Visa Lounge, While We Handle The Paperwork! Visa Services Are Available Now.
              </div>
            ) : (
              <div className={styles.green_banner}>Visa Services Are Available Now.</div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default UcVisaServicesCarousel;
