import { UcCarousel } from '@uc/libs/shared/ui';
import { IPopularHolidaysDestination } from '@uc/services/network';
import { useState } from 'react';
import Meal from '@uc/assets/images/meal.svg';
import PickupDrop from '@uc/assets/images/PickupDrop.svg';
import { Button } from '@mui/material';
import styles from './holiday-destination.module.scss';

interface HolidayDestinationProps {
  popularHolidayDestinations: IPopularHolidaysDestination[];
  windowWidth: number;
}

function HolidayDestination(props: HolidayDestinationProps) {
  const { popularHolidayDestinations, windowWidth } = props;
  const [isShow, setIsShow] = useState<number>();
  const destinationHeaders = {
    destination: 'Popular Holiday Destination',
    destinationDetails: 'Dekho apna desh with udChalo Holidays!',
  };

  const holidayDestinationSlider =
    popularHolidayDestinations &&
    (popularHolidayDestinations || [])
      ?.filter(destination => destination.type !== 'international')
      ?.map(destination => (
        <div
          className={styles.destination_card}
          key={destination?.packageId}
          onMouseOver={() => setIsShow(destination?.packageId)}
          onFocus={() => {}}
          onMouseLeave={() => setIsShow(100.0)}>
          <div
            className={styles.destination_image}
            style={{
              backgroundImage: `url(${destination?.cardImages?.desktop[0]})`,
            }}>
            {isShow !== destination?.packageId ? (
              <div className={styles.destination_image_data}>
                <div className={styles.destination_image_data1}>
                  <div className={styles.destination_image_info}>{destination?.category[0]}</div>
                  <div className={styles.destination_image_details}>{destination?.title}</div>
                  <div className={styles.destination_image_info_new}>{destination?.duration}</div>
                </div>
                <div className={styles.destination_image_data2}>
                  <div className={styles.destination_image_info}>Starting From</div>
                  <div className={styles.destination_image_details}>₹{destination?.amount}</div>
                  <div className={styles.destination_image_info_last}>Per Person*</div>
                </div>
              </div>
            ) : (
              <div className={styles.destination_image}>
                <div className={styles.destination_image_data_hover}>
                  <div className={styles.destination_image_data1_hover}>
                    <div className={styles.destination_image_details_hover}>{destination?.title}</div>
                    <div className={styles.destination_image_info_new_hover}>{destination?.duration}</div>
                  </div>
                  <div className={styles.destination_image_data2_hover}>
                    <div className={styles.destination_image_info_hover}>Starting From</div>
                    <div className={styles.destination_image_details_hover}>₹{destination?.amount}</div>
                    <div className={styles.destination_image_info_last_hover}>Per Person*</div>
                  </div>
                </div>
                <div className={styles.card_image_hover}>
                  <div className={styles.meal_image}>
                    <Meal />
                    <div>Meal</div>
                    <div>{destination?.food}</div>
                  </div>
                  <div className={styles.pickUp_drop_image}>
                    <PickupDrop />
                    <div>Pickup - Drop</div>
                    <div>{destination?.travel}</div>
                  </div>
                </div>
                <div className={styles.card_button_hover}>
                  <div>
                    <Button variant="contained" className={styles.card_button_inquire}>
                      Inquire Now
                    </Button>
                  </div>
                  <div>
                    <Button variant="contained" className={styles.card_button_view}>
                      View More
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ));

  const holidayDestinationSliderForMsite =
    popularHolidayDestinations &&
    (popularHolidayDestinations || [])
      .filter(destination => destination.type !== 'international')
      .map(destination => (
        <div className={styles.destination_card} key={destination?.packageId}>
          <div
            className={styles.destination_image_msite}
            style={{
              backgroundImage: `url(${destination?.cardImages?.mobile[0]})`,
            }}>
            <div className={styles.destination_image_data}>
              <div className={styles.destination_image_data1}>
                <div className={styles.destination_image_info}>{destination?.category[0]}</div>
                <div className={styles.destination_image_details}>{destination?.title}</div>
                <div className={styles.destination_image_info_new}>{destination?.duration}</div>
              </div>
              <div className={styles.destination_image_data2}>
                <div className={styles.destination_image_info}>Starting From</div>
                <div className={styles.destination_image_details}>₹{destination?.amount}</div>
                <div className={styles.destination_image_info_last}>Per Person*</div>
              </div>
            </div>
          </div>
        </div>
      ));

  const slidesPerViewInfo = () => {
    switch (true) {
      case windowWidth <= 350:
        return 1.0;
      case windowWidth <= 400:
        return 1.1;
      case windowWidth <= 500:
        return 1.3;
      case windowWidth <= 1300:
        return (holidayDestinationSlider || []).length > 2 ? 2 : (holidayDestinationSlider || []).length;
      default:
        return (holidayDestinationSlider || []).length > 3 ? 3 : (holidayDestinationSlider || []).length;
    }
  };

  const holidayDestinationSpaceBetween = windowWidth >= 1050 ? 40 : 0;
  return (
    <div className={styles.destination}>
      <div className={styles.destination_heading}>
        <div className={styles.destination_title}>{destinationHeaders.destination}</div>
        <div className={styles.destination_destination}>{destinationHeaders.destinationDetails}</div>
      </div>
      <div className={styles.destination_card_main}>
        <div className={styles.destination_card_main_view}>
          {popularHolidayDestinations && (
            <UcCarousel
              slides={windowWidth < 650 ? holidayDestinationSliderForMsite : holidayDestinationSlider}
              spaceBetween={holidayDestinationSpaceBetween}
              slidesPerView={slidesPerViewInfo()}
              showPagination
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default HolidayDestination;
