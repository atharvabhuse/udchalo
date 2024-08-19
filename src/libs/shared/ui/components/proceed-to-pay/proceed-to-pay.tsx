import { useGetAirports, usePostSaveBooking } from '@uc/services/network';
import {
  IndigoIcon,
  ProceedRightArrowIcon,
  CalanderGreyIcon,
  TravellerIcon,
  UcButton,
  DropdownMenuArrow,
} from '@uc/libs/shared/ui';
import { formatToINR } from '@uc/utils';
import { generateSaveBookingPayload } from '@uc/libs/flights/trip-summary/utils/trip-summary-data.utils';
import styles from './proceed-to-pay.module.scss';

/* eslint-disable-next-line */
export interface ProceedToPayProps {
  airline: string;
  originLabel: string;
  desitnationLabel: string;
  dateString: string;
  travellerCount: number;
  cabin: string;
  totalFare: number;
  isBorder: boolean;
  proceed: () => void;
  airlineIcon?: boolean;
}

export function ProceedToPay({ airline, originLabel, desitnationLabel, dateString, travellerCount, cabin, totalFare, proceed, airlineIcon, isBorder }: ProceedToPayProps) {
  const { data: airportsResponse } = useGetAirports();
  const airportList = airportsResponse?.data?.response;

  const originCity = airportList ? airportList[originLabel].city : '';
  const destinationCity = airportList ? airportList[desitnationLabel].city : '';
  const formattedFare = formatToINR(totalFare);
  const saveBookingApiMutation = usePostSaveBooking();

  const proceedHandler = () => {
    proceed();
  };
  return (
    <div className={`${styles.proceed_to_pay} ${isBorder ? styles.no_border : ''}`}>
      <div className={styles.proceed_to_pay_detail}>
        <div className={styles.proceed_to_pay_icon}>
          {airlineIcon === false ? (
            ''
          ) : (
            <img src={`https://static.udchalo.com/client_assets/img/airline_logo/${airline}.png`} alt="airline logo" />
          )}
        </div>
        <div className={styles.proceed_to_pay_detail_heading_col}>
          <div className={styles.proceed_to_pay_detail_heading_row}>
            <div className={styles.proceed_to_pay_detail_heading}>
              {originCity} ({originLabel})
            </div>
            <div>
              <ProceedRightArrowIcon />
            </div>
            <div className={styles.proceed_to_pay_detail_heading}>
              {destinationCity} ({desitnationLabel})
            </div>
          </div>
          <div className={styles.proceed_to_pay_detail_desc_row}>
            <CalanderGreyIcon />
            <div className={styles.proceed_to_pay_date}>{dateString}</div>
            <TravellerIcon />
            <div className={styles.proceed_to_pay_detail_desc_row}>{travellerCount} Traveller(s)</div>
            <div>|</div>
            <div className={styles.economy}>{cabin}</div>
          </div>
        </div>
      </div>
      <div className={styles.total_fare_box}>
        <div className={styles.total_fare_heading}>Total Fare</div>
        <div className={styles.total_fare_desc}>{formattedFare}</div>
        <div className={styles.view_fare_break_up}>
          View Fare Breakup
          <span className={styles.dropdown_icon}>
            <DropdownMenuArrow />
          </span>
        </div>
      </div>
      <div className={styles.proceed_box}>
        <UcButton variant="contained" color="primary" className={styles.proceed_button} onClick={proceedHandler}>
          Proceed to Pay
        </UcButton>
      </div>
    </div>
  );
}

export default ProceedToPay;
