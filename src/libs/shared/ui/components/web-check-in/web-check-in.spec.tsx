import { render } from '@testing-library/react';

import {WebCheckIn} from './web-check-in';

describe('WebCheckIn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebCheckIn />);
    expect(baseElement).toBeTruthy();
  });
});
