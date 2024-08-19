'use client';

import { ChangeEvent, useState } from 'react';
import { Radio } from '@mui/material';
import { UcButton } from '@uc/libs/shared/ui';
import styles from './flight-fare-table.module.scss';

const rowsArray = ['', 'Cabbin Baggage', 'Checkin Baggage', 'Meal', 'Seat', 'Cancellation', 'Change Flight'];

export interface FlightFareTableProps {
  fareOptions: Array<any>;
  onFlightSelect: (flightId: string) => void;
}

export function FlightFareTable({ fareOptions, onFlightSelect }: FlightFareTableProps) {
  const [flightId, setFlightId] = useState<string>(fareOptions[0][0].flightId);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateFlightSelection = (event: ChangeEvent<HTMLInputElement>, fareOptionIndex: number) => {
    const flightId = event.target.value;
    setSelectedIndex(fareOptionIndex);
    setFlightId(flightId);
  };

  const emitFlightSelection = () => onFlightSelect(flightId);
  const radioButtonSelectedStyle = (j: number) => ({
    backgroundColor: j === selectedIndex ? '#e4f3fd' : 'white',
  });

  return (
    <div className={styles.container}>
      <table className={styles.fare_table}>
        <tbody>
          {rowsArray.map((rowName, i) => (
            <tr key={rowName}>
              <td className={styles.t_cell}>{rowName}</td>
              {i === 0
                ? fareOptions.map((fo, j) => (
                    <td className={styles.t_cell_header} key={`${i}_${j}`}>
                      <div className={styles.tag}>{fo[i].brandName}</div>
                      <div className={styles.fare_info}>
                        <div className={styles.fare}>{fo[i].totalFare}</div>
                        <div className={styles.radio_ctrl}>
                          <Radio
                            value={fo[i].flightId}
                            onChange={e => updateFlightSelection(e, j)}
                            checked={fo[i].flightId === flightId}
                          />
                        </div>
                      </div>
                    </td>
                  ))
                : fareOptions.map((fo, j) => (
                    <td
                      className={i === rowsArray.length - 1 ? styles.t_cell_footer : styles.t_cell}
                      style={radioButtonSelectedStyle(j)}
                      key={`${i}_${j}`}>
                      {fo[i]?.value}
                    </td>
                  ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.cta_row}>
        <UcButton className={styles.book_btn} variant="contained" color="primary" onClick={emitFlightSelection}>
          Select Fare
        </UcButton>
      </div>
    </div>
  );
}

export default FlightFareTable;
