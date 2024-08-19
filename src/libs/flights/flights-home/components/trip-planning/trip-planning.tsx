import { IFlightBannerResponse } from '@uc/services/network';
import Image from 'next/image';
import styles from './trip-planning.module.scss';

interface TripPlanningProps {
  tripPlanningData: IFlightBannerResponse;
}
function TripPlanning(props: TripPlanningProps) {
  const { tripPlanningData } = props;
  return (
    <div className={styles.trip_details_body}>
      <div className={styles.trip_details_web}>
        {tripPlanningData && (
          <Image
            className={styles.trip_details_image}
            src={tripPlanningData?.banner_image_web?.data?.attributes?.url}
            width={tripPlanningData?.banner_image_web?.data?.attributes?.width}
            height={tripPlanningData?.banner_image_web?.data?.attributes?.height}
            alt={tripPlanningData?.banner_image_web?.data?.attributes?.name}
          />
        )}
      </div>
      <div className={styles.trip_details_msite}>
        {tripPlanningData && (
          <Image
            className={styles.trip_details_image}
            src={tripPlanningData?.banner_image?.data[0]?.attributes?.url}
            width={tripPlanningData?.banner_image?.data[0]?.attributes?.width}
            height={tripPlanningData?.banner_image?.data[0]?.attributes?.height}
            alt={tripPlanningData?.banner_image?.data[0]?.attributes?.name}
          />
        )}
      </div>
    </div>
  );
}

export default TripPlanning;
