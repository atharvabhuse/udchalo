import { render } from '@testing-library/react';

import {UcPromo} from './uc-promo';

describe('UcPromo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcPromo />);
    expect(baseElement).toBeTruthy();
  });
});
