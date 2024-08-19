import { render } from '@testing-library/react';

import TripSummaryHeader from './trip-summary-header';

describe('TripSummaryHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripSummaryHeader />);
    expect(baseElement).toBeTruthy();
  });
});
