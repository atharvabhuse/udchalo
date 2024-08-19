import { DogIcon, UcButton } from '@uc/libs/shared/ui';
import styles from './no-bookings-found.module.scss';

interface NoBookingsFoundProps {
  message: string;
  buttonText?: string;
  onClickHandler?: () => void;
}

function NoBookingsFound(props: NoBookingsFoundProps) {
  const { message, onClickHandler, buttonText } = props;
  return (
    <div className={styles.container}>
      <div className={styles.message}>{message}</div>
      <div className={styles.image_container}>
        <DogIcon />
      </div>
      {buttonText && onClickHandler && (
        <UcButton variant="contained" className={styles.button} onClick={onClickHandler}>
          {buttonText}
        </UcButton>
      )}
    </div>
  );
}

export default NoBookingsFound;
