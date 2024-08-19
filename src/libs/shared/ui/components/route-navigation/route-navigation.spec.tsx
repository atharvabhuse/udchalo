import { render } from '@testing-library/react';

import RouteNavigation from './route-navigation';

describe('RouteNavigation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RouteNavigation />);
    expect(baseElement).toBeTruthy();
  });
});
