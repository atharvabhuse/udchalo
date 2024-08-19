import { render } from '@testing-library/react';

import ContactDetailsForm from './contact-details-form';

describe('ContactDetailsForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContactDetailsForm />);
    expect(baseElement).toBeTruthy();
  });
});
