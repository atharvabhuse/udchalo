import { useEffect, useReducer, useState } from 'react';
import mealImage from '@uc/assets/images/mealImage.png';
import Image from 'next/image';
import nonVeg from '@uc/assets/images/nonVeg.png';
import styles from './meal.module.scss';

const initialState = {
  buttonDataHandlerData: 0,
  selectedData: [],
  legIndex: 0,
  selectedValue: [],
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'buttonDataHandler':
      return { ...state, buttonDataHandlerData: action.payload };
    case 'selectedDataList':
      return { ...state, selectedData: action.payload };
    case 'legIndexData':
      return { ...state, legIndex: action.payload };
    case 'selectedValueData':
      return { ...state, selectedValue: action.payload };
    default:
      throw state;
  }
}

function MealCard(props: any) {
  const filterData = props.selectedData.filter(
    (data: any) => props.data?.text === data.text && props.indexNum === data.indexNum
  );
  return (
    <div className={styles.meal_info} key={props.index}>
      <div className={styles.meal_image}>
        {props.data?.imgUrl ? (
          <Image src={props.data?.imgUrl} alt="image not found" width={158} height={100} />
        ) : (
          <Image src={mealImage} alt="image not found" className={styles.meal_imgUrl} />
        )}
      </div>
      <div className={styles.meal_details}>
        <div className={styles.meal_title_data}>
          <div>
            <Image src={nonVeg} alt="image not found" />
          </div>
          <div className={styles.meal_title_info}>{props.data?.text}</div>
        </div>
        <div className={styles.meal_data}>
          <div className={styles.meal_data_price}>₹{props?.data?.price}</div>
          <div className={styles.button_data}>
            {filterData.length === 0 ? (
              <button
                className={styles.meal_data_button}
                onClick={() => {
                  props.buttonClickHandler();
                  props.selectDataCall(props?.data);
                }}>
                Add
              </button>
            ) : (
              <div className={styles.add_meal_data_button}>
                <button
                  className={styles.button_action}
                  disabled={filterData.length <= 0}
                  onClick={() => {
                    props.buttonClickHandler();
                    props.selectedDataMinus(props?.data);
                  }}>
                  -
                </button>
                <div>{filterData.length}</div>
                <button
                  className={styles.button_action}
                  onClick={() => {
                    props.buttonClickHandler();
                    props.selectDataCall(props?.data);
                  }}>
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Meal(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [resultValue, setResultValue] = useState(true);

  // this useEffect for when user click on stepper show selected data
  useEffect(() => {
    if (props.mealStepperDataStore.length > 0) {
      dispatch({
        type: 'selectedDataList',
        payload: props.mealStepperDataStore,
      });
    }
  }, [props.mealDataStepperHandle]);

  useEffect(() => {
    dispatch({
      type: 'legIndexData',
      payload: props?.toggleHandlerCallbackNew.indexNum,
    });
    dispatch({
      type: 'buttonDataHandler',
      payload: 0,
    });
    const selectedArrayInfo = selectedDataArrayNew.filter(
      (newData: any) => newData.indexNum !== props?.toggleHandlerCallbackNew.indexNum
    );
    dispatch({
      type: 'selectedValueData',
      payload: selectedArrayInfo,
    });
  }, [props?.toggleHandlerCallbackNew.indexNum]);
  useEffect(() => {
    const completeArrayData = new Set([...state.selectedValue, ...state.selectedData]);
    const arr = Array.from(completeArrayData);

    // this if loop for when user click on stepper show selected data
    if (arr.length > 0) {
      props.MealStepperDataStoreInfo(arr);
    }

    dispatch({
      type: 'selectedDataList',
      payload: arr,
    });
    props.selectedMealAllData(arr);
  }, [resultValue]);
  useEffect(() => {
    dispatch({
      type: 'buttonDataHandler',
      payload: 0,
    });
  }, [props?.toggleHandlerCallbackNew.indexNum]);
  const buttonData = props.travelerDetails?.travelerDetails?.travelers;
  const buttonClickHandler = () => {
    props.seatClickHandlerCallback(state);
  };
  const selectedDataArrayNew = [...state.selectedData];
  const selectedDataArrayInfo = selectedDataArrayNew.filter(
    (newData: any) => newData.indexNum === props?.toggleHandlerCallbackNew.indexNum
  );
  const selectDataCall = (data: any, index: number) => {
    setResultValue(!resultValue);
    const selectedDataArray = [...selectedDataArrayInfo];
    const findData = selectedDataArray.findIndex(
      (newData: any) =>
        newData.userName === props.selectedTravelerForMeal &&
        newData.indexNum === props?.toggleHandlerCallbackNew.indexNum
    );
    if (findData === -1 && selectedDataArray.length < buttonData.length) {
      if (props.selectedTravelerForMealNew != undefined) {
        const selectedTravelerForMealNewData = `${
          buttonData[props.selectedTravelerForMealNew].firstAndMiddleName.split(' ')[0]
        } ${buttonData[props.selectedTravelerForMealNew].lastname}`;
        selectedDataArray.push({
          ...data,
          userName: selectedTravelerForMealNewData,
          indexNum: props?.toggleHandlerCallbackNew.indexNum,
        });
      } else {
        const buttonDataHandlerDataInfo = `${
          buttonData[state.buttonDataHandlerData].firstAndMiddleName.split(' ')[0]
        } ${buttonData[state.buttonDataHandlerData].lastname}`;
        selectedDataArray.push({
          ...data,
          userName: buttonDataHandlerDataInfo,
          indexNum: props?.toggleHandlerCallbackNew.indexNum,
        });
      }
      dispatch({
        type: 'selectedDataList',
        payload: selectedDataArray,
      });
      if (state.buttonDataHandlerData < buttonData.length - 1 && !props.selectedTravelerForMealNew) {
        dispatch({
          type: 'buttonDataHandler',
          payload: state.buttonDataHandlerData + 1,
        });
      }
    } else {
      if (props.selectedTravelerForMealNew != undefined) {
        selectedDataArray.splice(findData, 1, {
          ...data,
          userName: props.selectedTravelerForMeal,
          indexNum: props?.toggleHandlerCallbackNew.indexNum,
        });
      } else {
        const buttonDataHandlerDataInfo = `${
          buttonData[state.buttonDataHandlerData].firstAndMiddleName.split(' ')[0]
        } ${buttonData[state.buttonDataHandlerData].lastname}`;
        selectedDataArray.splice(findData, 1, {
          ...data,
          userName: buttonDataHandlerDataInfo,
          indexNum: props?.toggleHandlerCallbackNew.indexNum,
        });
      }
      dispatch({
        type: 'selectedDataList',
        payload: selectedDataArray,
      });
    }
  };
  const selectedDataMinus = (data: any) => {
    setResultValue(!resultValue);
    const selectedDataArray = [...state.selectedData];
    const findData = selectedDataArray.findIndex(
      (newData: any) =>
        newData.userName === props.selectedTravelerForMeal &&
        newData.text === data.text &&
        newData.indexNum === props?.toggleHandlerCallbackNew.indexNum
    );
    if (findData !== -1) {
      selectedDataArray.splice(findData, 1);
      dispatch({
        type: 'selectedDataList',
        payload: selectedDataArray,
      });
    }
  };

  return (
    <div>
      <div className={styles.meal_info_data}>
        {props?.toggleHandlerCallbackNew?.basicInfo.map((data: any, index: number) => (
          <MealCard
            data={data}
            index={index}
            buttonClickHandler={buttonClickHandler}
            selectDataCall={selectDataCall}
            selectedData={state.selectedData}
            selectedDataMinus={selectedDataMinus}
            indexNum={props?.toggleHandlerCallbackNew.indexNum}
          />
        ))}
      </div>
    </div>
  );
}

export default Meal;
