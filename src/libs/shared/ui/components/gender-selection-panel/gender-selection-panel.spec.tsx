import { render } from '@testing-library/react';

import GenderSelectionPanel from './gender-selection-panel';

describe('GenderSelectionPanel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GenderSelectionPanel />);
    expect(baseElement).toBeTruthy();
  });
});
