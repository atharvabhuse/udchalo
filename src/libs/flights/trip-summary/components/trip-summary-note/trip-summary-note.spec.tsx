import { render } from '@testing-library/react';

import TripSummaryNote from './trip-summary-note';

describe('TripSummaryNote', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripSummaryNote />);
    expect(baseElement).toBeTruthy();
  });
});
