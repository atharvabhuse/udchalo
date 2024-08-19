import { render } from '@testing-library/react';

import {DiscountCouponCard} from './discount-coupon-card';

describe('DiscountCouponCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiscountCouponCard />);
    expect(baseElement).toBeTruthy();
  });
});
