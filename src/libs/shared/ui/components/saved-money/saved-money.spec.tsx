import { render } from '@testing-library/react';

import SavedMoney from './saved-money';

describe('SavedMoney', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SavedMoney />);
    expect(baseElement).toBeTruthy();
  });
});
