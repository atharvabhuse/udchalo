import { render } from '@testing-library/react';

import PayAdvertisement from './pay-advertisement';

describe('PayAdvertisement', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PayAdvertisement />);
    expect(baseElement).toBeTruthy();
  });
});
