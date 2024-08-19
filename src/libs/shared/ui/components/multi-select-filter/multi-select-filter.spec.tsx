import { render } from '@testing-library/react';

import MultiSelectFilter from './multi-select-filter';

describe('MultiSelectFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MultiSelectFilter />);
    expect(baseElement).toBeTruthy();
  });
});
