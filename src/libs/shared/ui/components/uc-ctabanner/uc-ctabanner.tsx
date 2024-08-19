import { useRouter } from 'next/navigation';
import styles from './uc-ctabanner.module.scss';

/* eslint-disable-next-line */
interface Holiday {
  header: string;
  subHeader: string;
  ctaLink: string;
  link: string;
  backgroundImage: string;
}

export interface UcCTABannerProps {
  holiday: Holiday[];
}

export function UcCTABanner(props: UcCTABannerProps) {
  const { holiday } = props;

  const router = useRouter();
  const clickHandler = (link: string) => {
    router.push(link);
  };

  return (
    <div>
      {holiday?.map((data, index: number) => (
        <div
          className={styles.holiday_container}
          key={`holiday-${index}`}
          style={{
            backgroundImage: `url(${data?.backgroundImage})`,
          }}>
          <div className={styles.holiday_left}>
            <div className={styles.holiday_container_heading}>{data.header}</div>
            <div className={styles.holiday_container_desc}>{data.subHeader}</div>
          </div>
          <button type="button" onClick={() => clickHandler(data.link)} className={styles.holiday_right}>
            {data.ctaLink}
          </button>
        </div>
      ))}
    </div>
  );
}

export default UcCTABanner;
