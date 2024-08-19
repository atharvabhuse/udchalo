import { render } from '@testing-library/react';

import {UcVisaServicesCarousel} from './uc-visa-services-carousel';

describe('UcVisaServicesCarousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcVisaServicesCarousel />);
    expect(baseElement).toBeTruthy();
  });
});
