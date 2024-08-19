import { render } from '@testing-library/react';

import {UcRating} from './uc-rating';

describe('UcRating', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcRating />);
    expect(baseElement).toBeTruthy();
  });
});
