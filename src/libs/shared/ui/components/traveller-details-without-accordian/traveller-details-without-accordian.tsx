import { UcCard, TravellerIconWithBg } from '@uc/libs/shared/ui';
import styles from './traveller-details-without-accordian.module.scss';

export interface TravellerData {
  travellerName: string;
  gender: string;
  seatNo: string;
  meal: string;
  ExcessBaggage: string;
}
export interface TravellerDetailsWithoutAccordianProps {
  travelerDetails: TravellerData[];
}

export function TravellerDetailsWithoutAccordian({ travelerDetails }: TravellerDetailsWithoutAccordianProps) {
  return (
    <div className={styles.traveller_details_container}>
      <UcCard>
        <div className={styles.traveller_icon_and_title}>
          <span className={styles.traveller_icon}>
            <TravellerIconWithBg />
          </span>
          <span className={styles.header}>Traveller Details</span>
        </div>

        <div className={styles.traveller_details_container}>
          {travelerDetails.map((data, index) => (
            <div className={styles.traveller_details}>
              <div className={styles.traveller_name}>
                <span>
                  <li />
                </span>
                <span>{`${data.travellerName} (${data.gender})`}</span>
              </div>

              <div className={styles.seat_meal_and_baggage}>
                <span>{`Seat : ${data.seatNo} |  Meal : ${data.meal} | Excess Baggage : ${data.ExcessBaggage}`}</span>
              </div>
            </div>
          ))}
        </div>
      </UcCard>
    </div>
  );
}

export default TravellerDetailsWithoutAccordian;
