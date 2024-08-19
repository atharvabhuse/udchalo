import { render } from '@testing-library/react';

import FlightSummaryCard from './flight-summary-card';

describe('FlightSummaryCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightSummaryCard />);
    expect(baseElement).toBeTruthy();
  });
});
