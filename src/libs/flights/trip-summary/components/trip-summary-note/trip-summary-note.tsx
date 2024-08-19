import NoteIcon from '@uc/assets/images/note_icon.svg';
import styles from './trip-summary-note.module.scss';

/* eslint-disable-next-line */
export interface TripSummaryNoteProps {}

function TripSummaryNote(props: TripSummaryNoteProps) {
  return (
    <div className={styles.trip_summary_note}>
      <div className={styles.note_icon}>
        <NoteIcon />
      </div>
      <div className={styles.text_section}>
        <span>Note :</span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's.
      </div>
    </div>
  );
}

export default TripSummaryNote;
