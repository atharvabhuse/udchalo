import { render } from '@testing-library/react';

import Meal from './meal';

describe('Meal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Meal />);
    expect(baseElement).toBeTruthy();
  });
});
