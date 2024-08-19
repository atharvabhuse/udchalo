import { render } from '@testing-library/react';

import FlightLegDetails from './flight-leg-details';

describe('FlightLegDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightLegDetails />);
    expect(baseElement).toBeTruthy();
  });
});
