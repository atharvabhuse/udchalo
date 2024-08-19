import { render } from '@testing-library/react';

import FlightsSharedUi from './flights-shared-ui';

describe('FlightsSharedUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsSharedUi />);
    expect(baseElement).toBeTruthy();
  });
});
