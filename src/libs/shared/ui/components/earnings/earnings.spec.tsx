import { render } from '@testing-library/react';

import Earnings from './earnings';

describe('Earnings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Earnings />);
    expect(baseElement).toBeTruthy();
  });
});
