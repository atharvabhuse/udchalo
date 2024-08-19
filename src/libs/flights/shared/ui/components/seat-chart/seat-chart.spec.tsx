import { render } from '@testing-library/react';

import SeatChart from './seat-chart';

describe('SeatChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SeatChart />);
    expect(baseElement).toBeTruthy();
  });
});
