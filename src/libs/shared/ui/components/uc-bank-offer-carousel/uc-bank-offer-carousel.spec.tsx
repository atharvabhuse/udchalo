import { render } from '@testing-library/react';

import UcBankOfferCarousel from './uc-bank-offer-carousel';

describe('UcBankOfferCarousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcBankOfferCarousel />);
    expect(baseElement).toBeTruthy();
  });
});
