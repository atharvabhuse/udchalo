import { render } from '@testing-library/react';

import CongratsBannerWithIcon from './congrats-banner-with-icon';

describe('CongratsBannerWithIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CongratsBannerWithIcon />);
    expect(baseElement).toBeTruthy();
  });
});
