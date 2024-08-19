import { render } from '@testing-library/react';

import CreditScreen from './credit-screen';

describe('CreditScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreditScreen />);
    expect(baseElement).toBeTruthy();
  });
});
