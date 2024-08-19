import { render } from '@testing-library/react';

import UcDatePriceCarousel from './uc-date-price-carousel';

describe('UcDatePriceCarousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcDatePriceCarousel />);
    expect(baseElement).toBeTruthy();
  });
});
