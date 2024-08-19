import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import styles from './uc-follow-us-and-download.module.scss';

/* eslint-disable-next-line */
interface Icons {
  icon: ReactNode;
  link: string;
}
export interface UcFollowUsAndDownloadProps {
  heading: string;
  icons: Icons[];
}

function UcFollowUsAndDownload(props: UcFollowUsAndDownloadProps) {
  const { heading, icons } = props;
  const router = useRouter();
  const clickHandler = (data: Icons) => {
    router.push(data.link);
  };
  return (
    <div className={styles.followus_container}>
      <div className={styles.followus_heading}>{heading}</div>
      <div className={styles.followus_icon_row}>
        {icons?.map((data, index: number) => (
          <button type="button" className={styles.icons} onClick={() => clickHandler(data)} key={`icons-${index}`}>
            {data.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

export default UcFollowUsAndDownload;
