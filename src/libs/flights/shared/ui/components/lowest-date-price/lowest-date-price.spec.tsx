import { render } from '@testing-library/react';

import LowestDatePrice from './lowest-date-price';

describe('LowestDatePrice', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LowestDatePrice />);
    expect(baseElement).toBeTruthy();
  });
});
