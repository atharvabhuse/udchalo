import { render } from '@testing-library/react';

import {UcProfileSavedTravelerCard} from './uc-profile-saved-traveler-card';

describe('UcProfileSavedTravelerCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcProfileSavedTravelerCard />);
    expect(baseElement).toBeTruthy();
  });
});
