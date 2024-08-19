import { CircularProgress, Drawer } from '@mui/material';
import { CalendarBlueIcon, Notification } from '@uc/assets/images';
import { MSiteUcHeader, UcButton } from '@uc/libs/shared/ui';
import { add, format, isValid } from 'date-fns';
import { useEffect, useState } from 'react';
import { CaptionProps, ClassNames, DayContentProps, DayPicker } from 'react-day-picker';
import dayPickerStyles from 'react-day-picker/dist/style.module.css';
import styles from './flights-date-picker-msite.module.scss';

interface DatePickerMsiteProps {
  labelForDeparture?: string;
  labelForReturn?: string;
  placeholderForDeparture: string;
  placeholderForReturn: string;
  initialValue?: SelectedDates;
  minDate?: Date;
  fareData?: any;
  onwardDateSelect: (data: Date) => void;
  returnDateSelect: (data: Date) => void;
  errorMessage: ErrorMessage;
  tripType: string;
  setRoundTrip: () => void;
}
type TabTypes = 'Departure' | 'Return';

interface SelectedDates {
  departureDate?: Date | undefined;
  returnDate?: Date | undefined;
}

interface ErrorMessage {
  departDate: string;
  returnDate: string;
}

function DatePickerMsite(props: DatePickerMsiteProps) {
  const [selectedTab, setSelectedTab] = useState<TabTypes>('Departure');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState<SelectedDates>({
    departureDate: undefined,
    returnDate: undefined,
  });
  const {
    errorMessage,
    labelForDeparture,
    labelForReturn,
    placeholderForDeparture,
    placeholderForReturn,
    initialValue,
    minDate,
    fareData,
    tripType,
    onwardDateSelect,
    returnDateSelect,
    setRoundTrip,
  } = props;

  useEffect(() => {
    setSelectedDay(initialValue);
  }, [initialValue,fareData]);

  const getPriceDetails = (date: Date) => {
    const monthStr = format(date, 'MM-yyyy');
    const dateStr = format(date, 'dd-MM-yyyy');
    return fareData && fareData[monthStr] ? fareData[monthStr][dateStr] : { amount: '--', color: '#ff0000' };
  };

  const selectedDepartureDateString = selectedDay.departureDate && isValid(selectedDay.departureDate)
    ? format(selectedDay.departureDate, 'd MMM, y')
    : placeholderForDeparture;
  const selectedReturnDateString = selectedDay.returnDate && isValid(selectedDay.returnDate)
    ? format(selectedDay.returnDate, 'd MMM, y')
    : placeholderForReturn;
  const dpValueStyleForDeparture = selectedDay.departureDate ? styles.dp_label : styles.dp_placeholder;
  const dpValueStyleForReturn = selectedDay.returnDate ? styles.dp_label : styles.dp_placeholder;
  const inputHeadingClassNameForDeparture = errorMessage.departDate
    ? `${styles.inp_box_heading} ${styles.inp_box_heading_error}`
    : styles.inp_box_heading;
  const inputHeadingClassNameForReturn = errorMessage.returnDate
    ? `${styles.inp_box_heading} ${styles.inp_box_heading_error}`
    : styles.inp_box_heading;
  const dateInputClassNameForDeparture = errorMessage.departDate
    ? `${styles.date_input} ${styles.date_input_error}`
    : styles.date_input;
  const dateInputClassNameForReturn = errorMessage.returnDate
    ? `${styles.date_input} ${styles.date_input_error}`
    : styles.date_input;

  const chooseDate = (newDate: Date | undefined) => {
    if (newDate) {
      switch (selectedTab) {
        case 'Departure':
          setSelectedDay(prevState => ({
            ...prevState,
            departureDate: newDate,
          }));
          onwardDateSelect(newDate);
          break;
        case 'Return':
          setSelectedDay(prevState => ({
            ...prevState,
            returnDate: newDate,
          }));
          returnDateSelect(newDate);
          break;
        default:
          break;
      }
    }
  };

  const selectDate = () => {
    switch (selectedTab) {
      case 'Departure':
        if (tripType === 'oneway' && selectedDay.departureDate) {
          setShowDatePicker(false);
        } else {
          setSelectedTab('Return');
        }
        break;
      case 'Return':
        if (selectedDay.returnDate) {
          setShowDatePicker(false);
        }
        break;
      default:
        break;
    }
  };

  const tabArray = [
    {
      name: 'Departure',
      label: 'Departure',
      value: selectedDay.departureDate ? `${selectedDepartureDateString}` : 'Add Departure Date',
    },
    {
      name: 'Return',
      label: 'Save more on Round Trip',
      value: selectedDay.returnDate ? `${selectedReturnDateString}` : 'Add Return Date',
    },
  ];

  const toggleDatePicker = (tab: TabTypes) => {
    setSelectedTab(tab);
    setShowDatePicker(true);
  };
  const toDate: Date = add(new Date(), { years: 1 });

  const minMonth = minDate.getMonth();
  const toMonth = toDate.getMonth();
  const monthsToShow = (toDate.getFullYear() - minDate.getFullYear()) * 12 + (toMonth - minMonth) + 1;

  const monthArray = Array.from({ length: monthsToShow }, (_, index) => {
    const monthDate = new Date(minDate.getFullYear(), minMonth + index, 1);
    return monthDate;
  });

  const dayPickerClassNames: ClassNames = {
    ...dayPickerStyles,
    root: `${styles.rdp_root}`,
    month: `${styles.rdp_month}`,
    months: `${styles.rdp_months}`,
    table: `${styles.rdp_table}`,
    head_cell: 'rdp-head_cell',
  };
  const weekDay = (date: Date) => {
    const dayName = format(date, 'E');
    const weekendClass = dayName === 'Sat' || dayName === 'Sun' ? 'weekend' : '';
    return <span className={weekendClass}>{dayName}</span>;
  };

  const customCaption = (captionProps: CaptionProps) => {
    const { displayMonth } = captionProps;
    return (
      <div className={styles.caption_container}>
        <div className={styles.caption_label}>{format(displayMonth, 'MMMM yyy')}</div>
        <CircularProgress size={14} />
      </div>
    );
  };

  const dateCell = (prop: DayContentProps) => {
    const { date } = prop;
    const fareDetails = getPriceDetails(date);
    return (
      <div className={styles.fare_cell}>
        <div className={styles.dt}>{date.getDate()}</div>
        <div className={styles.price} style={{ color: fareDetails && fareDetails.color }}>
          {fareDetails && fareDetails.amount}
        </div>
      </div>
    );
  };

  const holidays = (
    <div className={styles.holiday_label}>
      <div className={styles.green_bullets} />
      25 Dec : Christmas
    </div>
  );

  return (
    <div>
      <div>
        <div className={styles.date_picker_btn_container}>
          <div className={styles.flights_date_picker} onClick={() => toggleDatePicker('Departure')}>
            <span className={inputHeadingClassNameForDeparture}>{labelForDeparture}</span>
            <div className={dateInputClassNameForDeparture}>
              <div className={dpValueStyleForDeparture}>{selectedDepartureDateString}</div>
              <CalendarBlueIcon />
            </div>
            {errorMessage.departDate && <p className={styles.error_message}>{errorMessage.departDate}</p>}
          </div>
          <div
            className={styles.flights_date_picker}
            onClick={() => {
              toggleDatePicker('Return');
              setRoundTrip();
            }}>
            <span className={inputHeadingClassNameForReturn}>{labelForReturn}</span>
            <div className={dateInputClassNameForReturn}>
              <div className={dpValueStyleForReturn}>{selectedReturnDateString}</div>
              <CalendarBlueIcon />
            </div>
            {errorMessage.returnDate && <p className={styles.error_message}>{errorMessage.returnDate}</p>}
          </div>
        </div>
      </div>
      {showDatePicker && (
        <Drawer
          open={showDatePicker}
          PaperProps={{
            style: {
              height: '100%',
              width: '100%',
              backgroundColor: 'white',
            },
          }}
          onClose={() => setShowDatePicker(false)}>
          <div>
            <MSiteUcHeader backHandler={() => setShowDatePicker(false)}>
              <MSiteUcHeader.LeftContent>Search Flights</MSiteUcHeader.LeftContent>
              <MSiteUcHeader.RightContent>
                <Notification />
              </MSiteUcHeader.RightContent>
            </MSiteUcHeader>
            {(tripType !== 'oneway' || selectedTab === 'Return') && (
              <div className={styles.tab_container}>
                {tabArray.map((item, index) => {
                  const uniqueKey = `tabArray-${index}`;
                  return (
                    <div
                      className={`${styles.tab} ${item.name === selectedTab ? styles.tab_active : ''}`}
                      key={uniqueKey}
                      onClick={() => setSelectedTab(item.name as TabTypes)}>
                      <div
                        className={`${styles.tab_label} ${item.name === selectedTab ? styles.tab_label_active : ''}`}>
                        {item.label}
                      </div>
                      <div
                        className={`${styles.tab_value} ${item.name === selectedTab ? styles.tab_value_active : ''}`}>
                        {item.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div>
              <DayPicker
                mode="single"
                disableNavigation
                fromDate={selectedTab === 'Departure' ? minDate : selectedDay.departureDate}
                toDate={toDate}
                weekStartsOn={1}
                showOutsideDays={false}
                numberOfMonths={monthArray.length}
                onSelect={date => chooseDate(date)}
                selected={selectedTab === 'Departure' ? selectedDay.departureDate : selectedDay.returnDate}
                components={{ DayContent: dateCell, Caption: customCaption }}
                formatters={{ formatWeekdayName: weekDay }}
                classNames={dayPickerClassNames}
                modifiersClassNames={{
                  selected: `${styles.dp_selected}`,
                }}
                footer={
                  <div className={styles.holiday_container}>
                    <div className={styles.holiday_header}>Holidays</div>
                    <div className={styles.holiday_group}>{holidays}</div>
                  </div>
                }
              />
            </div>
            <div className={styles.select_date_container}>
              <UcButton variant="contained" className={styles.select_btn} onClick={selectDate}>
                Select Date
              </UcButton>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
}

export default DatePickerMsite;
