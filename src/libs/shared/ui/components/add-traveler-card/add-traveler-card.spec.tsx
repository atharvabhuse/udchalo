import { render } from '@testing-library/react';

import AddTravelerCard from './add-traveler-card';

describe('AddTravelerCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddTravelerCard />);
    expect(baseElement).toBeTruthy();
  });
});
