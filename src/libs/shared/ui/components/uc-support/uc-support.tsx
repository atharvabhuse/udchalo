import Support from '@uc/assets/images/support.svg';
import RightArrow from '@uc/assets/images/right_arrow.svg';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import styles from './uc-support.module.scss';

/* eslint-disable-next-line */
interface ContactOptions {
  icon: ReactNode;
  contactHeading: string;
  contactDescription?: string;
  link: string;
}

export interface UcSupportProps {
  contactOptions: ContactOptions[];
  header: string;
}

function UcSupport(props: UcSupportProps) {
  const { contactOptions, header } = props;
  const router = useRouter();
  const supportClickHandler = () => {
    router.push('https://support.udchalo.com/support/home');
  };
  const isMobile = window?.innerWidth < 600;

  const keyDownClickHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      supportClickHandler();
    }
  };

  return (
    <div className={styles.contact_container}>
      <div className={styles.contact_container_heading}>{isMobile ? 'Contact Us' : header}</div>

      <div className={styles.contact_container_content}>
        {contactOptions?.map((data, index) => (
          <a className={styles.contact_options} href={data.link} key={`conta_options-${index}`}>
            <div className={styles.contact_options_left}>{data.icon}</div>
            <div className={styles.contact_options_right}>
              {isMobile && <div className={styles.contact_options_right_text}>{data.contactDescription}</div>}
              <div className={styles.contact_options_right_link}>{data.contactHeading}</div>
            </div>
          </a>
        ))}
      </div>

      <div
        className={styles.contact_container_support}
        onClick={supportClickHandler}
        onKeyDown={keyDownClickHandler}
        role="button"
        tabIndex={0}>
        <div className={styles.contact_container_support_left}>
          <Support />
          <div className={styles.support_heading}>UC Support</div>
        </div>
        <div className={styles.contact_container_support_right}>
          <RightArrow />
        </div>
      </div>
    </div>
  );
}

export default UcSupport;
