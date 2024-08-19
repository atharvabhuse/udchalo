import ExtrasCard from '../extras-card/extras-card';
import styles from './extras.module.scss';

/* eslint-disable-next-line */
export interface ExtrasProps {
  clickable: any;
  openPopupCallback: (details: any) => void;
}

export function Extras({ clickable, openPopupCallback }: ExtrasProps) {
  const extrasCard = [
    {
      heading: 'Seat',
      desc: 'Book seat of your choice before boarding',
    },
    {
      heading: 'Meal',
      desc: 'Pre-select your meal at the best rates',
    },
    {
      heading: 'Excess Baggage',
      desc: 'Book your additional baggage at minimal cost',
    },
  ];

  const openPopupCallbackHandler = (details: any) => {
    openPopupCallback(details);
  };
  return (
    <div
      style={{
        backgroundColor: !clickable ? 'white' : '',
        opacity: !clickable ? 0.4 : 1,
        pointerEvents: !clickable ? 'none' : undefined,
      }}
      className={styles.extras}>
      <div className={styles.extras_heading_row}>
        <div className={styles.extras_index}>3</div>
        <div className={styles.extras_heading}>Extras</div>
      </div>
      <div className={styles.extras_card_container}>
        {extrasCard.map((data, index: number) => (
          <ExtrasCard details={data} key={index} openPopupCallback={openPopupCallbackHandler} />
        ))}
      </div>
    </div>
  );
}

export default Extras;
