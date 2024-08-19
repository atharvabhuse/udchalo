import { render } from '@testing-library/react';

import UcConfirmation from './confirmation';

describe('UcConfirmation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcConfirmation />);
    expect(baseElement).toBeTruthy();
  });
});
