import { render } from '@testing-library/react';

import TravelAdvisory from './travel-advisory';

describe('TravelAdvisory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TravelAdvisory />);
    expect(baseElement).toBeTruthy();
  });
});
