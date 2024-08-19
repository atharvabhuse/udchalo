import { render } from '@testing-library/react';

import {UcNotificationsSettings} from './uc-notifications-settings';

describe('UcNotificationsSettings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcNotificationsSettings />);
    expect(baseElement).toBeTruthy();
  });
});
