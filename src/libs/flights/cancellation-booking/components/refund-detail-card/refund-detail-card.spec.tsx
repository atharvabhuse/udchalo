import { render } from '@testing-library/react';

import RefundDetailCard from './refund-detail-card';

describe('RefundDetailCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RefundDetailCard />);
    expect(baseElement).toBeTruthy();
  });
});
