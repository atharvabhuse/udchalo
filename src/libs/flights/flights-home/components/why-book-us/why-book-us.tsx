import Image from 'next/image';
import { UcCarousel } from '@uc/libs/shared/ui';
import { IWhyBookUs, IWhyBookWithUs } from '@uc/services/network';
import styles from './why-book-us.module.scss';

interface WhyBookWithUsProps {
  whyBookUsDetails: IWhyBookUs;
  windowWidth: number;
}
function WhyBookUs(props: WhyBookWithUsProps) {
  const { whyBookUsDetails, windowWidth } = props;
  const slidesPerViewBookUsCard = () => {
    switch (true) {
      case windowWidth <= 350:
        return 1;
      case windowWidth <= 400:
        return 1.3;
      case windowWidth <= 500:
        return 1.5;
      default:
        return 3;
    }
  };

  const whyBookUsSliderCard =
    whyBookUsDetails &&
    (whyBookUsDetails?.whyBookUs || [])?.map((whyBookWithUsData: IWhyBookWithUs) => (
      <div key={whyBookWithUsData?.id} className={styles.why_bookUs_body_new}>
        <div className={styles.why_bookUs_card_new}>
          <Image
            className={styles.why_bookUs_card_img}
            src={whyBookWithUsData?.icon?.data?.attributes?.url}
            width={30}
            height={30}
            alt={whyBookWithUsData?.icon?.data?.attributes?.name}
          />
          <p className={styles.why_bookUs_card_content}>{whyBookWithUsData?.description}</p>
        </div>
      </div>
    ));

  return (
    <div className={styles.why_bookUs_img}>
      {whyBookUsDetails && (
        <div className={styles.why_bookUs_img_info}>
          <div className={styles.why_bookUs_title}>
            <div>{whyBookUsDetails?.title}</div>
          </div>
          {windowWidth >= 1000 ? (
            <div className={styles.why_bookUs_body}>
              {whyBookUsDetails &&
                (whyBookUsDetails?.whyBookUs || [])?.map((whyBookWithUsData: IWhyBookWithUs) => (
                  <div key={whyBookWithUsData.id} className={styles.why_bookUs_card}>
                    <Image
                      className={styles.why_bookUs_card_img}
                      src={whyBookWithUsData?.icon?.data?.attributes?.url}
                      width={30}
                      height={30}
                      alt="card image"
                    />
                    <p className={styles.why_bookUs_card_content}>{whyBookWithUsData?.description}</p>
                  </div>
                ))}
            </div>
          ) : (
            <div className={styles.why_bookUs_body_slider}>
              <div className={styles.why_bookUs_slider_view}>
                <UcCarousel slides={whyBookUsSliderCard} spaceBetween={0} slidesPerView={slidesPerViewBookUsCard()} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WhyBookUs;
