import { render } from '@testing-library/react';

import ChangeInPlans from './change-in-plans';

describe('ChangeInPlans', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChangeInPlans />);
    expect(baseElement).toBeTruthy();
  });
});
