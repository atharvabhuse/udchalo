import { render } from '@testing-library/react';

import TravellerContactDetailsCard from './traveller-contact-details-card';

describe('TravellerContactDetailsCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TravellerContactDetailsCard />);
    expect(baseElement).toBeTruthy();
  });
});
