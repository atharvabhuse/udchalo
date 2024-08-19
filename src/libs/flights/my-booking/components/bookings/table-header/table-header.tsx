import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { bookingConst } from '../bookings.constant';
import styles from './table-header.module.scss';
import { SortOrder } from '../my-bookings.reducer';

export interface TableHeaderProps {
  sortHandler: () => void;
  dateAndTimeState: SortOrder;
}

function TableHeader(props: TableHeaderProps) {
  const { sortHandler, dateAndTimeState } = props;
  return (
    <div className={styles.table_header}>
      <span className={styles.heading}>{bookingConst.travellers}</span>
      <span className={`${styles.heading} ${styles.booking}`}>{bookingConst.bookings}</span>
      <span className={`${styles.heading} ${styles.pnr}`}>{bookingConst.pnr}</span>
      <span className={styles.heading}>
        {bookingConst.travelDateAndTime}
        {dateAndTimeState === 'DESC' ? (
          <ExpandMoreIcon className={styles.icon} onClick={sortHandler} />
        ) : (
          <ExpandLessIcon className={styles.icon} onClick={sortHandler} />
        )}
      </span>
      <span className={styles.heading}>{bookingConst.quickActions}</span>
    </div>
  );
}
export default TableHeader;
