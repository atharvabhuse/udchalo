import { BaggageAllowanceIcon } from '@uc/libs/shared/ui';
import { IBaggageOption } from '@uc/services/network';
import { useEffect, useState } from 'react';
import styles from './baggage-allowance.module.scss';
export interface BaggageAllowanceProps {
  checkInBaggage?: number;
  cabinBaggage?: number;
  excessBaggageOptions?: IBaggageOption[];
}

function BaggageAllowance({ checkInBaggage, cabinBaggage, excessBaggageOptions }: BaggageAllowanceProps) {
  const [optionWithLowestPrice, setOptionWithLowestPrice] = useState(null);

  const findLowestPriceOption = () => {
    if (excessBaggageOptions?.length > 0) {
      const lowestPriceOption = excessBaggageOptions?.reduce(
        (minOption: any, currentOption: any) => (currentOption.price < minOption.price ? currentOption : minOption),
        excessBaggageOptions[0]
      );
      setOptionWithLowestPrice(lowestPriceOption?.price);
    }
  };

  useEffect(() => {
    findLowestPriceOption();
  }, [excessBaggageOptions]);

  return (
    <div className={styles.baggage_allowance}>
      <div className={styles.baggage_allowance_container}>
        <div className={styles.baggage_allowance_header}>
          <div className={styles.icon}>
            <BaggageAllowanceIcon />
          </div>
          <div className={styles.title}>Baggage Allowance</div>
        </div>
        <div className={styles.cabin_baggage}>
          <span className={styles.dot} /> Cabin Baggage
          <span>{cabinBaggage} Kgs/person</span>
        </div>
        <div className={styles.check_in_baggage}>
          <span className={styles.dot} /> Check-In Baggage
          <span>1 piece X{checkInBaggage} Kgs/Person</span>
        </div>
      </div>
      {excessBaggageOptions?.length > 0 && (
        <div className={styles.excess_baggage}>
          <div className={styles.link}>Excess Baggage charge starts at ₹{optionWithLowestPrice}</div>
        </div>
      )}
    </div>
  );
}

export default BaggageAllowance;
