import { render } from '@testing-library/react';

import FlightsSeatSelectionSummary from './flights-seat-selection-summary';

describe('FlightsSeatSelectionSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsSeatSelectionSummary />);
    expect(baseElement).toBeTruthy();
  });
});
