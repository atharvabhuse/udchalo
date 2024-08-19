import { render } from '@testing-library/react';

import {UcPayments} from './uc-payments';

describe('UcPayments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcPayments />);
    expect(baseElement).toBeTruthy();
  });
});
