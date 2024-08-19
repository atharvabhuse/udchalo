import { render } from '@testing-library/react';

import FlightSummary from './flight-summary';

describe('FlightSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightSummary />);
    expect(baseElement).toBeTruthy();
  });
});
