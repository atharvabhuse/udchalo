import Slider from '@mui/material/Slider';
import styles from './slider-filter.module.scss';

/* eslint-disable-next-line */
export interface SliderFilterProps {
  heading: string;
  sliderRange: {
    min: number;
    max: number;
    value: number;
  };
  labelFormatter: (value: number) => string;
  onValueChange: (event: any) => void;
}

export function SliderFilter({ heading, sliderRange, labelFormatter, onValueChange }: SliderFilterProps) {
  const classes = {
    track: {
      backgroundColor: '#32996A',
    },
    rail: {
      backgroundColor: '#A2DEBB',
    },
    thumb: {
      backgroundColor: '#32996A',
    },
  };

  const { min, max, value } = sliderRange;
  const sliderHandler = (event: Event, newValue: number | number[]) => {
    sliderRange.value = newValue as number;
    onValueChange({ range: { min, max }, value: newValue as number });
  };
  return (
    <>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.current_value}>{labelFormatter(value) || value}</div>
      <Slider
        valueLabelDisplay="auto"
        aria-labelledby="price"
        value={value}
        min={min}
        max={max}
        valueLabelFormat={labelFormatter}
        onChange={sliderHandler}
        sx={classes}
      />
      <div className={styles.row}>
        <div className={styles.range_label}>{labelFormatter(min) || min}</div>
        <div className={styles.range_label}>{labelFormatter(max) || max} </div>
      </div>
    </>
  );
}

export default SliderFilter;
