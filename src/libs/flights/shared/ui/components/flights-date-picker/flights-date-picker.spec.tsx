import { render } from '@testing-library/react';

import FlightsDatePicker from './flights-date-picker';

describe('FlightsDatePicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsDatePicker />);
    expect(baseElement).toBeTruthy();
  });
});
