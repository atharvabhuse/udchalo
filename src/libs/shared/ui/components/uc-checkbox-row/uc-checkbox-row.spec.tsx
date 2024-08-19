import { render } from '@testing-library/react';

import UcCheckboxRow from './uc-checkbox-row';

describe('UcCheckboxRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcCheckboxRow />);
    expect(baseElement).toBeTruthy();
  });
});
