import { render } from '@testing-library/react';

import TotalPayMsiteAccordian from './total-pay-msite-accordian';

describe('TotalPayMsiteAccordian', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TotalPayMsiteAccordian />);
    expect(baseElement).toBeTruthy();
  });
});
