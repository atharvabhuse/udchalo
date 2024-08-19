import { render } from '@testing-library/react';

import {UcSavedTravellerCard} from './uc-saved-traveller-card';

describe('UcSavedTravellerCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcSavedTravellerCard />);
    expect(baseElement).toBeTruthy();
  });
});
