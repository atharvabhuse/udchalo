import { render } from '@testing-library/react';

import UcFollowUsAndDownload from './uc-follow-us-and-download';

describe('UcFollowUsAndDownload', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcFollowUsAndDownload />);
    expect(baseElement).toBeTruthy();
  });
});
