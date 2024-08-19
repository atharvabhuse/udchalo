import { render } from '@testing-library/react';

import {DeleteAccountModal} from './delete-account-modal';

describe('DeleteAccountModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteAccountModal />);
    expect(baseElement).toBeTruthy();
  });
});
