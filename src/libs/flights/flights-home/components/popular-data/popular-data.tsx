import { useGetFlightHomePageData } from '@uc/services/network';
import styles from './popular-data.module.scss';

interface PopularDataList {
  title: string;
  description: string;
}

function PopularData() {
  const { data, isSuccess } = useGetFlightHomePageData();

  return (
    <div className={styles.popular}>
      {isSuccess && (
        <div className={styles.popular_main}>
          {data?.data?.popularInformation?.map((popularData: PopularDataList, index: number) => (
            <div key={index} className={styles.popular_main_container}>
              <h1 className={styles.link_description}>{popularData.title}</h1>
              <div className={styles.place_link}>{popularData.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PopularData;
