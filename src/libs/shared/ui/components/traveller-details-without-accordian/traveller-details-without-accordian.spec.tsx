import { render } from '@testing-library/react';

import TravellerDetailsWithoutAccordian from './traveller-details-without-accordian';

describe('TravellerDetailsWithoutAccordian', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TravellerDetailsWithoutAccordian />);
    expect(baseElement).toBeTruthy();
  });
});
