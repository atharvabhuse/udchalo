import { render } from '@testing-library/react';

import ConfirmAndPayPopup from './confirm-and-pay-popup';

describe('ConfirmAndPayPopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConfirmAndPayPopup />);
    expect(baseElement).toBeTruthy();
  });
});
