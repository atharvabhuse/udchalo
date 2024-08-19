import { render } from '@testing-library/react';

import SliderFilter from './slider-filter';

describe('SliderFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SliderFilter />);
    expect(baseElement).toBeTruthy();
  });
});
