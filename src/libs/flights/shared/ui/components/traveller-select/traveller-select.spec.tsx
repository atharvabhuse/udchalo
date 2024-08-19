import { render } from '@testing-library/react';

import TravellerSelect from './traveller-select';

describe('TravellerSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TravellerSelect />);
    expect(baseElement).toBeTruthy();
  });
});
