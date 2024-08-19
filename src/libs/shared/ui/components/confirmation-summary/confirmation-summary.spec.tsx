import { render } from '@testing-library/react';

import ConfirmationSummary from './confirmation-summary';

describe('ConfirmationSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConfirmationSummary />);
    expect(baseElement).toBeTruthy();
  });
});
