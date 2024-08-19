import { render } from '@testing-library/react';

import ThankyouPopup from './thankyou-popup';

describe('ThankyouPopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThankyouPopup />);
    expect(baseElement).toBeTruthy();
  });
});
