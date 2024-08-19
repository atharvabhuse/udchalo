import { render } from '@testing-library/react';

import SelectHeaderBannerModal from './select-header-banner--modal';

describe('SelectHeaderBannerModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectHeaderBannerModal />);
    expect(baseElement).toBeTruthy();
  });
});
