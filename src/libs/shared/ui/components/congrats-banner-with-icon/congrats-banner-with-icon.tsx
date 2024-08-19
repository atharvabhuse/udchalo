import styles from './congrats-banner-with-icon.module.scss';

/* eslint-disable-next-line */
export interface CongratsBannerWithIconProps {
  leftIcon?: any;
  titles?: any;
  rightIcon?: any;
}

export function CongratsBannerWithIcon(props: CongratsBannerWithIconProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon_titles}>
        <div className={styles.icons}>
          <props.leftIcon />
        </div>
        <div className={styles.titles}>
          <h1 className={styles.title}>{props.titles.title}</h1>
          <h1 className={styles.sub_title}>{props.titles.subTitle}</h1>
        </div>
      </div>
      <div className={styles.right_sided_icon}>
        <props.rightIcon />
      </div>
    </div>
  );
}

export default CongratsBannerWithIcon;
