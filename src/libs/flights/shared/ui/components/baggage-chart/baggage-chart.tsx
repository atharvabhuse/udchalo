import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './baggage-chart.module.scss';

export interface IBaggageOption {
  code: string | null;
  price: number | null;
  text: string | null;
  value: string | null;
}
export interface BaggageChartProps {
  baggageOptions: IBaggageOption[];
  onBaggageSelect: (value: IBaggageOption | undefined) => void;
  selectedBaggage?: IBaggageOption;
}

interface IBaggageLabel {
  label: string;
  price: number;
}

export function BaggageLabel({ label, price }: IBaggageLabel) {
  return (
    <div className={styles.lbl_box}>
      <p>{label}</p>
      <p className={styles.price}>{`₹ ${price}`}</p>
    </div>
  );
}

export function BaggageChart(props: BaggageChartProps) {
  const { baggageOptions = [], onBaggageSelect, selectedBaggage } = props;
  const [baggageValue, setBaggageValue] = useState<string>('');

  useEffect(() => {
    setBaggageValue(selectedBaggage?.code || '');
  }, [selectedBaggage]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event?.target?.value;
    setBaggageValue(selectedValue);
    const applyBaggage = baggageOptions && (baggageOptions || [])?.find(baggage => baggage?.code === selectedValue);
    onBaggageSelect(applyBaggage);
  };

  const baggageOptionsRender = () =>
    baggageOptions &&
    (baggageOptions || [])?.map(baggage => (
      <FormControlLabel
        className={styles.bg_lbl}
        labelPlacement="start"
        value={baggage?.code}
        key={baggage?.code}
        control={<Radio />}
        sx={{
          '& .MuiRadio-root': {
            padding: '0px',
          },
          '& .MuiTypography-root': {
            width: '100%',
          },
        }}
        label={<BaggageLabel label={baggage?.text} price={baggage?.price} />}
      />
    ));

  return (
    <div className={styles.container}>
      {baggageOptions && baggageOptions?.length > 0 ? (
        <RadioGroup name="excess-baggage-group" className={styles.bg_grid} value={baggageValue} onChange={handleChange}>
          {baggageOptionsRender()}
        </RadioGroup>
      ) : (
        <div className={styles.no_baggage}>This flight does not have excess baggage options.</div>
      )}
    </div>
  );
}

export default BaggageChart;
