import { Stepper, Step, StepLabel, StepContent } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './cancellation-stepper.module.scss';
import { dateToTextConvertHandler } from '@uc/utils';
import { usePathname } from 'next/navigation';

export interface CancellationStepperProps {
  stepperDetails: any;
  activeStepCallback: (arg: number) => void;
}

function CancellationStepper({ stepperDetails, activeStepCallback }: CancellationStepperProps) {
  const [gender, setGender] = useState('');
  useEffect(() => {
    if (stepperDetails?.gender === 'male') {
      setGender('M');
    } else if (stepperDetails?.gender === 'female') {
      setGender('F');
    } else if (stepperDetails?.gender === 'transgender') {
      setGender('T');
    }
  }, [stepperDetails]);
  const stepContentStyle = { color: '#545454' };

  const [activeStep, setActiveStep] = useState(0);
  useEffect(()=> {
    activeStepCallback(activeStep);
  },[])
  return (
    <div className={styles.stepper}>
      <Stepper orientation="vertical" activeStep={activeStep}>
        <Step key={1}>
          <StepLabel>Cancellation Requested</StepLabel>
          <StepContent style={stepContentStyle}>{dateToTextConvertHandler(new Date().toString())}</StepContent>
        </Step>
        <Step key={2}>
          <StepLabel>Processing Refund</StepLabel>
        </Step>
        <Step key={3}>
          <StepLabel>Refund Processed</StepLabel>
        </Step>
      </Stepper>
    </div>
  );
}
export default CancellationStepper;
