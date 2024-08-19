import { render } from '@testing-library/react';

import UcFaujiFaresCarousel from './uc-fauji-fares-carousel';

describe('UcFaujiFaresCarousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcFaujiFaresCarousel />);
    expect(baseElement).toBeTruthy();
  });
});
