import { render } from '@testing-library/react';

import UcDatePicker from './uc-date-picker';

describe('UcDatePicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcDatePicker />);
    expect(baseElement).toBeTruthy();
  });
});
