import { render } from '@testing-library/react';

import CancellationSteps from './cancellation-steps';

describe('CancellationSteps', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CancellationSteps />);
    expect(baseElement).toBeTruthy();
  });
});
