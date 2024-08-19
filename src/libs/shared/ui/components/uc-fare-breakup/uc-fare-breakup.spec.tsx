import { render } from '@testing-library/react';

import {UcFareBreakup} from './uc-fare-breakup';

describe('UcFareBreakup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcFareBreakup />);
    expect(baseElement).toBeTruthy();
  });
});
