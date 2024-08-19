import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import styles from './excess-baggage.module.scss';

const initialState = {
  excessResponseData: [],
  excessSelectData: [],
  buttonDataHandlerData: 0,
  popupDataInfo: null,
  filterExcessData: 0,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'excessResponse':
      return { ...state, excessResponseData: action.payload };
    case 'excessSelect':
      return { ...state, excessSelectData: action.payload };
    case 'buttonDataHandler':
      return { ...state, buttonDataHandlerData: action.payload };
    case 'popupData':
      return { ...state, popupDataInfo: action.payload };
    case 'filterExcess':
      return { ...state, filterExcessData: action.payload };
    default:
      throw state;
  }
}

export function ExcessBaggage(props: any) {
  const [delayedButtonAction, setDelayedButtonAction] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [checkButtonData, setCheckButtonData] = useState('');
  const [checkData, setCheckData] = useState(Infinity);
  const [passDataProps, setPassDataProps] = useState(true);

  useEffect(() => {
    dispatch({
      type: 'excessResponse',
      payload: props?.flightPriceDetails?.data?.response[0]?.leg?.excessBaggageOptions,
    });
  }, []);
  const newArray = [...state.excessSelectData];

  let filterNum: number;

  useEffect(() => {
    if (props.selectedTravelerForExcess !== undefined) {
      filterNum = newArray.findIndex(data => data.buttonName === props.selectedTravelerForExcess);
      dispatch({
        type: 'filterExcess',
        payload: filterNum,
      });
    }
  }, [props.selectedTravelerForExcess]);

  useEffect(() => {
    props.excessBaggageClickHandlerCallback(state);
  }, [passDataProps]);

  const buttonData = props.travelerDetails?.travelerDetails?.travelers;
  let num: number;
  const buttonClickHandler = (data: any, index: number) => {
    dispatch({
      type: 'popupData',
      payload: index,
    });
    if (props.selectedTravelerForExcess === undefined) {
      num = newArray.findIndex(data => {
        const buttonDataHandlerDataInfo = `${
          buttonData[state.buttonDataHandlerData].firstAndMiddleName.split(' ')[0]
        } ${buttonData[state.buttonDataHandlerData].lastname}`;
        return data.buttonName === buttonDataHandlerDataInfo;
      });
    } else {
      num = newArray.findIndex(data => data.buttonName === props.selectedTravelerForExcess);
    }

    if (num === -1) {
      if (props.selectedTravelerForExcess === undefined) {
        setCheckData(index);
        const buttonDataHandlerDataInfo = `${
          buttonData[state.buttonDataHandlerData].firstAndMiddleName.split(' ')[0]
        } ${buttonData[state.buttonDataHandlerData].lastname}`;
        dispatch({
          type: 'excessSelect',
          payload: [
            ...state.excessSelectData,
            {
              ...data,
              kgIndex: index,
              buttonName: buttonDataHandlerDataInfo,
            },
          ],
        });

        if (state.buttonDataHandlerData === buttonData.length - 1) {
          setDelayedButtonAction(true);
        } else {
          setDelayedButtonAction(true);
          setTimeout(() => {
            setDelayedButtonAction(false);
            if (state.buttonDataHandlerData < buttonData.length - 1) {
              dispatch({
                type: 'buttonDataHandler',
                payload: state.buttonDataHandlerData + 1,
              });
            }
          }, 800);
          setPassDataProps(!passDataProps);
        }
      } else {
        setCheckData(index);
        setCheckButtonData(props.selectedTravelerForExcess);
        dispatch({
          type: 'excessSelect',
          payload: [
            ...state.excessSelectData,
            {
              ...data,
              kgIndex: index,
              buttonName: props.selectedTravelerForExcess,
            },
          ],
        });
      }
    } else if (props.selectedTravelerForExcess === undefined) {
      setCheckData(index);
      const buttonDataLength = `${buttonData[buttonData.length - 1].firstAndMiddleName.split(' ')[0]} ${
        buttonData[buttonData.length - 1].lastname
      }`;
      newArray.splice(buttonData.length - 1, 1, {
        ...data,
        kgIndex: index,
        buttonName: buttonDataLength,
      });
      if (state.buttonDataHandlerData !== buttonData.length - 1) {
        setDelayedButtonAction(true);
        setTimeout(() => {
          setDelayedButtonAction(false);
        }, 800);
        props.excessBaggageClickHandlerCallback(state);
      } else {
        setDelayedButtonAction(true);
      }
      dispatch({
        type: 'excessSelect',
        payload: [...newArray],
      });
    } else {
      setCheckData(index);
      newArray.splice(num, 1, {
        ...data,
        kgIndex: index,
        buttonName: props.selectedTravelerForExcess,
      });
      dispatch({
        type: 'excessSelect',
        payload: [...newArray],
      });
    }
  };

  return (
    <div className={styles.excess_baggage_info}>
      <div className={styles.excess_baggage}>
        {state.excessResponseData?.map((data: any, index: number) => (
          <Button
            variant="text"
            className={styles.excess_baggage_data}
            key={index}
            onClick={() => {
              buttonClickHandler(data, index);
            }}>
            <div className={styles.excess_baggage_kgText}>{data.text}</div>
            <div className={styles.excess_baggage_data_info}>
              <div className={styles.excess_baggage_price}>₹{data.price}</div>
              <div>
                <input
                  type="radio"
                  name="excessButton"
                  id="excessButton"
                  value={data}
                  checked={
                    index === checkData && props.selectedTravelerForExcess === checkButtonData
                      ? true
                      : props.selectedTravelerForExcess === undefined
                        ? state.popupDataInfo === index
                          ? delayedButtonAction
                          : false
                        : state.excessSelectData[state.filterExcessData]?.kgIndex === index
                  }
                />
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ExcessBaggage;
