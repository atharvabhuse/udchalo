import { render } from '@testing-library/react';

import ModeOfRefund from './mode-of-refund';

describe('ModeOfRefund', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModeOfRefund />);
    expect(baseElement).toBeTruthy();
  });
});
