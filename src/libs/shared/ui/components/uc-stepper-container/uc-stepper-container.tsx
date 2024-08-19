import { Step, StepConnector, StepIconProps, StepLabel, Stepper, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { BaggageIcon, MealIcon, SeatIcon } from '@uc/libs/shared/ui';
import styles from './uc-stepper-container.module.scss';

const stepArray = [
  {
    label: 'Select Seat(s)',
    icon: <SeatIcon />,
  },
  {
    label: 'Add Meal(s)',
    icon: <MealIcon />,
  },
  {
    label: 'Excess Baggage',
    icon: <BaggageIcon />,
  },
];

const ExtrasStepIconRoot = styled('div')<{ ownerState: { completed?: boolean; active?: boolean } }>(
  ({ theme, ownerState }) => ({
    display: 'grid',
    placeContent: 'center',
    width: '34px',
    height: '34px',
    backgroundColor: '#EDF7FF',
    borderRadius: '100%',
    cursor: 'pointer',
    ...(ownerState.active && { backgroundColor: '#3398D5' }),
    ...(ownerState.completed && { backgroundColor: '#3398D5' }),
  })
);

function ExtrasStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;

  return (
    <ExtrasStepIconRoot ownerState={{ completed, active }} className={className}>
      {stepArray[Number(icon) - 1].icon}
    </ExtrasStepIconRoot>
  );
}

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 17, // i.e. 34/2
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: { backgroundColor: '#3398D5' },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: { backgroundColor: '#3398D5' },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

/* eslint-disable-next-line */
export interface UcStepperContainerProps {
  activeStep?: number;
  onStepChange: (step: number) => void;
}

export function UcStepperContainer({ activeStep, onStepChange }: UcStepperContainerProps) {
  // const [active, setActive] = useState<number>(activeStep || 0);
  // const stepClickHandler = (data: any, index: number) => setActive(index);
  const stepClickHandler = (data: any, index: number) => onStepChange(index);

  return (
    <div className={styles.stepper}>
      <Stepper nonLinear alternativeLabel activeStep={activeStep} connector={<CustomStepConnector />}>
        {stepArray.map((data, index: number) => (
          <Step key={`stepArray-${index}`} onClick={() => stepClickHandler(data, index)} className={styles.step}>
            <StepLabel
              StepIconComponent={ExtrasStepIcon}
              style={{ fontSize: window.innerWidth > 600 ? '12px' : '8px' }}>
              {data.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default UcStepperContainer;
