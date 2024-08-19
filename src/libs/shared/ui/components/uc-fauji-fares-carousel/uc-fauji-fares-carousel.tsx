import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import SwiperCore, { Navigation, Scrollbar, A11y, Pagination } from 'swiper';
import GreenRightArrow from '@uc/assets/images/GreenRightArrow.svg';
import BlackRightArrow from '@uc/assets/images/BlackRightArrow.svg';
import NightIcon from '@uc/assets/images/NightIcon.svg';
import MorningIcon from '@uc/assets/images/MorningIcon.svg';
import EveningIcon from '@uc/assets/images/EveningIcon.svg';
import AfternoonIcon from '@uc/assets/images/AfternoonIcon.svg';
import SwiperLeftArrow from '@uc/assets/images/swiper_left_arrow.svg';
import SwiperRightArrow from '@uc/assets/images/swiper_right_arrow.svg';
import styles from './uc-fauji-fares-carousel.module.scss';

SwiperCore.use([Navigation, Scrollbar, A11y, Pagination]);

/* eslint-disable-next-line */
export interface UcFaujiFaresCarouselProps {
  items: any;
}

export function UcFaujiFaresCarousel({ items }: UcFaujiFaresCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prevHandler = () => {
    setCurrent(current - 1);
  };

  const nextHandler = () => {
    setCurrent(current + 1);
  };

  return (
    <div
      className={styles.carousal}
      style={{
        height: window.innerWidth > 600 ? '8vmax' : '16vmax',
        backgroundColor: '#0a1b29',
      }}>
      <Swiper
        slidesPerView={3}
        className={styles.swipper_wrapper}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        scrollbar={{ draggable: true }}>
        {items[0]?.map((data: number, index: number) => (
          <SwiperSlide className={styles.swiper_slide} key={`faujiFaresItems-${index}`}>
            <div className={styles.fauji_section2}>
              <div className={styles.fauji_flight_box}>
                <div className={styles.fauji_flight_box_section1}>
                  <div className={styles.fauji_row}>
                    <span className={styles.fauji_row_flight_location}>{items[1].arrival.origin}</span>
                    <BlackRightArrow />
                    <span className={styles.fauji_row_flight_location}>{items[1].arrival.destination}</span>
                  </div>
                  <div className={styles.fauji_row}>
                    {(() => {
                      if (index === 0) {
                        return <MorningIcon />;
                      }
                      if (index === 1) {
                        return <AfternoonIcon />;
                      }
                      if (index === 2) {
                        return <EveningIcon />;
                      }
                      return <NightIcon />;
                    })()}
                    <span className={styles.fauji_row_flight_timing}>
                      {(() => {
                        if (index === 1) {
                          return 'Morning';
                        }
                        if (index === 2) {
                          return 'Afternoon';
                        }
                        if (index === 3) {
                          return 'Evening';
                        }
                        return 'Night';
                      })()}
                    </span>
                  </div>
                </div>
                <div className={styles.fauji_flight_box_section2}>
                  <div className={styles.fauji_row_flight_timing}>
                    Starting From
                    <span className={styles.fauji_row_flight_location}>
                      {data ? `₹${new Intl.NumberFormat('en-IN').format(data)}` : 'NA'}
                    </span>
                  </div>
                  <GreenRightArrow />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className={styles.left_right_btn}>
          <button type='button' onClick={() => prevHandler} className="swiper-button-prev">
            <SwiperLeftArrow className={styles.fauji_fare_swiper_icon} />
          </button>
          <button type='button' onClick={() => nextHandler} className="swiper-button-next">
            <SwiperRightArrow className={styles.fauji_fare_swiper_icon} />
          </button>
        </div>
      </Swiper>
    </div>
  );
}

export default UcFaujiFaresCarousel;
