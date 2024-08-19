import { render } from '@testing-library/react';

import DownloadApp from './download-app';

describe('DownloadApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DownloadApp />);
    expect(baseElement).toBeTruthy();
  });
});
