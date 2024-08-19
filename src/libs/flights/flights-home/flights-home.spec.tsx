import { render } from '@testing-library/react';

import FlightsHome from './flights-home';

describe('FlightsHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlightsHome />);
    expect(baseElement).toBeTruthy();
  });
});
