import { render } from '@testing-library/react';

import WhyBookUs from './why-book-us';

describe('WhyBookUs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WhyBookUs />);
    expect(baseElement).toBeTruthy();
  });
});
