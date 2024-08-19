import { render } from '@testing-library/react';

import CancelBookingPopup from './cancel-booking-popup';

describe('CancelBookingPopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CancelBookingPopup />);
    expect(baseElement).toBeTruthy();
  });
});
