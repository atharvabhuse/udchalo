import { render } from '@testing-library/react';

import FlightRoutes from './flight-routes';

describe('FlightRoutes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightRoutes />);
    expect(baseElement).toBeTruthy();
  });
});
