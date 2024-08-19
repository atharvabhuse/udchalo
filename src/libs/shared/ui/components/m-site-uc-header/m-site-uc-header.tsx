import { LeftArrowIcon } from '@uc/libs/shared/ui';
import { ReactNode } from 'react';
import styles from './m-site-uc-header.module.scss';

/* eslint-disable-next-line */
export interface MSiteUcHeaderProps {
  children?: any;
  backHandler: any;
}

export function MSiteUcHeader({ children, backHandler }: MSiteUcHeaderProps) {
  return (
    <div className={styles.msite_header_root}>
      <div className={styles.header_contents}>
        <LeftArrowIcon className={styles.left_arrow_icon} onClick={backHandler} />

        <div className={styles.content_container}>{children}</div>
      </div>
    </div>
  );
}

interface ContentProps {
  children: ReactNode;
  [key: string]: any;
}

MSiteUcHeader.LeftContent = function ({ children }: ContentProps) {
  return <div className={styles.content}>{children}</div>;
};

MSiteUcHeader.RightContent = function ({ children }: ContentProps) {
  return <div className={styles.content}>{children}</div>;
};

export default MSiteUcHeader;
