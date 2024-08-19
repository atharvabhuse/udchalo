import { render } from '@testing-library/react';

import FlightsSeatSelection from './flights-seat-selection';

describe('FlightsSeatSelection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsSeatSelection />);
    expect(baseElement).toBeTruthy();
  });
});
