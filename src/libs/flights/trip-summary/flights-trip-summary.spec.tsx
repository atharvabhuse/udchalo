import { render } from '@testing-library/react';

import FlightsTripSummary from './flights-trip-summary';

describe('FlightsTripSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsTripSummary />);
    expect(baseElement).toBeTruthy();
  });
});
