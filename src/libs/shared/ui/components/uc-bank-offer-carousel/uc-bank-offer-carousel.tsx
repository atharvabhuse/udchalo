import SwiperCore, { Navigation, Scrollbar, A11y, Pagination } from 'swiper';
import Image from 'next/image';
import styles from './uc-bank-offer-carousel.module.scss';

SwiperCore.use([Navigation, Scrollbar, A11y, Pagination]);

/* eslint-disable-next-line */
export interface UcBankOfferCarouselProps {
  data: any;
}

export function UcBankOfferCarousel({ data }: UcBankOfferCarouselProps) {
  const bannerStyle = { backgroundColor: data?.backgroundColour };
  return (
    <div className={styles.advertisement_container}>
      <div className={styles.advertisement} style={bannerStyle}>
        <div className={styles.advertisement_section1}>
          <Image src={data?.BankImageMobile?.data?.attributes?.url} width={80} height={40} alt="bank" />
        </div>
        <div className={styles.advertisement_section2}>
          <div className={styles.advertisement_section2_discount}>
            <p>
              <span className={styles.advertisement_section2_bold}>{data?.title}</span>
            </p>
            {data?.couponcode && <p>Use Code {data.couponcode}</p>}
          </div>
          <div className={styles.advertisement_section2_condition}>T&C Apply</div>
        </div>
      </div>
    </div>
  );
}

export default UcBankOfferCarousel;
