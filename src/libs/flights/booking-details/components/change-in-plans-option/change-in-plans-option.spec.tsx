import { render } from '@testing-library/react';

import ChangeInPlansOption from './change-in-plans-option';

describe('ChangeInPlansOption', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChangeInPlansOption />);
    expect(baseElement).toBeTruthy();
  });
});
