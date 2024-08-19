import { UcBodyPortal } from '@uc/libs/shared/ui';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { DayContentProps, DayPicker, DayProps, FooterProps } from 'react-day-picker';
import { usePopper } from 'react-popper';
import { useOnClickOutside } from 'usehooks-ts';
// import Calendar from '@uc/assets/images/calendar.svg';
import { CalendarBlueIcon } from '@uc/libs/shared/ui';
import styles from './uc-date-picker.module.scss';

export interface UcDatePickerProps {
  label: string;
  placeholder: string;
  initialValue?: Date;
  minDate?: Date;
  maxDate?: Date;
  fareData?: any;
  onDateSelect: (data: Date) => void;
}

export function UcDatePicker({
  label,
  placeholder,
  initialValue,
  minDate,
  maxDate,
  fareData,
  onDateSelect,
}: UcDatePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const {
    styles: popperStyles,
    attributes,
    update,
  } = usePopper(referenceElement, popperElement, { placement: 'bottom-end' });
  const popperRef = useRef(null);

  useEffect(() => {
    setSelectedDay(initialValue);
  }, [initialValue, fareData]);

  const setPopperRef = (ref: any) => {
    popperRef.current = ref;
    setPopperElement(ref);
  };

  useOnClickOutside(popperRef, () => setShowDatePicker(false));

  const selectDate = (newDate: Date | undefined) => {
    if (newDate) {
      setSelectedDay(newDate);
      onDateSelect(newDate);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(true);
    update();
  };

  const selectedDateString = selectedDay ? format(selectedDay, 'd MMM, y') : placeholder;
  const dpValueStyle = selectedDay ? styles.dp_label : styles.dp_placeholder;

  const getPriceDetails = (date: Date) => {
    const monthStr = format(date, 'MM-yyyy');
    const dateStr = format(date, 'dd-MM-yyyy');
    return fareData && fareData[monthStr] ? fareData[monthStr][dateStr] : { amount: '--', color: '#ff0000' };
  };

  function DateCell({date,displayMonth,activeModifiers}: DayContentProps) {
    const fareDetails = getPriceDetails(date);
    return (
      <div className={styles.fare_cell}>
        <div className={styles.dt}>{date.getDate()}</div>
      </div>
    );
  }

  const weekDay = (date: Date) => {
    const dayName = format(date, 'E');
    const weekendClass = dayName === 'Sat' || dayName === 'Sun' ? 'weekend' : '';
    return <span className={weekendClass}>{dayName}</span>;
  };

  return (
    <>
      <div className={styles.flights_date_picker} onClick={toggleDatePicker} ref={setReferenceElement}>
        <span className={styles.inp_box_heading}>{label}</span>
        <div className={styles.date_input}>
          <div className={dpValueStyle}>{selectedDateString}</div>
          <CalendarBlueIcon />
        </div>
      </div>
      {showDatePicker ? (
        <UcBodyPortal>
          <div
            className="flights-date-picker_dp_dropdown"
            ref={setPopperRef}
            style={popperStyles.popper}
            {...attributes.popper}>
            <DayPicker
              mode="single"
              fromDate={minDate}
              toDate={maxDate}
              weekStartsOn={1}
              showOutsideDays={false}
              numberOfMonths={1}
              onSelect={selectDate}
              selected={selectedDay}
              components={{ DayContent: DateCell }}
              formatters={{ formatWeekdayName: weekDay }}
              modifiersClassNames={{
                selected: styles.dp_selected,
              }}
            />
          </div>
        </UcBodyPortal>
      ) : (
        ''
      )}
    </>
  );
}

export default UcDatePicker;
