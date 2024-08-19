import { render } from '@testing-library/react';

import BaggageChart from './baggage-chart';

describe('BaggageChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BaggageChart />);
    expect(baseElement).toBeTruthy();
  });
});
