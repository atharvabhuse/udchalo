import { render } from '@testing-library/react';

import FlightSearchForm from './flight-search-form';

describe('FlightSearchForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightSearchForm />);
    expect(baseElement).toBeTruthy();
  });
});
