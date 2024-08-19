import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useState, useEffect } from 'react';
import { DropDownArrow } from '@uc/assets/images';
import { UcFareBreakup } from '@uc/libs/shared/ui/components/uc-fare-breakup/uc-fare-breakup';
import styles from './flights-popup-fare-accordion.module.scss';

/* eslint-disable-next-line */
export interface FlightsPopupFareAccordionProps {
  review;
  discount;
  travelerDetailsArray;
  nextBtnCallback;
  resultValueNew;
  nextButtonCallback;
}

export function FlightsPopupFareAccordion({
  review,
  discount,
  travelerDetailsArray,
  nextBtnCallback,
  resultValueNew,
  nextButtonCallback,
}: FlightsPopupFareAccordionProps) {
  const [mealTotal, setMealTotal] = useState(0);
  useEffect(() => {
    if (resultValueNew) {
      const mealTotalData = resultValueNew.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
      setMealTotal(mealTotalData);
    }
  }, [resultValueNew]);

  const [totalFare, setTotalFare] = useState();
  const fareHandler = data => {
    setTotalFare(data);
  };

  const [initialTotalFare, setInitialTotalFare] = useState();
  const totalFareHandler = data => {
    setInitialTotalFare(data);
  };

  const nextHandler = () => {
    nextBtnCallback('clicked');
    nextButtonCallback();
  };

  const [expanded, setExpanded] = useState(false);

  const expandHandler = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion className={styles.accordion_fare} expanded={expanded}>
      <AccordionSummary className={styles.select_seat_fare_breakup_summary}>
        <div className={styles.fare_column}>
          <div className={styles.fare}>
            `₹
            {totalFare}
          </div>
          <div className={styles.fare_breakup_row}>
            <div className={styles.fare_breakup_text} onClick={expandHandler}>
              View Breakup
            </div>
            <DropDownArrow />
            <div className={styles.seat_selected}>Seat 2 of 2</div>
          </div>
        </div>

        <div className={styles.next_button_column}>
          <button type="button" onClick={nextHandler} className={styles.next_btn}>
            Next
          </button>
        </div>
      </AccordionSummary>

      <AccordionDetails className={styles.select_seat_fare_breakup_detail}>
        <>
          <UcFareBreakup
            review={review}
            discount={discount}
            seatFees={travelerDetailsArray}
            totalFare={totalFareHandler}
            fareChangeCallback={fareHandler}
            mealTotal={mealTotal}
          />
          <div className={styles.proceed_to_pay_text}>
            By clicking on Proceed to Pay, I agree to udChalo's{' '}
            <div className={styles.terms}> Terms and Conditions</div>
          </div>
        </>
      </AccordionDetails>
    </Accordion>
  );
}

export default FlightsPopupFareAccordion;
