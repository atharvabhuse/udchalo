import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './thankyou-popup-content.module.scss';

/* eslint-disable-next-line */
export interface ThankyouPopupContentProps {
  popupDetails: {
    icon: ReactNode;
    heading: string;
    desc: string;
    btnLink1: string;
    btnLink2: string;
    note: boolean;
    dimentions: {
      width: string;
      height: string;
    };
    closeButtonFixedPosition: {
      top: string;
      right: string;
    };
  };
  closeClickCallback: () => void;
}

export function ThankyouPopupContent(props: ThankyouPopupContentProps) {
  const { popupDetails, closeClickCallback } = props;

  const closeHandler = () => {
    closeClickCallback();
  };

  const [error, setError] = useState(false);

  const router = useRouter();
  const submitHandler = () => {
    if (popupDetails?.note) {
      setError(true);
    } else {
      router.push('https://play.google.com/store/apps/details?id=app.udChalo.flights&hl=en&gl=US&pli=1');
    }
  };

  return (
    <div className={styles.popupContent}>
      {popupDetails?.icon}
      <div className={styles.popupHeading}>{popupDetails?.heading}</div>
      <div className={styles.popupDesc}>{popupDetails?.desc}</div>
      {popupDetails?.note ? (
        <>
          <textarea className={styles.textarea} rows={5} placeholder="Add Note (Optional)" />
          {error && <div className={styles.note}>Currently there is No API available to POST above feedback</div>}
        </>
      ) : (
        ''
      )}
      <div className={styles.btnRow}>
        <button type='button' className={styles.btnLink1} onClick={closeHandler}>
          {popupDetails?.btnLink1}
        </button>
        <button type='button' className={styles.btnLink2} onClick={submitHandler}>
          {popupDetails?.btnLink2}
        </button>
      </div>
    </div>
  );
}

export default ThankyouPopupContent;
