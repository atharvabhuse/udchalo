import { render } from '@testing-library/react';

import BaggageAllowance from './baggage-allowance';

describe('BaggageAllowance', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BaggageAllowance />);
    expect(baseElement).toBeTruthy();
  });
});
