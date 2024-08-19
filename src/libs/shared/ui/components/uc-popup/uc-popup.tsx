import { Dialog } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import styles from './uc-popup.module.scss';
import {UcStepperContainer} from '../uc-stepper-container/uc-stepper-container';

interface Dimentions {
  width: string;
  height: string;
}

interface TravelerDetails {
  travelerDetails: {
    contactDetails: {
      email: string;
      firstname: string;
      phonenumber: string;
      receiveInfoOnWhatsApp: boolean;
    };
    travelers: [
      {
        defenceID: string;
        firstAndMiddleName: string;
        gender: string;
        lastname: string;
        saveTraveler: boolean;
      },
    ];
  };
}

interface SeatClickHandlerState {
  column: number;
  isAvailable: boolean;
  isExitRow: boolean;
  isExtraLegroom: boolean;
  isReclining: boolean;
  isSeatPresent: boolean;
  isWing: boolean;
  name: null | string;
  price: number;
  row: number;
  seatId: number;
  seatLocation: number;
  seatNumber: string;
  seatSupplierState: {
    key: string;
  };
}

type Seat = SeatClickHandlerState[];

interface TravelerDetailsArrayObj {
  destination: string;
  origin: string;
  segment: number;
  travelerName: string;
  travelerSeatNumber: string;
  travelerSeatPrice: number;
}

type TravelerDetailsArray = TravelerDetailsArrayObj[];

interface NextBtnCallback {
  (arg: string): void;
}

interface TravelerDetailsArrayCallback {
  (arg: TravelerDetailsArray): void;
}

interface ToggleSelectedCallback {
  (arg: number): void;
}

interface PopupOpen {
  (arg: boolean): void;
}

/* eslint-disable-next-line */
export interface UcPopupProps {
  dimentions: Dimentions;
  review: any;
  travelerDetails: TravelerDetails;
  segments: any;
  seat: Seat;
  discount: any;
  travelerDetailsArray: TravelerDetailsArray;
  children: ReactNode;
  nextBtnCallback: NextBtnCallback;
  seatClickHandlerState: SeatClickHandlerState | undefined;
  travelerDetailsArrayCallback: TravelerDetailsArrayCallback;
  excessBaggageArray: any;
  excessBaggageArrayCallback: any;
  toggleSelectedCallback: ToggleSelectedCallback;
  popupOpen: any;
  meal: any;
  selectedTravelerCallbackForMeal: any;
  excessBaggage: any;
  popupCounter: any;
  popupCounterCallback: any;
  selectedTravelerCallbackForMealNew: any;
  selectedTravelerCallbackForExcessHandler: any;
  selectedTravelerCallbackForExcessHandlerNew: any;
  toggleHandlerCallback: any;
  resultValue: any;
  mealDataStepperFunction: any;
}

/* export function UcPopup({
  dimentions,
  review,
  travelerDetails,
  segments,
  seat,
  discount,
  travelerDetailsArray,
  children,
  nextBtnCallback,
  seatClickHandlerState,
  travelerDetailsArrayCallback,
  excessBaggageArray,
  excessBaggageArrayCallback,
  toggleSelectedCallback,

  meal,
  selectedTravelerCallbackForMeal,
  selectedTravelerCallbackForMealNew,
  mealDataStepperFunction,

  excessBaggage,
  selectedTravelerCallbackForExcessHandler,
  selectedTravelerCallbackForExcessHandlerNew,

  popupCounter,
  popupCounterCallback,
  toggleHandlerCallback,
  resultValue,
  popupOpen
}:
UcPopupProps) {
  const [open, setOpen] = useState(true);
  const [nextButton, setNextButton] = useState(true);

  const skipHandler = () => {
    popupOpen(false);
  };

  const [
    travelerDetailsArrayFromLegsAndTravelers,
    setTravelerDetailsArrayFromLegsAndTravelers,
  ] = useState([]);
  const travelerDetailsArrayCallbackHandler = (data: any) => {
    setTravelerDetailsArrayFromLegsAndTravelers(data);
    travelerDetailsArrayCallback(data);

  };

  const excessBaggageArrayCallbackHandler = (data: any) => {
    excessBaggageArrayCallback(data);
  };

  const toggleSelectedCallbackHandler = (data: any) => {
    toggleSelectedCallback(data);
  };

  return (
    <div className={styles.popup}>
      <Dialog
        open={true}
        onClose={() => setOpen(true)}
        PaperProps={{
          className: 'popup-dialog',
          style: {
            width: dimentions.width,
            height: dimentions.height,
            maxWidth: '1400px',
            maxHeight: '800px',
            borderRadius: '16px',
            padding: '20px 20px 0px 20px',
          },
        }}>
        <div style={{ display: popupCounter == 2 ? 'none' : 'block' }}>
          <div className={styles.seat_selection_stepper_row}>
            <div className={styles.extras_box}>
              <div className={styles.extras_index}>3</div>
              <div className={styles.extras}>Extras</div>
            </div>
            <UcStepperContainer
              popupCounter={popupCounter}
              popupCounterCallback={(data: any) => popupCounterCallback(data)}
            />
            <div onClick={skipHandler} className={styles.skip}>
              Skip
            </div>
          </div>
          <FlightsPopupLegsAndTravelers
            segments={segments}
            travelerDetails={travelerDetails}
            seatClickHandlerState={seatClickHandlerState}
            seat={seat}
            travelerDetailsArrayCallback={travelerDetailsArrayCallbackHandler}
            excessBaggageArray={excessBaggageArray}
            excessBaggageArrayCallback={excessBaggageArrayCallbackHandler}
            toggleSelectedCallback={toggleSelectedCallbackHandler}
            popupCounter={popupCounter}
            meal={meal}
            selectedTravelerCallbackForMeal={(data: any) =>
              selectedTravelerCallbackForMeal(data)
            }
            selectedTravelerCallbackForMealNew={(data: any) =>
              selectedTravelerCallbackForMealNew(data)
            }
            excessBaggage={excessBaggage}
            selectedTravelerCallbackForExcessHandler={(data: any) =>
              selectedTravelerCallbackForExcessHandler(data)
            }
            selectedTravelerCallbackForExcessHandlerNew={(data: any) =>
              selectedTravelerCallbackForExcessHandlerNew(data)
            }
          />
        </div>
        {children}
        {popupCounter != 2 && (
          <FlightsPopupFareAccordion
            review={review}
            discount={discount}
            travelerDetailsArray={travelerDetailsArrayFromLegsAndTravelers}
            nextBtnCallback={() => nextBtnCallback('clicked')}
            resultValueNew= {resultValue}
            nextButtonCallback = {() => {
              console.log('this is next button useState');
              setNextButton(!nextButton)
            }}
          />
        )}
      </Dialog>
    </div>
  );
} */

export function UcPopup() {
  return <div>UcPopup code commented for build </div>;
}

export default UcPopup;
