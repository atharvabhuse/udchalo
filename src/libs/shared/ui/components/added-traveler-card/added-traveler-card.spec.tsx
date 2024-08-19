import { render } from '@testing-library/react';

import AddedTravelerCard from './added-traveler-card';

describe('AddedTravelerCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddedTravelerCard />);
    expect(baseElement).toBeTruthy();
  });
});
