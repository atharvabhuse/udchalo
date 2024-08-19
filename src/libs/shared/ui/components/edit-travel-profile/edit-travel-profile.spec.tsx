import { render } from '@testing-library/react';

import EditTravelProfile from './edit-travel-profile';

describe('EditTravelProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditTravelProfile />);
    expect(baseElement).toBeTruthy();
  });
});
