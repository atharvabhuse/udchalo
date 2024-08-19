import Flight from '@uc/assets/images/seat_selection_trip_toggle.svg';
import RightArrow from '@uc/assets/images/arrowIcon.svg';
import { useEffect, useRef, useState } from 'react';
import nonVeg from '@uc/assets/images/nonVeg.png';
import Image from 'next/image';
import veg from '@uc/assets/images/veg.png';
import styles from './flights-popup-legs-and-travelers.module.scss';

/* eslint-disable-next-line */
export interface FlightsPopupLegsAndTravelersProps {}

export function FlightsPopupLegsAndTravelers({
  segments,
  travelerDetails,
  seatClickHandlerState,
  travelerDetailsArrayCallback,
  seat,
  excessBaggageArray,
  excessBaggageArrayCallback,
  toggleSelectedCallback,
  popupCounter,

  meal,
  selectedTravelerCallbackForMeal,
  selectedTravelerCallbackForMealNew,

  excessBaggage,
  selectedTravelerCallbackForExcessHandler,
  selectedTravelerCallbackForExcessHandlerNew,
  toggleHandlerCallback,
  nextButton,
  // legVsButtonNew
}) {
  const [toggleHandlerState, setToggleHandlerState] = useState({
    indexNum: 0,
    basicInfo: segments[0].mealOptions,
  });
  const [toggleSelected, setToggleSelected] = useState(0);

  useEffect(() => {
    setToggleHandlerState({
      indexNum: 0,
      basicInfo: segments[0].mealOptions,
    });
    setToggleSelected(0);
  }, [nextButton]);

  const [checkLegData, setCheckLegData] = useState(true);
  useEffect(() => {
    toggleHandlerCallback(toggleHandlerState);
  }, [toggleHandlerState]);

  const toggleHandler = (data, index) => {
    setCheckLegData(false);
    setToggleSelected(index);
    toggleSelectedCallback(index);
    setToggleHandlerState({
      indexNum: index,
      basicInfo: [...data.mealOptions],
    });
  };

  const initialSelectedTraveler = `${travelerDetails?.travelerDetails?.travelers[0].firstAndMiddleName.split(
    ' '
  )[0]} ${travelerDetails?.travelerDetails?.travelers[0].lastname}`;

  const [selectedTraveler, setSelectedTraveler] = useState<any>(initialSelectedTraveler);

  useEffect(() => {
    setCheckLegData(true);
    setSelectedTraveler(initialSelectedTraveler);
  }, [popupCounter]);

  const travelerClickHandler = (data, index) => {
    if (popupCounter === 3) {
      setSelectedTraveler(`${data.firstAndMiddleName.split(' ')[0]} ${data.lastname}`);
      selectedTravelerCallbackForMeal(`${data.firstAndMiddleName.split(' ')[0]} ${data.lastname}`);
      selectedTravelerCallbackForMealNew(index);
    }
    if (popupCounter === 4) {
      setSelectedTraveler(`${data.firstAndMiddleName.split(' ')[0]} ${data.lastname}`);
      selectedTravelerCallbackForExcessHandler(`${data.firstAndMiddleName.split(' ')[0]} ${data.lastname}`);
      selectedTravelerCallbackForExcessHandlerNew(index);
    }
  };

  const travelerClickedStylesHandler = data => ({
    backgroundColor: selectedTraveler === `${data.firstAndMiddleName.split(' ')[0]} ${data.lastname}` ? '#D9ECE3' : '',
    color: selectedTraveler === `${data.firstAndMiddleName.split(' ')[0]} ${data.lastname}` ? 'black' : '',
  });

  const [travelerDetailsArray, setTravelerDetailsArray] = useState([]);
  const [legWiseTravelerSeatNumberArray, setLegWiseTravelerSeatNumberArray] = useState([]);

  const [indexCall, setIndexCall] = useState(0);

  const seatClickHandler = data => {
    const index = travelerDetails?.travelerDetails?.travelers?.indexOf(
      travelerDetails?.travelerDetails?.travelers?.filter(
        (data, index) => `${data.firstAndMiddleName.split(' ')[0]} ${data.lastname}` === selectedTraveler
      )[0]
    );

    if (index >= 0) {
      if (legWiseTravelerSeatNumberArray[toggleSelected]) {
        legWiseTravelerSeatNumberArray[toggleSelected][selectedTraveler] = data?.seatNumber;
      }
      if (index === travelerDetails?.travelerDetails?.travelers.length - 1 && toggleSelected < segments.length - 1) {
        setToggleSelected(toggleSelected + 1);
        setSelectedTraveler(
          `${travelerDetails?.travelerDetails?.travelers[0]?.firstAndMiddleName?.split(' ')[0]} ${travelerDetails
            ?.travelerDetails?.travelers[0]?.lastname}`
        );
      } else if (index < travelerDetails?.travelerDetails?.travelers.length - 1) {
        setSelectedTraveler(
          `${travelerDetails?.travelerDetails?.travelers[index + 1]?.firstAndMiddleName?.split(
            ' '
          )[0]} ${travelerDetails?.travelerDetails?.travelers[index + 1]?.lastname}`
        );
      } else if (index >= 0) {
        if (legWiseTravelerSeatNumberArray[toggleSelected]) {
          legWiseTravelerSeatNumberArray[toggleSelected][selectedTraveler] = data?.seatNumber;
        }
        if (index === travelerDetails?.travelerDetails?.travelers.length - 1 && toggleSelected < segments.length - 1) {
          if (checkLegData) {
            setToggleSelected(toggleSelected + 1);
            setToggleHandlerState({
              indexNum: 0 + 1,
              basicInfo: segments[0 + 1].mealOptions,
            });
          }
          setSelectedTraveler(
            `${travelerDetails?.travelerDetails?.travelers[0]?.firstAndMiddleName?.split(' ')[0]} ${travelerDetails
              ?.travelerDetails?.travelers[0]?.lastname}`
          );
        } else if (index < travelerDetails?.travelerDetails?.travelers.length - 1) {
          setSelectedTraveler(
            `${travelerDetails?.travelerDetails?.travelers[index + 1]?.firstAndMiddleName?.split(
              ' '
            )[0]} ${travelerDetails?.travelerDetails?.travelers[index + 1]?.lastname}`
          );
        } else {
          setSelectedTraveler(
            `${travelerDetails?.travelerDetails?.travelers[index]?.firstAndMiddleName?.split(' ')[0]} ${travelerDetails
              ?.travelerDetails?.travelers[index]?.lastname}`
          );
        }
      } else {
        setSelectedTraveler(
          `${travelerDetails?.travelerDetails?.travelers[
            travelerDetails?.travelerDetails?.travelers.length - 1
          ]?.firstAndMiddleName?.split(' ')[0]} ${travelerDetails?.travelerDetails?.travelers[
            travelerDetails?.travelerDetails?.travelers.length - 1
          ]?.lastname}`
        );
      }
    }
    let selectedTravelerFromObjNewTempNew = [];
    for (let i = 0; i < legWiseTravelerSeatNumberArray.length; i++) {
      for (const key in legWiseTravelerSeatNumberArray[i]) {
        selectedTravelerFromObjNewTempNew = [
          ...selectedTravelerFromObjNewTempNew,
          {
            segment: i,
            origin: segments[i]?.origin,
            destination: segments[i]?.destination,
            travelerName: key,
            travelerSeatNumber: legWiseTravelerSeatNumberArray[i][key],
            travelerSeatPrice: seat?.filter(data => data.seatNumber === legWiseTravelerSeatNumberArray[i][key])[0]
              ?.price,
          },
        ];
      }
    }
    setTravelerDetailsArray(selectedTravelerFromObjNewTempNew);
    travelerDetailsArrayCallback(selectedTravelerFromObjNewTempNew);
    excessBaggageArrayCallback(selectedTravelerFromObjNewTempNew);
  };

  const legWiseTravelerSeatNumberArrayHandler = () => {
    for (let j = 0; j < segments.length; j++) {
      let objNew = {};
      for (let i = 0; i < travelerDetails?.travelerDetails?.travelers.length; i++) {
        objNew = {
          ...objNew,
          [`${travelerDetails?.travelerDetails?.travelers[i].firstAndMiddleName.split(' ')[0]} ${travelerDetails
            ?.travelerDetails?.travelers[i].lastname}`]: '',
        };
      }
      setLegWiseTravelerSeatNumberArray(legWiseTravelerSeatNumberArray => [...legWiseTravelerSeatNumberArray, objNew]);
    }
  };

  useEffect(() => {
    legWiseTravelerSeatNumberArrayHandler();
  }, [segments]);

  const selectedTravelerSeatNumber = index =>
    travelerDetailsArray.filter(data => data.segment === toggleSelected)[index]?.travelerSeatNumber
      ? `| ${travelerDetailsArray.filter(data => data.segment === toggleSelected)[index]?.travelerSeatNumber}`
      : '';

  const skipInitialRender = useRef(true);
  useEffect(() => {
    if (skipInitialRender.current === true) {
      skipInitialRender.current = false;
      return;
    }
    if (seatClickHandler != undefined) {
      seatClickHandler(seatClickHandlerState);
    }
  }, [seatClickHandlerState, excessBaggageArray, meal, excessBaggage]);

  useEffect(() => {
    let selectedTravelerFromObjNewTempNew = [];

    for (let i = 0; i < legWiseTravelerSeatNumberArray.length; i++) {
      for (const key in legWiseTravelerSeatNumberArray[i]) {
        selectedTravelerFromObjNewTempNew = [
          ...selectedTravelerFromObjNewTempNew,
          {
            segment: i,
            origin: segments[i]?.origin,
            destination: segments[i]?.destination,
            travelerName: key,
            travelerSeatNumber: legWiseTravelerSeatNumberArray[i][key],
            travelerSeatPrice: seat?.filter(data => data.seatNumber === legWiseTravelerSeatNumberArray[i][key])[0]
              ?.price,
          },
        ];
      }
    }
    travelerDetailsArrayCallback(selectedTravelerFromObjNewTempNew);
  }, []);

  return (
    <>
      <div className={styles.trip_toggle_row}>
        {popupCounter === 4 ? (
          <div>
            <div className={styles.trip_toggle_selected}>
              <Flight height={24} width={24} />
              <div className={styles.depart}>{segments[0].origin}</div>
              <RightArrow height={20} width={20} />
              <div className={styles.arrive}>{segments[segments.length - 1].destination}</div>
            </div>
          </div>
        ) : (
          <>
            {segments?.map((data, index) => (
              <div
                key={index}
                onClick={() => toggleHandler(data, index)}
                className={toggleSelected === index ? styles.trip_toggle_selected : styles.trip_toggle}>
                <Flight height={24} width={24} />
                <div className={styles.depart}>{data.origin}</div>
                <RightArrow height={20} width={20} />
                <div className={styles.arrive}>{data.destination}</div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className={styles.travellers_row}>
        <div className={styles.travellers_row_data}>
          {travelerDetails?.travelerDetails?.travelers?.map((data, index: number) => (
            <div
              className={styles.travellers_btn}
              key={index}
              onClick={() => travelerClickHandler(data, index)}
              style={travelerClickedStylesHandler(data)}>
              <div>
                {data.firstAndMiddleName.split(' ')[0]} {data.lastname}
              </div>
              <div>{selectedTravelerSeatNumber(index)}</div>
            </div>
          ))}
        </div>
        <div className={styles.travellers_row_info}>
          <div className={styles.meal_data}>
            <div>
              <Image src={veg} alt="image not found" className={styles.meal_image_logo} />
              Veg
            </div>
          </div>
          <div className={styles.meal_data}>
            <div>
              <Image src={nonVeg} alt="image not found" className={styles.meal_image_logo} />
              Non-veg
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FlightsPopupLegsAndTravelers;
