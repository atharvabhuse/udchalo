import { Box, Collapse, Tab, Tabs, ToggleButtonGroup, styled } from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import LeftArrow from '@uc/assets/images/swiper_left_arrow.svg';
import { BaggageChart, IBaggageOption, IMealOption, MealChart } from '@uc/libs/flights/shared/ui';
import SeatChart from '@uc/libs/flights/shared/ui/components/v2/seat-chart-v2/seat-chart-v2';
import { DropdownMenuArrow, NonVegSymbolIcon, UcButton, UcStepperContainer, VegSymbolIcon } from '@uc/libs/shared/ui';
import { IFlightPriceListResponse } from '@uc/services/network';
import UcFareBreakupV2 from '@uc/libs/shared/ui/components/v2/uc-fare-breakup-v2/uc-fare-breakup-v2';
import { formatToINR } from '@uc/utils';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useTripSummaryDispatchContext } from '../../contexts/trip-summary-dispatch.context';
import { useTripSummaryStateContext } from '../../contexts/trip-summary-state.context';
import styles from './flight-extras.module.scss';
// import { seatsArray } from './seats';
// import { flightDetails } from '@uc/utils/confirm-and-pay-popupdata';

const ToggleButton = styled(MuiToggleButton)({
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: '#D9ECE3',
    color: '#454545 !important',
  },
});

/* eslint-disable-next-line */
export interface FlightExtrasProps {
  onSkip: () => void;
}

interface INoExtrasMessage {
  noSeats: string;
  noMeals: string;
  noExcessBaggage: string;
}

function FlightExtras({ onSkip }: FlightExtrasProps) {
  const dispatch = useTripSummaryDispatchContext();
  const {
    flightPriceDetails,
    selectedTravellers,
    currentFlightId,
    currentJourneyType,
    currentLegIdx,
    currentSegmentIdx,
    currentTravellerIdx,
    currentStep,
    selectedSeatsMap,
    currentSeatsMapKey,
    selectedMealsMap,
    fareList,
  } = useTripSummaryStateContext();
  const currentLeg = flightPriceDetails[currentLegIdx].leg;
  const segments = currentLeg?.segments;
  const currentSegment = segments[currentSegmentIdx];
  const seats = currentSegment?.seatMap?.seats;
  const mealOptions = currentSegment?.mealOptions;
  const baggageOptions = currentLeg?.excessBaggageOptions || [];

  const selectedSeats = selectedSeatsMap.get(currentSeatsMapKey) ?? [];
  const selectedMeals = selectedMealsMap?.get(currentSeatsMapKey) ?? [];

  const [filteredMealsOptions, setFilteredMealsOptions] = useState<{
    filterMeals: IMealOption[];
    veg: boolean;
    nonVeg: boolean;
  }>({ filterMeals: mealOptions ?? [], veg: false, nonVeg: false });

  useEffect(() => {
    setFilteredMealsOptions({ filterMeals: mealOptions, veg: false, nonVeg: false });
  }, [mealOptions]);

  const [noExtrasMessage, setNoExtrasMessage] = useState<INoExtrasMessage>({
    noSeats: 'Seats can be selected at the time of check-in',
    noMeals: 'Meal option is not available for shorter trips.',
    noExcessBaggage: '',
  });
  const [viewMoreFareBreakup, setViewMoreFareBreakup] = useState(false);
  const [fareBreakupTotalFare, setFareBreakupTotalFare] = useState(0);

  const totalFareHandler = (data: number) => {
    setFareBreakupTotalFare(data);
  };

  const handleViewMoreBreakUp = () => setViewMoreFareBreakup(!viewMoreFareBreakup);

  const handleSeatSelection = (seat: any) => {
    dispatch({ type: 'SELECT_SEAT', payload: seat });
  };

  const handleSeatDeSelection = (seat: any) => {
    dispatch({ type: 'DESELECT_SEAT', payload: seat });
  };

  const handleMealSelection = (meal: IMealOption) => {
    dispatch({ type: 'SELECT_MEAL', payload: meal });
  };
  const handleMealDeSelection = (meal: IMealOption) => {
    dispatch({ type: 'DESELECT_MEAL', payload: meal });
  };

  const handleStepChange = (newValue: number) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: newValue });
  };

  const handleSegmentChange = (event: SyntheticEvent, newValue: number) => {
    dispatch({ type: 'SET_CURRENT_SEGMENT', payload: newValue });
  };

  const handleTravellerChange = (event: SyntheticEvent, newValue: number) => {
    dispatch({ type: 'SET_CURRENT_TRAVELLER', payload: newValue });
  };

  const handleBaggageSelection = (baggage: IBaggageOption) => {
    dispatch({ type: 'SET_BAGGAGE_SELECTION', payload: baggage });
  };

  const handleNext = () => {
    if (currentStep < 2) {
      handleStepChange(currentStep + 1);
    } else {
      onSkip();
    }
  };

  /* const getSelectedSeats = seat => {
    const seatMap = [];
    passengers.forEach((tv, index) => {
      if (seat) {
        seatMap.push({ seat, passengerName: `${tv.name.firstName} ${tv.name.lastName}`, id: index });
      }
    });
    return seatMap;
  };
 */

  const filterMeals = type => {
    switch (type) {
      case 'Veg':
        if (filteredMealsOptions?.veg) {
          setFilteredMealsOptions({ filterMeals: mealOptions, veg: false, nonVeg: false });
        } else {
          const vegMeals = mealOptions && mealOptions?.filter(meal => !meal?.isNonVeg);
          setFilteredMealsOptions({ filterMeals: vegMeals, veg: true, nonVeg: false });
        }
        break;
      case 'Non-Veg':
        if (filteredMealsOptions?.nonVeg) {
          setFilteredMealsOptions({ filterMeals: mealOptions, nonVeg: false, veg: false });
        } else {
          const nonVegMeals = mealOptions && mealOptions?.filter(meal => meal?.isNonVeg);
          setFilteredMealsOptions({ filterMeals: nonVegMeals, veg: false, nonVeg: true });
        }
        break;
      default:
        break;
    }
  };
  const selectedExcessBaggage =
    (selectedTravellers &&
      (selectedTravellers[currentTravellerIdx]?.ancillaries[currentFlightId]?.baggage as IBaggageOption)) ||
    null;
  /* const preSelectedMeals =
    (selectedTravellers &&
      selectedTravellers.length &&
      Array.from(selectedTravellers[currentTravellerIdx]?.ancillaries[currentFlightId]?.meals?.values())) ||
    []; */

  return (
    <div className={styles.fl_extras}>
      <div className={styles.row}>
        <div className={styles.step_info}>
          <div className={styles.section_heading}>
            <span className={styles.section_number}>3</span>
            <div className={styles.section_title}>
              <div className={styles.title}>Extras</div>
            </div>
          </div>
          <LeftArrow className={styles.leftArrow} />
        </div>
        <div className={styles.stepper}>
          <UcStepperContainer activeStep={currentStep} onStepChange={handleStepChange} />
        </div>
        <div className={styles.skip}>
          <UcButton variant="text" color="secondary" onClick={onSkip}>
            Skip
          </UcButton>
        </div>
      </div>

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {currentStep < 2 ? (
          <Tabs
            value={currentSegmentIdx}
            onChange={handleSegmentChange}
            centered
            sx={{ borderBottom: '1px solid #C5D4E3' }}>
            {segments?.map((segment, index) => (
              <Tab key={`${segment.label}_${index}`} label={`${segment.origin} - ${segment.destination}`} />
            ))}
          </Tabs>
        ) : (
          // Note: For baggage we only consider the origin and destination as it goes into check-in baggage.
          <Tabs value={0} centered sx={{ borderBottom: '1px solid #C5D4E3' }}>
            <Tab label={`${currentLeg.origin} - ${currentLeg.destination}`} />)
          </Tabs>
        )}
      </Box>

      <div className={`${styles.tv_row} ${mealOptions && styles.tv_row_with_meals}`}>
        <ToggleButtonGroup exclusive sx={{ gap: '1rem' }} value={currentTravellerIdx}>
          {selectedTravellers.map((tv, index) => {
            const seat = tv?.ancillaries[currentFlightId]?.seats.find(s => s.segmentIndex === currentSegmentIdx);
            const seatLabel = seat ? `| ${seat.seatNumber}` : '';
            return (
              <ToggleButton
                disableRipple
                size="small"
                onClick={handleTravellerChange}
                className={styles.tv_button}
                key={tv.name.firstName + index}
                value={index}>
                {tv.name.firstName} {tv.name.lastName} {seatLabel}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
        {currentStep === 1 && mealOptions?.length > 0 && (
          <div className={styles.filter_meals_container}>
            <button
              type="button"
              onClick={() => filterMeals('Veg')}
              className={`${styles.veg_button} ${filteredMealsOptions.veg && styles.active_filter_button}`}>
              <VegSymbolIcon />
              <div>Veg</div>
            </button>
            <button
              type="button"
              onClick={() => filterMeals('Non-Veg')}
              className={`${styles.veg_button} ${filteredMealsOptions.nonVeg && styles.active_filter_button}`}>
              <NonVegSymbolIcon />
              <div>Non-veg</div>
            </button>
          </div>
        )}
      </div>

      <div className={styles.content}>
        {currentStep === 0 && (
          <SeatChart
            seats={seats}
            onSeatSelect={handleSeatSelection}
            onSeatDeSelect={handleSeatDeSelection}
            selectedSeats={selectedSeats}
            seatMessage={noExtrasMessage?.noSeats}
          />
        )}
        {currentStep === 1 && (
          <MealChart
            mealOptions={filteredMealsOptions?.filterMeals}
            onMealSelect={handleMealSelection}
            selectedMeals={selectedMeals}
            maxCount={selectedTravellers?.length}
            onMealDeSelect={handleMealDeSelection}
            mealMessage={noExtrasMessage?.noMeals}
          />
        )}
        {currentStep === 2 && (
          <BaggageChart
            baggageOptions={baggageOptions && (baggageOptions as IBaggageOption[])}
            onBaggageSelect={handleBaggageSelection}
            selectedBaggage={selectedExcessBaggage}
          />
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.row}>
          <div className={styles.fare_details}>
            <div>{formatToINR(fareBreakupTotalFare)}</div>
            <UcButton
              variant="text"
              color="secondary"
              style={{ padding: 0 }}
              endIcon={viewMoreFareBreakup ? <DropdownMenuArrow style={{ rotate: '180deg' }} /> : <DropdownMenuArrow />}
              onClick={handleViewMoreBreakUp}>
              View Breakup
            </UcButton>
          </div>
          <div className={styles.cta}>
            <UcButton variant="contained" color="primary" onClick={handleNext}>
              Next
            </UcButton>
          </div>
        </div>
        <Collapse in={viewMoreFareBreakup}>
          {fareList && <UcFareBreakupV2 fareList={fareList} totalFareCallback={totalFareHandler} />}
        </Collapse>
      </div>
    </div>
  );
}

export default FlightExtras;
