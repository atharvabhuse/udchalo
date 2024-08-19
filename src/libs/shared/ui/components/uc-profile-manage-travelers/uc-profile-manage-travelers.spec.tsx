import { render } from '@testing-library/react';

import UcProfileManageTravelers from './uc-profile-manage-travelers';

describe('UcProfileManageTravelers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcProfileManageTravelers />);
    expect(baseElement).toBeTruthy();
  });
});
