import { render } from '@testing-library/react';

import UcSortMenu from './uc-sort-menu';

describe('UcSortMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcSortMenu />);
    expect(baseElement).toBeTruthy();
  });
});
