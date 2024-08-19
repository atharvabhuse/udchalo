import { Swiper, SwiperRef, SwiperSlide, useSwiper } from 'swiper/react';
import { ReactNode, useCallback, useRef, useState, useEffect } from 'react';
import buttonRight from '@uc/assets/images/buttonRight.png';
import buttonLeft from '@uc/assets/images/buttonLeft.png';
import Image from 'next/image';
import SwiperCore, { Pagination, A11y, Autoplay } from 'swiper';
import styles from './uc-carousel.module.scss';

export interface UcCarouselProps {
  slides: Array<ReactNode>;
  spaceBetween: number;
  slidesPerView: number;
  showPagination?: boolean;
  hideSwiperButtons?: boolean;
}
SwiperCore.use([Pagination, A11y, Autoplay]);

export function UcCarousel(props: UcCarouselProps) {
  const { slides, slidesPerView, spaceBetween, showPagination, hideSwiperButtons } = props;
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.screen.width);
  }, []);

  const swiperRef = useRef<SwiperRef>(null);
  const swiper = useSwiper();

  const prevSlide = useCallback(() => {
    swiperRef.current?.swiper.slidePrev();
  }, [swiperRef]);

  const nextSlide = useCallback(() => {
    swiperRef.current?.swiper.slideNext();
  }, [swiperRef]);

  return (
    <div className={styles.swiper_main_data}>
      {!hideSwiperButtons && windowWidth >= 1000 && (
        <div onClick={prevSlide} className={styles.swiper_main_data_buttonLeft}>
          <Image src={buttonLeft} alt="image not found" />
        </div>
      )}
      <Swiper
        ref={swiperRef}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        autoplay={{
          delay: 2000,
        }}
        onSlideChange={() => swiper?.slideNext()}
        // onSwiper={(swiper) => {}}
        // pagination={showPagination ? true : false}
        // pagination={{ clickable: pagination}}
        pagination={showPagination}>
        {slides?.map((s, i) => <SwiperSlide key={`slides-${i}`}>{s}</SwiperSlide>)}
      </Swiper>
      {!hideSwiperButtons && windowWidth >= 1000 && (
        <div onClick={nextSlide} className={styles.swiper_main_data_buttonRight}>
          <Image src={buttonRight} alt="image not found" />
        </div>
      )}
    </div>
  );
}

export default UcCarousel;
