import { render } from '@testing-library/react';

import TravellerFormCollapsibleWrapper from './traveller-form-collapsible-wrapper';

describe('TravellerFormCollapsibleWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TravellerFormCollapsibleWrapper />);
    expect(baseElement).toBeTruthy();
  });
});
