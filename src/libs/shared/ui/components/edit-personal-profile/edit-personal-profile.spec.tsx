import { render } from '@testing-library/react';

import EditPersonalProfile from './edit-personal-profile';

describe('EditPersonalProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditPersonalProfile />);
    expect(baseElement).toBeTruthy();
  });
});
