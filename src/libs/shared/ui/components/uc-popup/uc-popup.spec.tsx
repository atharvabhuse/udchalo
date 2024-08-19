import { render } from '@testing-library/react';

import {UcPopup} from './uc-popup';

describe('UcPopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UcPopup />);
    expect(baseElement).toBeTruthy();
  });
});
