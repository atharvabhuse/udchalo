// import TestimonialsImg from '@uc/assets/images/testimonialsImg.svg';
import TestimonialsImg from '@uc/assets/images/testimonialsImgNew.png';
import Image from 'next/image';
import { UcCarousel } from '@uc/libs/shared/ui';
import { useState } from 'react';
import { useGetFlightHomePageData } from '@uc/services/network';
import styles from './testimonials.module.scss';

interface TestimonialsData {
  name: string;
  details: string;
  cta: string;
  lob: string;
}

interface TestimonialsProps {
  windowWidth: number;
}

function Testimonials({ windowWidth }: TestimonialsProps) {
  const [clickData, setClickData] = useState(0);
  const [buttonData, setButtonData] = useState<string>('All');

  const { data, isSuccess } = useGetFlightHomePageData();

  const lobSet = new Set(['All']);
  data?.data?.testimonialsData.cardData.forEach((element: any) => lobSet.add(element.lob));
  const buttonArray = Array.from(lobSet);

  const testimonialsSlider = data?.data?.testimonialsData.cardData
    .filter((data: any) => {
      if (buttonData === 'All') {
        return data.lob !== buttonData;
      }
      return data.lob === buttonData;
    })
    .map((data: TestimonialsData, index: number) => (
      <div className={styles.card_data} key={index}>
        <div className={styles.testimonialsCard}>
          <div className={styles.testimonials_card_heading}>
            <div>{data.name}</div>
          </div>
          <div className={styles.testimonials_card_details}>{data.details}</div>
          <div className={styles.testimonials_card_cta}>{data.cta}</div>
        </div>
      </div>
    ));

  const slidesPerViewInfo = () => {
    if (windowWidth >= 600) {
      if (testimonialsSlider?.length >= 4) {
        switch (true) {
          case windowWidth <= 600:
            return 1.5;
          case windowWidth <= 900:
            return 2;
          case windowWidth <= 1200:
            return 3;
          default:
            return 4;
        }
      } else {
        return testimonialsSlider?.length;
      }
    } else {
      return testimonialsSlider?.length > 1 ? 1.5 : 1;
    }
  };
  const handleClick = (data: number) => {
    setClickData(data);
  };

  const slidesPerView = slidesPerViewInfo();

  return (
    <div>
      {isSuccess && (
        <div className={styles.testimonials_details_heading_main}>
          <div className={styles.testimonials_details_heading}>
            <div className={styles.testimonials_details_heading_data}>
              <div>{data?.data?.testimonialsData.heading}</div>
            </div>

            <div>
              <div className={styles.testimonials_details_data_button_info}>
                <div className={styles.testimonials_details_data_button}>
                  {buttonArray.map((data: any, index: number) => (
                    <button
                      type="button"
                      className={`${styles.testimonials_details_button} ${
                        clickData === index ? styles.testimonials_button_active : ''
                      }`}
                      key={index}
                      onClick={() => {
                        handleClick(index);
                        setButtonData(data);
                      }}>
                      {data}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.testimonials}>
            {windowWidth >= 1000 && (
              <div className={styles.testimonials_img}>
                {/* <TestimonialsImg /> */}
                <Image src={TestimonialsImg} width={200} height={350} alt="image not found" />
              </div>
            )}
            <div className={styles.testimonials_details_data}>
              <UcCarousel slides={testimonialsSlider} spaceBetween={10} slidesPerView={slidesPerView} showPagination />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Testimonials;
