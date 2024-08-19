import { useEffect, useState } from 'react';
import { formatToINR } from '@uc/utils';
import styles from './uc-fare-breakup-v2.module.scss';
import { PercentCircleLogo } from '../../..';

export interface FareDetail {
  fareName: string;
  fareDescription?: string;
  numberOfPassanger: number;
  passangerMultiplierTextShown: boolean;
  fareAmount: string;
  isCoupon?: boolean;
}
export interface ListComponents {
  headerText: string;
  list: FareDetail[]
}

export interface FareList {
  youSavedText?: {
    isYouSavedText: boolean;
    youSavedTextMessage?: string;
  };
  headerText: string;
  footerText: string;
  listComponents: ListComponents[];
}

export interface UcFareBreakupV2Interface {
  fareList: FareList;
  totalFareCallback?: (totalFare: number) => void;
}

function UcFareBreakupV2({ fareList, totalFareCallback }: UcFareBreakupV2Interface) {
  const totalFare =
    fareList?.listComponents.reduce((a, c) => a + c.list?.reduce((b, d) => b + d.fareAmount, 0), 0) ?? 0;
  useEffect(() => {
    totalFareCallback(totalFare);
  }, [totalFare]);
  return (
    <div>
      <div className={styles.fare_breakup}>
        <div className={styles.fare_heading}>{fareList.headerText}</div>
        {fareList?.listComponents.map((listComponentsObj: any, index: number) => (
          <div key={`listComponentsObj- ${index.toString()}`}>
            <div className={styles.flight_fare}>{listComponentsObj?.headerText}</div>
            <div className={styles.fares_box}>
              {listComponentsObj?.list?.map((data: any, listIndex: number) => (
                <div className={styles.fare_row} key={`list-${listIndex.toString()}`}>
                  <div className={styles.fare_row_left}>
                    <div
                      className={data?.isCoupon ? styles.fare_row_left_heading_discount : styles.fare_row_left_heading}>
                      {data.fareName} {data.passengerMultiplierTextShown && `X ${data.numberOfPassenger}`}
                    </div>
                    <div className={data?.isCoupon ? styles.fare_row_left_desc_discount : styles.fare_row_left_desc}>
                      {data.fareDescription}
                    </div>
                  </div>
                  <div className={data?.isCoupon ? styles.fare_row_right_discount : styles.fare_row_right}>
                    {formatToINR(data.fareAmount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.total_fare_row}>
          <div>
            {fareList.footerText}
            <div className={styles.total_fare_paid_using_text}>Paid using Net Banking</div>
          </div>
          <div>{formatToINR(totalFare)}</div>
        </div>
        {fareList.youSavedText.isYouSavedText && (
          <div className={styles.you_saved_banner_msite}>
            <PercentCircleLogo />{' '}
            <span className={styles.you_saved_banner_text}>{fareList?.youSavedText?.youSavedTextMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default UcFareBreakupV2;
