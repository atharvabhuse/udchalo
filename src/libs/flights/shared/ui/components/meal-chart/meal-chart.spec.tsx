import { render } from '@testing-library/react';

import MealChart from './meal-chart';

describe('MealChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MealChart />);
    expect(baseElement).toBeTruthy();
  });
});
