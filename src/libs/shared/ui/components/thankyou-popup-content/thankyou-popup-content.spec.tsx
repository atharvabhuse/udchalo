import { render } from '@testing-library/react';

import ThankyouPopupContent from './thankyou-popup-content';

describe('ThankyouPopupContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThankyouPopupContent />);
    expect(baseElement).toBeTruthy();
  });
});
