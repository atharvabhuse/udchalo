import { render } from '@testing-library/react';

import BookNow from './book-now';

describe('BookNow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookNow />);
    expect(baseElement).toBeTruthy();
  });
});
