import Image from 'next/image';
import ResetIcon from '@uc/assets/images/reset.png';
import { MultiSelectFilter, SliderFilter } from '@uc/libs/shared/ui';
import styles from './filter.module.scss';
import { FlightSearchFilters } from '../../models';

/* eslint-disable-next-line */
export interface FilterProps {
  filters: FlightSearchFilters;
  onFilter: (filters: any) => void;
  onReset: () => void;
}
export interface SliderFilterObj {
  enabled: boolean;
  label: string;
  max: number;
  min: number;
  value: number;
}
export interface CheckFilterObj {
  all: { label: string; selected: boolean; value: number }[];
  selected: { label: string; selected: boolean; value: number }[];
}

type FilterObj = SliderFilterObj | CheckFilterObj;

export function Filter({ filters, onFilter, onReset }: FilterProps) {
  const { price, tripDuration, stops, departure, preferredAirlines } = filters;

  // Formatters
  const INR = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  const priceLableFormatter = (value: number = 0) => INR.format(value);
  const durationLabelFormatter = (value: number = 0) => `${(value / 60).toString().split('.')[0]}h ${value % 60}m`;

  // Change handlers
  const resetHandler = () => onReset();
  const updateFilter = () => onFilter(filters);
  

  return (
    <div className={styles.filter}>
      <div className={styles.filter_heading_row}>
        <div className={styles.filter_by}>Filter By</div>
        <div className={styles.reset_filters} onClick={resetHandler} onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                resetHandler();
              }
            }} role='none'>
          <div className={styles.resetIcon_wrapper}>
            <Image src={ResetIcon} width={14} height={14} alt="reset" />
          </div>
          <div
            role="button"
            tabIndex={0}>
            Reset Filters
          </div>{' '}
        </div>
      </div>

      <SliderFilter
        heading={price.label}
        onValueChange={updateFilter}
        sliderRange={price}
        labelFormatter={priceLableFormatter}
      />

      <MultiSelectFilter config={stops} selectionChange={updateFilter} />

      <MultiSelectFilter config={departure} selectionChange={updateFilter} />

      <MultiSelectFilter config={preferredAirlines} selectionChange={updateFilter} />

      <SliderFilter
        heading={tripDuration.label}
        onValueChange={updateFilter}
        sliderRange={tripDuration}
        labelFormatter={durationLabelFormatter}
      />
    </div>
  );
}

export default Filter;
