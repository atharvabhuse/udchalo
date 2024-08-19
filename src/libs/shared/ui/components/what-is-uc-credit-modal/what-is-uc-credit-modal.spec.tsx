import { render } from '@testing-library/react';

import {WhatIsUcCreditModal} from './what-is-uc-credit-modal';

describe('WhatIsUcCreditModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WhatIsUcCreditModal />);
    expect(baseElement).toBeTruthy();
  });
});
