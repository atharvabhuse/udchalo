import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface UcBodyPortalProps {
  children?: ReactNode;
}

export const UcBodyPortal = (props: UcBodyPortalProps) => createPortal(props.children, document.body);
