import { render } from '@testing-library/react';

import FlightExtras from './flight-extras';

describe('FlightExtras', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightExtras />);
    expect(baseElement).toBeTruthy();
  });
});
