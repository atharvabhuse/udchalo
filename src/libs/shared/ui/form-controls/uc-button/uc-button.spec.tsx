import { render } from '@testing-library/react';

import {UcButton} from './uc-button';

describe('UcButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcButton />);
    expect(baseElement).toBeTruthy();
  });
});
