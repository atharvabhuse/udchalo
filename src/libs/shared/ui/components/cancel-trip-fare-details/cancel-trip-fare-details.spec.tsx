import { render } from '@testing-library/react';

import CancelTripFareDetails from './cancel-trip-fare-details';

describe('CancelTripFareDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CancelTripFareDetails />);
    expect(baseElement).toBeTruthy();
  });
});
