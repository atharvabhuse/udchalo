import { ReactNode, useState } from 'react';
import Frame from '@uc/assets/images/Frame.svg';
import styles from './banner-with-icon.module.scss';

export interface BannerWithiconPropTypes {
  bannerType: string;
  heading: string;
}

export function BannerWithicon(props: BannerWithiconPropTypes) {
  return (
    props.bannerType === 'suraksha' && (
      <div className={styles.root}>
        <div className={styles.icon}>
          <Frame />
        </div>
        <div className={styles.heading}>{props.heading}</div>
      </div>
    )
  );
}
export default BannerWithicon;
