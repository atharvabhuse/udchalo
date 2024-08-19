import { render } from '@testing-library/react';

import CoinScreen from './coin-screen';

describe('CoinScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CoinScreen />);
    expect(baseElement).toBeTruthy();
  });
});
