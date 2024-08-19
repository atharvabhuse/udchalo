import { render } from '@testing-library/react';

import ShareViaSocialMediaPopup from './share-via-social-media-popup';

describe('ShareViaSocialMediaPopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShareViaSocialMediaPopup />);
    expect(baseElement).toBeTruthy();
  });
});
