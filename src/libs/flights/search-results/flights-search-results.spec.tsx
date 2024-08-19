import { render } from '@testing-library/react';

import FlightsSearchResults from './flights-search-results';

describe('FlightsSearchResults', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsSearchResults />);
    expect(baseElement).toBeTruthy();
  });
});
