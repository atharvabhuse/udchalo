import { render } from '@testing-library/react';

import {UcStepperContainer} from './uc-stepper-container';

describe('UcStepperContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcStepperContainer />);
    expect(baseElement).toBeTruthy();
  });
});
