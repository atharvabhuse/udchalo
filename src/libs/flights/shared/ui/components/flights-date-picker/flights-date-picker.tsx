import { UcBodyPortal, CalendarBlueIcon } from '@uc/libs/shared/ui';
import { add, format, isValid } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { DayContentProps, DayPicker, DayProps, FooterProps } from 'react-day-picker';
import { usePopper } from 'react-popper';
import { useOnClickOutside } from 'usehooks-ts';
// import Calendar from '@uc/assets/images/calendar.svg';
import styles from './flights-date-picker.module.scss';

export interface FlightsDatePickerProps {
  label?: string;
  placeholder: string;
  initialValue?: Date;
  minDate?: Date;
  fareData?: any;
  onDateSelect: (data: Date) => void;
  errorMessage?: string;
}

function FlightsDatePicker({
  label,
  placeholder,
  initialValue,
  minDate,
  fareData,
  onDateSelect,
  errorMessage,
}: FlightsDatePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const {
    styles: popperStyles,
    attributes,
    update,
  } = usePopper(referenceElement, popperElement, { placement: 'bottom-start' });
  const popperRef = useRef(null);

  useEffect(() => {
    setSelectedDay(initialValue);
  }, [fareData,initialValue]);

  const setPopperRef = (ref: any) => {
    popperRef.current = ref;
    setPopperElement(ref);
  };

  useOnClickOutside(popperRef, () => {
    setShowDatePicker(false);
  });

  const selectDate = (newDate: Date | undefined) => {
    if (newDate) {
      setSelectedDay(newDate);
      onDateSelect(newDate);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(true);
    update && update();
  };

  const selectedDateString = selectedDay && isValid(selectedDay) ? format(selectedDay, 'd MMM, y') : placeholder;
  const dpValueStyle = selectedDay ? styles.dp_label : styles.dp_placeholder;
  const inputHeadingClassName = errorMessage
    ? `${styles.inp_box_heading} ${styles.inp_box_heading_error}`
    : styles.inp_box_heading;
  const dateInputClassName = errorMessage ? `${styles.date_input} ${styles.date_input_error}` : styles.date_input;

  const getPriceDetails = (date: Date) => {
    const monthStr = format(date, 'MM-yyyy');
    const dateStr = format(date, 'dd-MM-yyyy');
    return fareData && fareData[monthStr] ? fareData[monthStr][dateStr] : { amount: '--', color: '#ff0000' };
  };

  function DateCell(props: DayContentProps) {
    const fareDetails = getPriceDetails(props.date);
    return (
      <div className={styles.fare_cell}>
        <div className={styles.dt}>{props.date.getDate()}</div>
        <div className={styles.price} style={{ color: fareDetails.color }}>
          {fareDetails.amount}
        </div>
      </div>
    );
  }

  const weekDay = (date: Date) => {
    const dayName = format(date, 'E');
    const weekendClass = dayName === 'Sat' || dayName === 'Sun' ? 'weekend' : '';
    return <span className={weekendClass}>{dayName}</span>;
  };

  const toDate: Date = add(new Date(), { years: 1 });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.flights_date_picker} onClick={toggleDatePicker} ref={setReferenceElement}>
          <span className={inputHeadingClassName}>{label}</span>
          <div className={dateInputClassName}>
            <div className={dpValueStyle}>{selectedDateString}</div>
            <CalendarBlueIcon />
          </div>
        </div>
        {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
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
              toDate={toDate}
              weekStartsOn={1}
              showOutsideDays={false}
              numberOfMonths={window.innerWidth < 600 ? 1 : 2}
              onSelect={selectDate}
              selected={selectedDay}
              components={{ DayContent: DateCell }}
              formatters={{ formatWeekdayName: weekDay }}
              modifiersClassNames={{
                selected: styles.dp_selected,
              }}
            />
            <div className="holiday-footer">
              <div className="holiday-info">No holidays this month</div>
              <div className="holiday-info">No holidays this month</div>
            </div>
          </div>
        </UcBodyPortal>
      ) : (
        ''
      )}
    </>
  );
}

export default FlightsDatePicker;
