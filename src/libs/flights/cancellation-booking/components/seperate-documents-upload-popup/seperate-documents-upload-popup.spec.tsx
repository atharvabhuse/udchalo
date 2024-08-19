import { render } from '@testing-library/react';

import SeperateDocumentsUploadPopup from './seperate-documents-upload-popup';

describe('SeperateDocumentsUploadPopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SeperateDocumentsUploadPopup />);
    expect(baseElement).toBeTruthy();
  });
});
