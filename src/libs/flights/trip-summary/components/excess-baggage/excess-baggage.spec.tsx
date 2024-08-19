import { render } from '@testing-library/react';

import ExcessBaggage from './excess-baggage';

describe('ExcessBaggage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExcessBaggage />);
    expect(baseElement).toBeTruthy();
  });
});
