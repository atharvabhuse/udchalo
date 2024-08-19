import { render } from '@testing-library/react';

import MSiteUcHeader from './m-site-uc-header';

describe('MSiteUcHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MSiteUcHeader />);
    expect(baseElement).toBeTruthy();
  });
});
