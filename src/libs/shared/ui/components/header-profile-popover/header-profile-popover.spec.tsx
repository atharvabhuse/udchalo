import { render } from '@testing-library/react';

import HeaderProfilePopover from './header-profile-popover';

describe('HeaderProfilePopover', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeaderProfilePopover />);
    expect(baseElement).toBeTruthy();
  });
});
