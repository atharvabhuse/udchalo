import { render } from '@testing-library/react';

import {UcSwitch} from './uc-switch';

describe('UcSwitch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcSwitch />);
    expect(baseElement).toBeTruthy();
  });
});
