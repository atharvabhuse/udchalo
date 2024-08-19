import { render } from '@testing-library/react';

import FlightsWebCheckin from './flights-web-checkin';

describe('FlightsWebCheckin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsWebCheckin />);
    expect(baseElement).toBeTruthy();
  });
});
