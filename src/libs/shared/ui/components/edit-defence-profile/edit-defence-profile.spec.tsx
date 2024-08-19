import { render } from '@testing-library/react';

import EditDefenceProfile from './edit-defence-profile';

describe('EditDefenceProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditDefenceProfile />);
    expect(baseElement).toBeTruthy();
  });
});
