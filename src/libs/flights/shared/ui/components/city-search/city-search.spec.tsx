import { render } from '@testing-library/react';

import CitySearch from './city-search';

describe('CitySearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CitySearch />);
    expect(baseElement).toBeTruthy();
  });
});
