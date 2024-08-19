import { render } from '@testing-library/react';

import {DeleteTravelerModal} from './delete-traveler-modal';

describe('DeleteTravelerModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteTravelerModal open={false} />);
    expect(baseElement).toBeTruthy();
  });
});
