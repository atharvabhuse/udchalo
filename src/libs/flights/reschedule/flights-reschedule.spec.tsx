import { render } from '@testing-library/react';

import FlightsReschedule from './flights-reschedule';

describe('FlightsReschedule', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsReschedule />);
    expect(baseElement).toBeTruthy();
  });
});
