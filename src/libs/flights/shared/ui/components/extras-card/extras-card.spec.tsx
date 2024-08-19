import { render } from '@testing-library/react';

import ExtrasCard from './extras-card';

describe('ExtrasCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExtrasCard />);
    expect(baseElement).toBeTruthy();
  });
});
