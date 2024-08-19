import { render } from '@testing-library/react';

import BuddyInvite from './buddy-invite';

describe('BuddyInvite', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BuddyInvite />);
    expect(baseElement).toBeTruthy();
  });
});
