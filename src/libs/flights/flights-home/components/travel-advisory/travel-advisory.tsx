import Image from 'next/image';
import { useState } from 'react';
import { UcCarousel } from '@uc/libs/shared/ui';
import { IFlightLandingPageDetail, ITravelAdvisory } from '@uc/services/network';
import styles from './travel-advisory.module.scss';

interface TravelAdvisoryProps {
  travelAdvisoryData: ITravelAdvisory;
  windowWidth: number;
}
function TravelAdvisory(props: TravelAdvisoryProps) {
  const { travelAdvisoryData, windowWidth } = props;
  const [activeId, setActiveId] = useState<number | null>();

  const handleClick = (index: number) => {
    setActiveId(index);
  };

  const travelAdvisoryHeaders = {
    header: 'Travel Advisory',
    subtitle: 'Get updated with latest travel advisory for various cities before traveling',
  };
  const advisorySlider =
    travelAdvisoryData &&
    (travelAdvisoryData?.TravelAdvisory || [])?.map((travelAdvisory: IFlightLandingPageDetail, index: number) => (
      <div
        className={`${styles.card} ${activeId === index ? styles.active_card : ''}`}
        key={travelAdvisory?.id}
        onClick={() => handleClick(index)}>
        <div className={styles.cardImage}>
          <Image
            src={travelAdvisory?.icon?.data[0]?.attributes?.url}
            width={125}
            height={121}
            alt={travelAdvisory?.icon?.data[0]?.attributes?.name}
          />
        </div>
        <div className={styles.card_titles}>
          <h1 className={styles.title}>{travelAdvisory?.title}</h1>
          <div className={styles.card_description}>{travelAdvisory?.descripton}</div>
          <div className={styles.card_cta}>{travelAdvisory?.ctatext}</div>
        </div>
      </div>
    ));

  const slidesPerViewDefault =
    travelAdvisoryData && (travelAdvisoryData?.TravelAdvisory || [])?.length < 3
      ? (travelAdvisoryData?.TravelAdvisory || [])?.length
      : 3;

  const slidesPerViewInfo = () => {
    switch (true) {
      case windowWidth <= 350:
        return 1.0;
      case windowWidth <= 400:
        return 1.15;
      case windowWidth <= 500:
        return 1.4;
      case windowWidth <= 1300:
        return slidesPerViewDefault;
      default:
        return slidesPerViewDefault;
    }
  };

  const slidesPerView = slidesPerViewInfo();

  return (
    <div className={styles.main}>
      {travelAdvisoryData && (
        <div className={styles.main_advisory}>
          <div>
            <div className={styles.advisory_titles}>
              <div className={styles.title}>
                <div>{travelAdvisoryData?.title || travelAdvisoryHeaders?.header}</div>
                <div className={styles.view_all}>View All</div>
              </div>
              <h1 className={styles.subtitle}>{travelAdvisoryHeaders?.subtitle}</h1>
            </div>
            <div className={styles.card_container}>
              <UcCarousel slides={advisorySlider} spaceBetween={34} slidesPerView={slidesPerView} showPagination />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TravelAdvisory;
