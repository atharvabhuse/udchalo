import { render } from '@testing-library/react';

import {UcDiscountCoupon} from './uc-discount-coupon';

describe('UcDiscountCoupon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcDiscountCoupon />);
    expect(baseElement).toBeTruthy();
  });
});
