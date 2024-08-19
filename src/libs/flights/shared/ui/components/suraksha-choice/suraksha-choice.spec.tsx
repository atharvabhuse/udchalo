import { render } from '@testing-library/react';

import SurakshaChoice from './suraksha-choice';

describe('SurakshaChoice', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SurakshaChoice />);
    expect(baseElement).toBeTruthy();
  });
});
