import { render } from '@testing-library/react';

import Extras from './extras';

describe('Extras', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Extras />);
    expect(baseElement).toBeTruthy();
  });
});
