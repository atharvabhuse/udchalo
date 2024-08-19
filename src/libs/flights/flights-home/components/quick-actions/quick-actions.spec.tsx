import { render } from '@testing-library/react';

import QuickActions from './quick-actions';

describe('QuickActions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuickActions />);
    expect(baseElement).toBeTruthy();
  });
});
