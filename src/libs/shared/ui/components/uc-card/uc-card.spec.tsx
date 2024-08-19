import { render } from '@testing-library/react';

import UcCard from './uc-card';

describe('UcCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcCard />);
    expect(baseElement).toBeTruthy();
  });
});
