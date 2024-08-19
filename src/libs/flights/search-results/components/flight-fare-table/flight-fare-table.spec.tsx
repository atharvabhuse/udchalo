import { render } from '@testing-library/react';
import FlightFareTable from './flight-fare-table';

describe('FlightFareTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightFareTable />);
    expect(baseElement).toBeTruthy();
  });
});
