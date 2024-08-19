import { render } from '@testing-library/react';

import PopularData from './popular-data';

describe('PopularData', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PopularData />);
    expect(baseElement).toBeTruthy();
  });
});
