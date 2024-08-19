import { render } from '@testing-library/react';

import {UcTravellerForm} from './uc-traveller-form';

describe('UcTravellerForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcTravellerForm />);
    expect(baseElement).toBeTruthy();
  });
});
