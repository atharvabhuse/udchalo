import { useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { useOnClickOutside } from 'usehooks-ts';
import { UcBodyPortal, DropDownArrow, CloseIcon2 } from '@uc/libs/shared/ui';
import styles from './traveller-select.module.scss';

export interface TravelersData {
  cabin: string;
  adults: number;
  children: number;
  infants: number;
}

export interface TravelersType {
  title: string;
  desc: string;
  key: string;
  error: string;
}

export interface TravelerSelectProps {
  cabinTypes: Array<{ cabin: string; value: string }>;
  onTravelerInfoUpdate: (data: any) => void;
  initialValue: TravelersData;
}

function TravelerSelect({ cabinTypes, initialValue, onTravelerInfoUpdate }: TravelerSelectProps) {
  const MAX_TRAVELER_COUNT_WITHOUT_INFANTS = 9;
  const MAX_TRAVELER_COUNT_WITH_INFANTS = 13;

  const travelerTypes = [
    { title: 'Adult', desc: 'Above 12 years', key: 'adults' },
    { title: 'Children', desc: 'From 2 to 12 years', key: 'children' },
    { title: 'Infants', desc: 'Below 2 years', key: 'infants' },
  ];

  const [travellerTypeError, setTravellerTypeError] = useState<string>('');
  const [travelersData, setTravelersData] = useState<TravelersData>(
    initialValue || {
      adults: 1,
      children: 0,
      infants: 0,
      cabin: 'Economy',
    }
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  });
  const popperRef = useRef(null);
  const { adults, children, infants, cabin } = travelersData;
  const placeholder = `${adults} Adult, ${children} Child, ${infants} Infant and ${cabinTypes?.find(
    c => c.cabin === cabin
  )?.value}`;
  const totalTravelerCount = adults + children + infants;

  const setPopperRef = (ref: any) => {
    setPopperElement(ref);
    popperRef.current = ref;
  };

  useEffect(() => {
    setTravelersData(initialValue);
  }, [initialValue.adults, initialValue.cabin, initialValue.children, initialValue.infants]);

  useOnClickOutside(popperRef, () => setDropdownOpen(false));
  const openOptionsDropdown = () => setDropdownOpen(true);
  const closeOptionsDropdown = () => setDropdownOpen(false);

  const onCabinClassTabClick = (classType: string) => {
    travelersData.cabin = classType;
    setTravelersData(state => ({ ...state, ...travelersData }));
  };

  const decrementCount = (countType: string) => {
    switch (countType) {
      case 'Adult':
        if (travelersData.adults <= 4 && travelersData.infants && travelersData.adults <= travelersData.infants) {
          travelersData.adults -= travelersData.adults > 1 ? 1 : 0;
          travelersData.infants = travelersData.adults;
        } else {
          travelersData.adults -= travelersData.adults > 1 ? 1 : 0;
        }
        break;
      case 'Children':
        travelersData.children -= travelersData.children > 0 ? 1 : 0;
        break;
      case 'Infants':
        travelersData.infants -= travelersData.infants > 0 ? 1 : 0;
        break;
      default:
        break;
    }
    setTravelersData(state => ({ ...state, ...travelersData }));
    setTravellerTypeError('');
  };

  const incrementCount = (countType: string) => {
    const newTravellersData = { adults, children, infants };
    const totalTravellers = Object.values(newTravellersData).reduce((acc, curr) => acc + curr, 0) + 1;
    if (
      (newTravellersData.adults + newTravellersData.children < MAX_TRAVELER_COUNT_WITHOUT_INFANTS &&
        (countType === 'Adult' || countType === 'Children')) ||
      (totalTravellers <= MAX_TRAVELER_COUNT_WITH_INFANTS && countType === 'Infants')
    ) {
      switch (countType) {
        case 'Adult':
          if (
            newTravellersData.adults + newTravellersData.children < MAX_TRAVELER_COUNT_WITHOUT_INFANTS ||
            totalTravellers < MAX_TRAVELER_COUNT_WITH_INFANTS
          ) {
            newTravellersData.adults += 1;
          }
          break;
        case 'Children':
          if (
            newTravellersData.adults + newTravellersData.children < MAX_TRAVELER_COUNT_WITHOUT_INFANTS ||
            totalTravellers < MAX_TRAVELER_COUNT_WITH_INFANTS
          ) {
            newTravellersData.children += 1;
          }
          break;
        case 'Infants':
          if (
            newTravellersData.infants < 4 &&
            newTravellersData.adults / newTravellersData.infants > 1 &&
            totalTravellers <= MAX_TRAVELER_COUNT_WITH_INFANTS
          ) {
            newTravellersData.infants += 1;
          }
          break;
        default:
          break;
      }
      setTravelersData(prevState => ({
        ...prevState,
        adults: newTravellersData.adults,
        children: newTravellersData.children,
        infants: newTravellersData.infants,
      }));
      setTravellerTypeError('');
    } else {
      setTravellerTypeError(`More than ${MAX_TRAVELER_COUNT_WITHOUT_INFANTS} travelers. Try Group Booking`);
    }
  };

  const addTravelers = () => {
    onTravelerInfoUpdate(travelersData);
    closeOptionsDropdown();
  };

  const getTravelerCount = (key: keyof TravelersData) => travelersData[key];

  const getCabinClasses = (cabinType: string) => `cabin ${cabinType === travelersData.cabin ? 'active-cabin' : ''}`;

  const getCountBtnClasses = (key: keyof TravelersData) =>
    `btn-round ${+getTravelerCount(key) === 0 ? 'btn-round-inactive' : ''}`;

  return (
    <>
      <div className={styles.tv_select} ref={setReferenceElement} onClick={openOptionsDropdown}>
        <span className={styles.float_label}>Traveler(s) and Class</span>
        <div className={styles.tv_container}>
          <div className={styles.tv_value}>{placeholder}</div>
          <DropDownArrow className={styles.tv_icon} alt="down-arrow" />
        </div>
      </div>
      {isDropdownOpen ? (
        <UcBodyPortal>
          <div className="tv_select_dd" ref={setPopperRef} style={popperStyles.popper} {...attributes.popper}>
            <div className="tv_header">
              <div className="tv_title">Traveler & Class</div>
              <div className="close_icon">
                <CloseIcon2 alt="close" onClick={closeOptionsDropdown} />
              </div>
            </div>
            <div className="tv_subtitle">Please select the number of traveler(s) & class</div>
            <div className="tv_cabin_options">
              {cabinTypes.map((c: any, i: number) => {
                const uniqueKey = `cabinTypes-${i}`;
                return (
                  <div
                    className={getCabinClasses(c.cabin)}
                    key={uniqueKey}
                    onClick={() => onCabinClassTabClick(c.cabin)}>
                    {c.value} <br /> Class
                  </div>
                );
              })}
            </div>
            {travelerTypes.map((t: any, i: number) => {
              const uniqueKey = `travelerTypes-${i}`;
              return (
                <div className="tv_option" key={uniqueKey}>
                  <div className="tv_type">
                    <div className="title">{t.title}</div>
                    <div className="subtitle">{t.desc}</div>
                  </div>
                  <div className="tv_count_stepper">
                    <button type="button" className={getCountBtnClasses(t.key)} onClick={() => decrementCount(t.title)}>
                      -
                    </button>
                    <div className="count">{`0${getTravelerCount(t.key)}`}</div>
                    <button type="button" className="btn-round" onClick={() => incrementCount(t.title)}>
                      +
                    </button>
                  </div>
                </div>
              );
            })}
            {travellerTypeError && <p className={styles.traveller_type_error_message}>{travellerTypeError}</p>}
            <div className="tv-btn-container">
              <button type="button" className="add-btn" onClick={addTravelers}>
                Add
              </button>
            </div>
          </div>
        </UcBodyPortal>
      ) : (
        ''
      )}
    </>
  );
}

export default TravelerSelect;
