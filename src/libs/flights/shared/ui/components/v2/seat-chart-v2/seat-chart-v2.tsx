import { groupBy } from 'lodash-es';
import {
  SeatFreeIcon,
  SeatBookedIcon,
  SeatPaidIcon,
  SeatExtraLegroomIcon,
  SeatSelectedIcon,
  SeatImageIcon,
} from '@uc/libs/shared/ui';
import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';
import React, { ForwardedRef, ReactNode, forwardRef, useEffect, useMemo } from 'react';
import styles from './seat-chart-v2.module.scss';

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

export interface SeatChartProps {
  seats: any;
  selectedSeats: Array<any>;
  onSeatSelect: (value: any) => void;
  onSeatDeSelect: (value: any) => void;
  seatMessage?: string;
}

function SeatChart({ seats, onSeatSelect, onSeatDeSelect, selectedSeats, seatMessage }: SeatChartProps) {
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
    onSeatSelect(seat);
  };
  const emitSeatDeSelection = (e: any, seat: any) => {
    onSeatDeSelect(seat);
    e.stopPropagation();
  };
  return (
    <div className={styles.container}>
      {seats && seats?.length > 0 ? (
        <>
          <div className={styles.scroll_cover}>
            <div className={styles.exit_index}>
              {columnLabels.map((c, i) => (
                <div key={`${c}_exit`} className={styles.column_lbl}>
                  {i === 0 || i === columnLabels.length - 1 ? 'EXIT ' : i === middleIndex ? 'Front' : ''}
                </div>
              ))}
            </div>
            <div className={styles.column_index}>
              {columnLabels.map((c, i) => (
                <div key={`${c}_col`} className={styles.column_lbl}>
                  {c}
                </div>
              ))}
            </div>
            <div className={styles.scroll_box}>
              {columns.map((c, i) => (
                <React.Fragment key={c}>
                  <div key={c} className={styles.column}>
                    {columnWiseSeats[String(c)].map(s => (
                      <div
                        key={s.seatId}
                        className={styles.seat}
                        onClick={() => s.isAvailable === true && emitSeatSelection(s)}>
                        <HtmlTooltip
                          title={<div> </div>}
                          //   title={
                          // <div>
                          //   {selectedSeatMap.has(s.seatNumber) ? (
                          //     <div>{selectedSeatMap.get(s.seatNumber).passengerName}</div>
                          //   ) : null}
                          //   <div className={styles.info_tt}>
                          //     <div>{s.seatNumber}</div> <div>₹{s.price}</div>
                          //   </div>
                          // </div>
                          //   }
                        >
                          {selectedSeats.find(item => item.seatNumber === s.seatNumber) &&
                          s.isAvailable === true ? (
                            <SeatSelectedIcon
                              width={23}
                              style={{ rotate: '-90deg' }}
                              onClick={e => emitSeatDeSelection(e, s)}
                            />
                          ) : (
                            <SeatIcon seat={s} />
                          )}
                        </HtmlTooltip>
                      </div>
                    ))}
                  </div>
                  {i + 1 === columns.length / 2 && (
                    <div className={styles.num_row}>
                      {columnWiseSeats[String(c)].map((s, i) => (
                        <div key={s.seatId} className={styles.row_no}>
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
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
        </>
      ) : (
        seatMessage && (
          <div className={styles.no_seat_container}>
            <SeatImageIcon />
            <div className={styles.no_seat_message}>{seatMessage}</div>
          </div>
        )
      )}
    </div>
  );
}

export default SeatChart;
