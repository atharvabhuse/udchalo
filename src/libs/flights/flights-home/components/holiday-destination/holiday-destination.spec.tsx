import { render } from '@testing-library/react';

import HolidayDestination from './holiday-destination';

describe('HolidayDestination', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HolidayDestination />);
    expect(baseElement).toBeTruthy();
  });
});
