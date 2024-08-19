import styles from './added-traveler-card.module.scss';

/* eslint-disable-next-line */
export interface AddedTravelerCardProps {}

export function AddedTravelerCard({ details, removeCallback }) {
  const removeHandler = event => {
    event.stopPropagation();
    removeCallback(details);
  };

  return (
    <div className={styles.addedTraveler}>
      <div className={styles.addedTraveler_content}>
        <p className={styles.addedTraveler_heading}>
          {details?.firstAndMiddleName.split(' ')[0]} {details?.lastname}
        </p>
        <p className={styles.addedTraveler_desc}>Adult-1</p>
      </div>
      <button className={styles.addedTraveler_button} onClick={removeHandler}>
        X
      </button>
    </div>
  );
}

export default AddedTravelerCard;
