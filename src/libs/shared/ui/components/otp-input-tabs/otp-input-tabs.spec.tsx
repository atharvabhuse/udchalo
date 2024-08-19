import { render } from '@testing-library/react';

import OtpInputTabs from './otp-input-tabs';

describe('OtpInputTabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OtpInputTabs />);
    expect(baseElement).toBeTruthy();
  });
});
