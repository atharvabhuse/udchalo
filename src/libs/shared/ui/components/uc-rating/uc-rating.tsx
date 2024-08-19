import { Rating } from '@mui/material';
import RatingBanner from '@uc/assets/images/rating_banner.svg';
import { SyntheticEvent, useState } from 'react';
import { ucRatingHeading } from '@uc/libs/flights/shared/ui/components/confirmation/confirmation.constant';
import styles from './uc-rating.module.scss';

/* eslint-disable-next-line */
export interface UcRatingProps {
  ratingClickCallback: (val: number) => void;
}

function UcRating({ ratingClickCallback }: UcRatingProps) {
  const [rating, setRating] = useState<number>(0);

  const ratingClickHandler = (event: SyntheticEvent, newVal: number | null) => {
    if (newVal) {
      ratingClickCallback(newVal);
      setRating(newVal);
    }
  };

  return (
    <div className={styles.booking_experience}>
      <div className={styles.booking_experience_left}>
        <div className={styles.booking_experience_text}>{ucRatingHeading}
        </div>
        <div className={styles.booking_experience_rating}>
          <Rating name="simple-controlled" value={rating} size="large" onChange={ratingClickHandler} />
        </div>
      </div>
      <div className={styles.booking_experience_image}>
        <RatingBanner />
      </div>
    </div>
  );
}

export default UcRating;
