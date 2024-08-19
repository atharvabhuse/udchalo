import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';

import SwiperLeftArrow from '@uc/assets/images/swiper_left_arrow.svg';
import SwiperRightArrow from '@uc/assets/images/swiper_right_arrow.svg';
import { format } from 'date-fns';
import styles from './uc-date-price-carousel.module.scss';

const INR = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

/* eslint-disable-next-line */
export interface UcDatePriceCarouselProps {
  selectedDate: string;
  onDateSliderDateSelection: (date: string) => void;
  faresList: Array<{
    dateTime: number;
    formattedDateString: string;
    dateString: string;
    amount: string;
    color: string;
  }>;
}

export function UcDatePriceCarousel({ faresList, selectedDate, onDateSliderDateSelection }: UcDatePriceCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prevHandler = () => {
    setCurrent(current - 1);
  };

  const nextHandler = () => {
    setCurrent(current + 1);
  };

  const getFare = (amount: string) => {
    const fareString = amount !== '--' ? INR.format(+Number.parseInt(amount, 10).toFixed(0)) : INR.format(0);
    return fareString;
  };

  const currentDate = format(new Date(selectedDate), 'dd-MM-y');

  const selectedDateTimeStamp = new Date(selectedDate).getTime();
  const twoDaysInMilliSeconds = 2 * 24 * 60 * 60 * 1000;
  const twoDaysBeforeSelectedDateTimeStamp = new Date(selectedDateTimeStamp - twoDaysInMilliSeconds).getTime();
  const todayDateTimeStamp = new Date().getTime();

  const [timeStampFromWhichDateTimeCarousalShow, setTimeStampFromWhichDateTimeCarousalShow] = useState(null);

  useEffect(() => {
    if (selectedDateTimeStamp - todayDateTimeStamp > twoDaysInMilliSeconds) {
      setTimeStampFromWhichDateTimeCarousalShow(twoDaysBeforeSelectedDateTimeStamp);
    } else {
      setTimeStampFromWhichDateTimeCarousalShow(selectedDateTimeStamp);
    }
  },[]);

  return faresList?.length === 0 ? (
    <div>Date price info missing</div>
  ) : (
    <div className={styles.carousal}>
      <Swiper
        slidesPerView={6}
        className={styles.swipper_wrapper}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        scrollbar={{ draggable: true, hide: true }}>
        {faresList &&
          faresList?.map(fareData => {
            const today: Date = new Date();
            let fareListRender;
            if (fareData.dateTime >= timeStampFromWhichDateTimeCarousalShow) {
              fareListRender = (
                <SwiperSlide
                  className={styles.swiper_slide}
                  key={fareData.dateTime}
                  onClick={() => onDateSliderDateSelection(fareData.dateString)}>
                  <div className={styles.price_item}>
                    <div className={styles.price_date}>{fareData.formattedDateString}</div>
                    <div className={fareData.dateString === currentDate ? styles.price_active : styles.price}>
                      {getFare(fareData.amount)}
                    </div>
                  </div>
                </SwiperSlide>
              );
            } else {
              fareListRender = null;
            }
            return fareListRender;
          })}

        <div className={styles.left_right_btn}>
          <button
            type="button"
            onClick={prevHandler}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === 'Space') {
                prevHandler();
              }
            }}
            className={`swiper-button-prev ${styles.previous_and_next_button}`}
            aria-label="prev">
            <SwiperLeftArrow />
          </button>

          <button
            type="button"
            onClick={nextHandler}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === 'Space') {
                nextHandler();
              }
            }}
            className={`swiper-button-next ${styles.previous_and_next_button}`}
            aria-label="next">
            <SwiperRightArrow />
          </button>
        </div>
      </Swiper>
    </div>
  );
}

export default UcDatePriceCarousel;
