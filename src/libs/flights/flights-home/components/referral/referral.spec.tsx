import { render } from '@testing-library/react';

import Referral from './referral';

describe('Referral', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Referral />);
    expect(baseElement).toBeTruthy();
  });
});
