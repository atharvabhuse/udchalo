import { render } from '@testing-library/react';

import FlightsCancellationBooking from './flights-cancellation-booking';

describe('FlightsCancellationBooking', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsCancellationBooking />);
    expect(baseElement).toBeTruthy();
  });
});
