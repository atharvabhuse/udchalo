import { render } from '@testing-library/react';

import ProceedToPay from './proceed-to-pay';

describe('ProceedToPay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProceedToPay />);
    expect(baseElement).toBeTruthy();
  });
});
