import { render } from '@testing-library/react';

import FlightsPopupLegsAndTravelers from './flights-popup-legs-and-travelers';

describe('FlightsPopupLegsAndTravelers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsPopupLegsAndTravelers />);
    expect(baseElement).toBeTruthy();
  });
});
