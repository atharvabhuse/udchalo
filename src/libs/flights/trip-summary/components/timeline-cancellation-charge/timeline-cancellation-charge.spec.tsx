import { render } from '@testing-library/react';

import TimelineCancellationCharge from './timeline-cancellation-charge';

describe('TimelineCancellationCharge', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TimelineCancellationCharge />);
    expect(baseElement).toBeTruthy();
  });
});
