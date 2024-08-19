import { render } from '@testing-library/react';

import FlightsBookingDetails from './flights-booking-details';

describe('FlightsBookingDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsBookingDetails />);
    expect(baseElement).toBeTruthy();
  });
});
