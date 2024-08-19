import { render } from '@testing-library/react';

import FlightsPopupFareAccordion from './flights-popup-fare-accordion';

describe('FlightsPopupFareAccordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsPopupFareAccordion />);
    expect(baseElement).toBeTruthy();
  });
});
