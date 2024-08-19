import { render } from '@testing-library/react';

import FlightsMyBooking from './flights-my-booking';

describe('FlightsMyBooking', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsMyBooking />);
    expect(baseElement).toBeTruthy();
  });
});
