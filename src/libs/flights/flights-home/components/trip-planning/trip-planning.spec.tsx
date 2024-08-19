import { render } from '@testing-library/react';

import TripPlanning from './trip-planning';

describe('TripPlanning', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripPlanning />);
    expect(baseElement).toBeTruthy();
  });
});
