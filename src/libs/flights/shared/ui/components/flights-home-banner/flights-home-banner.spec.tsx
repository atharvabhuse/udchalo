import { render } from '@testing-library/react';

import FlightsHomeBanner from './flights-home-banner';

describe('FlightsHomeBanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsHomeBanner />);
    expect(baseElement).toBeTruthy();
  });
});
