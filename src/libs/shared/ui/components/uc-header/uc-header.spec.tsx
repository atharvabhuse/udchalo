import { render } from '@testing-library/react';

import UcHeader from './uc-header';

describe('UcHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcHeader />);
    expect(baseElement).toBeTruthy();
  });
});
