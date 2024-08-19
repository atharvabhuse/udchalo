import { render } from '@testing-library/react';

import FaujiFares from './fauji-fares';

describe('FaujiFares', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FaujiFares />);
    expect(baseElement).toBeTruthy();
  });
});
