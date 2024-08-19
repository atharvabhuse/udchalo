import { render } from '@testing-library/react';

import UcFooter from './uc-footer';

describe('UcFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcFooter />);
    expect(baseElement).toBeTruthy();
  });
});
