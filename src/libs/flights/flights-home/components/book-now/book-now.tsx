import BalmerBookingIcon from '@uc/assets/images/balmer_lawrie_icon.svg';
import GroupBookingIcon from '@uc/assets/images/group_booking_icon.svg';
import InternationlBookingIcon from '@uc/assets/images/international_flights_icon.svg';
import styles from './book-now.module.scss';

function BookNow() {
  return (
    <div className={styles.book_now_container}>
      <div className={styles.book_now_wrapper}>
        <div className={styles.balmer}>
          <div className={styles.icon}>
            <BalmerBookingIcon />
          </div>
          <div className={styles.text_section}>
            <div className={styles.title}>Balmer Lawrie</div>
            <div className={styles.sub_title}>Tickets are now available</div>
          </div>
          <div className={styles.book_now_text}>
            <span>Book now</span>
          </div>
        </div>
        <div className={styles.group_booking}>
          <div className={styles.icon}>
            <GroupBookingIcon />
          </div>
          <div className={styles.text_section}>
            <div className={styles.title}>Group booking</div>
            <div className={styles.sub_title}>Book more than 9 tickets</div>
          </div>
          <div className={styles.book_now_text}>
            <span>Book now</span>
          </div>
        </div>
        <div className={styles.international_booking}>
          <div className={styles.icon}>
            <InternationlBookingIcon />
          </div>
          <div className={styles.text_section}>
            <div className={styles.title}>International Flights</div>
            <div className={styles.sub_title}>Tickets are now available</div>
          </div>
          <div className={styles.book_now_text}>
            <span>Book now</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookNow;
