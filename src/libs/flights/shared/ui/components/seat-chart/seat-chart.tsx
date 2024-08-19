import { groupBy } from 'lodash-es';
import { SeatFreeIcon, SeatBookedIcon, SeatPaidIcon, SeatExtraLegroomIcon, SeatSelectedIcon } from '@uc/libs/shared/ui';
import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';
import React, { ForwardedRef, ReactNode, forwardRef, useMemo } from 'react';
import styles from './seat-chart.module.scss';

const seatTypes = [
  { icon: SeatSelectedIcon, label: 'Selected' },
  { icon: SeatBookedIcon, label: 'Booked' },
  { icon: SeatFreeIcon, label: 'Free' },
  { icon: SeatPaidIcon, label: 'Paid' },
  { icon: SeatExtraLegroomIcon, label: 'Extra Legroom' },
];

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#E4F3FD',
    color: '#1D91D8',
    minWidth: 128,
    maxWidth: 220,
    fontSize: '12px',
    fontWeight: '600',
    border: '1px solid #dadde9',
    filter: 'drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.18)) drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.10))',
  },
}));

export const SeatIcon = forwardRef((props: any, ref: ForwardedRef<any>): ReactNode => {
  const { seat } = props;
  if (!seat.isAvailable) {
    return <SeatBookedIcon width={23} style={{ rotate: '-90deg' }} ref={ref} {...props} />;
  }
  if (seat.price === 0) {
    return <SeatFreeIcon width={23} style={{ rotate: '-90deg' }} ref={ref} {...props} />;
  }
  if (seat.price > 0) {
    return <SeatPaidIcon width={23} style={{ rotate: '-90deg' }} ref={ref} {...props} />;
  }
  if (seat.isExtraLegroom) {
    return <SeatExtraLegroomIcon width={23} style={{ rotate: '-90deg' }} ref={ref} {...props} />;
  }
  <SeatBookedIcon width={23} style={{ rotate: '-90deg' }} ref={ref} {...props} />;
});

/* eslint-disable-next-line */
export interface SeatChartProps {
  seats: any;
  selectedSeats: Map<string, any>;
  onSeatSelect: (value: any) => void;
}

export function SeatChart({ seats, selectedSeats, onSeatSelect }: SeatChartProps) {
  const [columnWiseSeats, columns, columnLabels, middleIndex] = useMemo(() => {
    const columnWiseSeats = groupBy(seats, 'column');
    const columns = Object.keys(columnWiseSeats)
      .map(k => Number(k))
      .sort();
    const A = 'A'.charCodeAt(0);
    const alphaLabels = columns.map((c, i) => String.fromCharCode(A + i));
    const middleIndex = Math.floor(columns.length / 2);
    const columnLabels = [].concat(alphaLabels.slice(0, middleIndex), '', alphaLabels.slice(middleIndex));
    return [columnWiseSeats, columns, columnLabels, middleIndex];
  }, [seats]);

  const emitSeatSelection = (seat: any) => {
    if (seat.isAvailable && !selectedSeats.has(seat.seatNumber)) {
      onSeatSelect(seat);
    }
  };
  console.log('seats',seats,'selectedSeats', selectedSeats,'onSeatSelect', onSeatSelect)

  return (
    <div className={styles.container}>
      <div className={styles.scroll_cover}>
        <div className={styles.exit_index}>
          x
          {
            // loop to show exits labels
            columnLabels.map((c, i) => (
              <div key={`${c}_exit`} className={styles.column_lbl}>
                {i === 0 || i === columnLabels.length - 1 ? 'EXIT ' : i === middleIndex ? 'Front' : ''}
              </div>
            ))
          }
        </div>
        xx
        <div className={styles.column_index}>
          {
            // loop to show column labels
            columnLabels.map((c, i) => (
              <div key={`${c}_col`} className={styles.column_lbl}>
                {c}
              </div>
            ))
          }
        </div>
        xxx
        <div className={styles.scroll_box}>
          {
            // loop to render columns
            //it is row of 6 lines
            columns.map((c, i) => (
              <React.Fragment key={c}>
                <div key={c}>
                  y
                  {
                    // loop to render all seats in a column
                    //it is one full column of 30-40 seats
                    columnWiseSeats[String(c)].map(s => (
                      
                      <div key={s.seatId} className={styles.seat} onClick={() => emitSeatSelection(s)}>
                        yy
                        <HtmlTooltip
                          title={
                            <div>
                              {selectedSeats.has(s.seatNumber) ? (
                                <div>{selectedSeats.get(s.seatNumber).toolTip}</div>
                              ) : (
                                <></>
                              )}
                              <div className={styles.info_tt}>
                                <div>{s.seatNumber}</div> <div>₹{s.price}</div>
                              </div>
                            </div>
                          }>
                          {selectedSeats.has(s.seatNumber) ? (
                            <SeatSelectedIcon width={23} style={{ rotate: '-90deg' }} />
                          ) : (
                            <SeatIcon seat={s} />
                          )}
                        </HtmlTooltip>
                      </div>
                    ))
                  }
                </div>
                xxxx

                {
                  // Isle row show row numbers
                  i + 1 === columns.length / 2 && (
                    <div className={styles.num_row}>
                      xxxxx
                      {/* it is column of 30-40 index numbers */}
                      {columnWiseSeats[String(c)].map((s, i) => (
                        <div key={s.seatId} className={styles.row_no}>
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  )
                }
              </React.Fragment>
            ))
          }
        </div>
      </div>
      <div className={styles.seat_types}>
        {seatTypes.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={styles.seat_info}>
              <Icon height={24} />
              <p>{s.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SeatChart;
