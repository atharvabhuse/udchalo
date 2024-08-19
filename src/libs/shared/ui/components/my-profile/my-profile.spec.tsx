import { render } from '@testing-library/react';

import MyProfile from './my-profile';

describe('MyProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyProfile />);
    expect(baseElement).toBeTruthy();
  });
});
