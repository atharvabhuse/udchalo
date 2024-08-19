import { render } from '@testing-library/react';

import {UcCTABanner} from './uc-ctabanner';

describe('UcCTABanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcCTABanner />);
    expect(baseElement).toBeTruthy();
  });
});
