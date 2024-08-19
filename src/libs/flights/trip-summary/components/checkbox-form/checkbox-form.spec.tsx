import { render } from '@testing-library/react';

import CheckboxForm from './checkbox-form';

describe('CheckboxForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckboxForm />);
    expect(baseElement).toBeTruthy();
  });
});
