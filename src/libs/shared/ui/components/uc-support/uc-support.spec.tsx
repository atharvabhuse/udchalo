import { render } from '@testing-library/react';

import {UcSupport} from './uc-support';

describe('UcSupport', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcSupport />);
    expect(baseElement).toBeTruthy();
  });
});
