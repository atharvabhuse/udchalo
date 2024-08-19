import { render } from '@testing-library/react';

import UcCarousel from './uc-carousel';

describe('UcCarousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcCarousel />);
    expect(baseElement).toBeTruthy();
  });
});
