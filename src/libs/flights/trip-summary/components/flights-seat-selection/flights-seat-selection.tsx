// import { UcStepperContainer } from '@uc/libs/shared/ui';
import SeatSelected from '@uc/assets/images/seat_selected.svg';
import SeatBooked from '@uc/assets/images/seat_booked.svg';
import SeatFree from '@uc/assets/images/seat_free.svg';
import SeatPaid from '@uc/assets/images/seat_paid.svg';
import SeatExtraLegroom from '@uc/assets/images/seat_extra_legroom.svg';
import SeatSelectionPaid from '@uc/assets/images/seat_selection_paid.svg';
import SeatSelectionBooked from '@uc/assets/images/seat_selection_booked.svg';
import SeatSelectionFree from '@uc/assets/images/seat_selection_free.svg';
import SeatSelectionExtraLegroom from '@uc/assets/images/seat_selection_extra_legroom.svg';
import SeatSelectionSelected from '@uc/assets/images/seat_selection_selected.svg';
import SeatSelectionUserIcon from '@uc/assets/images/seat_selection_user_icon.svg';
import { styled } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import styles from './flights-seat-selection.module.scss';

export interface FlightsSeatSelectionProps {
  travelerDetails: any;
}

interface CustomToolTipProps {
  className?: string;
  children: React.ReactElement;
  title: React.ReactElement;
  placement?:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
    | undefined;
}

export function FlightsSeatSelection({
  travelerDetails,
  seats,
  segments,
  seatClickHandlerCallback,
  travelerDetailsArrayFromLegsAndTravelers,
  toggleSelectedCallback,
  travelerAndSeatsCallback,
}) {
  const seat_types = [
    {
      heading: 'Selected',
      icon: <SeatSelected />,
    },
    {
      heading: 'Booked',
      icon: <SeatBooked />,
    },
    {
      heading: 'Free',
      icon: <SeatFree />,
    },
    {
      heading: 'Paid',
      icon: <SeatPaid />,
    },
    {
      heading: 'Extra Legroom',
      icon: <SeatExtraLegroom />,
    },
  ];

  const absoluteBoxContainer = useRef(null);
  const scrollContainer = useRef(null);
  const aeroplaneContainer = useRef(null);
  const scrollTimer = useRef(null);

  const [seatViewScroll, setSeatViewScroll] = useState(false);
  const handleScroll = () => {
    setSeatViewScroll(true);
    const aeroplaneContainerWidth = aeroplaneContainer?.current?.offsetWidth;

    if (scrollContainer?.current && absoluteBoxContainer?.current) {
      const scrollContainerCurrent = scrollContainer?.current;
      let scrollLeftBox = 100;

      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        setSeatViewScroll(false);
      }, 2000);

      if (scrollContainerCurrent) {
        scrollLeftBox = scrollContainerCurrent.scrollLeft;
      }
      if (((scrollLeftBox + 110) / aeroplaneContainerWidth) * 100 > 67) {
        absoluteBoxContainer.current.style.left = '67%';
      } else {
        absoluteBoxContainer.current.style.left = `${((scrollLeftBox + 110) / aeroplaneContainerWidth) * 100}%`;
      }
    }
  };
  const [seat, setSeat] = useState(seats);

  // const useStyles = makeStyles({
  //   tooltip_container: {},
  //   tooltip: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     padding: '0.2rem 0.2rem',
  //     justifyContent: 'flex-start',
  //     fontSize: '12px',
  //   },
  //   tooltip_none: {
  //     display: 'none',
  //     backgroundColor: 'red',
  //   },
  //   tooltip_row: {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     padding: '0.1rem 0.1rem',
  //     color: '#1D91D8',
  //     fontWeight: 600,
  //   },
  //   tooltip_row_rupees_row: {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     padding: '0.1rem 0.1rem 0rem 0.1rem',
  //     color: '#1D91D8',
  //     fontWeight: 600,
  //   },
  //   rupees: {
  //     paddingLeft: '2rem',
  //   },
  //   tooltip_name: {
  //     color: '#454545',
  //     fontWeight: 400,
  //     marginLeft: '0.2rem',
  //   },
  // });

  // const classes = useStyles();
  const MUIDIV = styled('div')({});

  const classes = {
    tooltip_container: {},
    tooltip: {
      display: 'flex',
      flexDirection: 'column',
      padding: '0.2rem 0.2rem',
      justifyContent: 'flex-start',
      fontSize: '12px',
    },
    tooltip_none: {
      display: 'none',
      backgroundColor: 'red',
    },
    tooltip_row: {
      display: 'flex',
      flexDirection: 'row',
      padding: '0.1rem 0.1rem',
      color: '#1D91D8',
      fontWeight: 600,
    },
    tooltip_row_rupees_row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '0.1rem 0.1rem 0rem 0.1rem',
      color: '#1D91D8',
      fontWeight: 600,
    },
    rupees: {
      paddingLeft: '2rem',
    },
    tooltip_name: {
      color: '#454545',
      fontWeight: 400,
      marginLeft: '0.2rem',
    },
  };

  const CustomTooltip = styled(({ className, children, title, placement, ...props }: CustomToolTipProps) => (
    <Tooltip title={title} {...props} classes={{ popper: className }} placement={placement}>
      {children}
    </Tooltip>
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#E4F3FD',
      borderRadius: '5px',
      minWidth: '10rem',
    },
  }));

  let rows = 0;

  const initialSelectedTraveler = `${travelerDetails?.travelerDetails?.travelers[0].firstAndMiddleName.split(
    ' '
  )[0]} ${travelerDetails?.travelerDetails?.travelers[0].lastname}`;

  const [selectedTraveler, setSelectedTraveler] = useState(initialSelectedTraveler);

  useEffect(() => {
    setTravelerDetailsArray(travelerDetailsArrayFromLegsAndTravelers);
    travelerAndSeatsCallback(travelerDetailsArrayFromLegsAndTravelers);
  }, [travelerDetailsArrayFromLegsAndTravelers]);

  const [travelerDetailsArray, setTravelerDetailsArray] = useState([]);

  const seatClickHandler = data => {
    const index = travelerDetails?.travelerDetails?.travelers?.indexOf(
      travelerDetails?.travelerDetails?.travelers?.filter(
        (data, index) => `${data.firstAndMiddleName.split(' ')[0]} ${data.lastname}` === selectedTraveler
      )[0]
    );

    if (index >= 0) {
      legWiseTravelerSeatNumberArray[toggleSelected][selectedTraveler] = data.seatNumber;

      if (index === travelerDetails?.travelerDetails?.travelers.length - 1 && toggleSelected < segments.length - 1) {
        setToggleSelected(toggleSelected + 1);
        setSelectedTraveler(
          `${travelerDetails?.travelerDetails?.travelers[0]?.firstAndMiddleName?.split(' ')[0]} ${travelerDetails
            ?.travelerDetails?.travelers[0]?.lastname}`
        );
      } else if (index < travelerDetails?.travelerDetails?.travelers.length - 1) {
        setSelectedTraveler(
          `${travelerDetails?.travelerDetails?.travelers[index + 1]?.firstAndMiddleName?.split(
            ' '
          )[0]} ${travelerDetails?.travelerDetails?.travelers[index + 1]?.lastname}`
        );
      } else {
        setSelectedTraveler(
          `${travelerDetails?.travelerDetails?.travelers[index]?.firstAndMiddleName?.split(' ')[0]} ${travelerDetails
            ?.travelerDetails?.travelers[index]?.lastname}`
        );
      }
    } else {
      setSelectedTraveler(
        `${travelerDetails?.travelerDetails?.travelers[
          travelerDetails?.travelerDetails?.travelers.length - 1
        ]?.firstAndMiddleName?.split(' ')[0]} ${travelerDetails?.travelerDetails?.travelers[
          travelerDetails?.travelerDetails?.travelers.length - 1
        ]?.lastname}`
      );
    }
    let selectedTravelerFromObjNewTempNew = [];

    for (let i = 0; i < legWiseTravelerSeatNumberArray.length; i++) {
      for (const key in legWiseTravelerSeatNumberArray[i]) {
        selectedTravelerFromObjNewTempNew = [
          ...selectedTravelerFromObjNewTempNew,
          {
            segment: i,
            origin: segments[i]?.origin,
            destination: segments[i]?.destination,
            travelerName: key,
            travelerSeatNumber: legWiseTravelerSeatNumberArray[i][key],
            travelerSeatPrice: seat?.filter(data => data.seatNumber === legWiseTravelerSeatNumberArray[i][key])[0]
              ?.price,
          },
        ];
      }
    }

    setTravelerDetailsArray(selectedTravelerFromObjNewTempNew);
    seatClickHandlerCallback(data);
  };

  const [legWiseTravelerSeatNumberArray, setLegWiseTravelerSeatNumberArray] = useState([]);

  const legWiseTravelerSeatNumberArrayHandler = () => {
    for (let j = 0; j < segments.length; j++) {
      let objNew = {};
      for (let i = 0; i < travelerDetails?.travelerDetails?.travelers.length; i++) {
        objNew = {
          ...objNew,
          [`${travelerDetails?.travelerDetails?.travelers[i].firstAndMiddleName.split(' ')[0]} ${travelerDetails
            ?.travelerDetails?.travelers[i].lastname}`]: '',
        };
      }
      setLegWiseTravelerSeatNumberArray(legWiseTravelerSeatNumberArray => [...legWiseTravelerSeatNumberArray, objNew]);
    }
  };

  useEffect(() => {
    legWiseTravelerSeatNumberArrayHandler();
  }, [segments]);

  const [toggleSelected, setToggleSelected] = useState(0);

  const [mainToggleSelected, setMainToggleSelected] = useState(0);

  useEffect(() => {
    setSeat(segments[toggleSelectedCallback]?.seatMap?.seats);

    setMainToggleSelected(toggleSelectedCallback);
  }, [toggleSelectedCallback]);

  useEffect(() => {
    setSeat(segments[toggleSelected]?.seatMap?.seats);

    setMainToggleSelected(toggleSelected);
  }, [toggleSelected]);

  const seatMap = () => {};

  const seatTopViewGridStyles = {
    gridTemplateColumns: `repeat(${Math.max(...(seat?.map((data: any, index: number) => data.row) ?? []))}, 1fr)`,
    gridTemplateRows: `repeat(${Math.max(...(seat?.map((data: any, index: number) => data.column) ?? []))}, 1fr)`,
  };

  const seatScrollViewGridStyles = {
    gridTemplateColumns:
      seat && seat.length > 0
        ? `repeat(${Math.max(...(seat?.map((data: any, index: number) => data.row) ?? []))}, 1fr)`
        : '1fr',
    gridTemplateRows:
      seat && seat.length > 0
        ? `repeat(${Math.max(...(seat?.map((data: any, index: number) => data.column) ?? []))}, 1fr)`
        : '1fr',
  };

  return (
    <div className={styles.seat_selection}>
      <div className={styles.seat_selection_col_container}>
        {seatViewScroll && (
          <div
            style={seatTopViewGridStyles}
            ref={aeroplaneContainer}
            className={styles.seat_selection_aeroplane_background}>
            {seat?.map((data: any, index: number) => (
              <div className={styles.seat} key={index}>
                <div
                  className={index % 3 === 0 ? styles.seat_selection_box_right_padding : styles.seat_selection_box}
                />
              </div>
            ))}
            <div className={styles.seat_selection_red} ref={absoluteBoxContainer} />
          </div>
        )}
        <div
          className={styles.seat_selection_container}
          style={seatScrollViewGridStyles}
          ref={scrollContainer}
          onScroll={handleScroll}>
          {seat?.map((data: any, index: number) => (
            <div className={styles.seat} key={index}>
              {index >=
                Math.max(...seat.map((data: any, index: number) => data.row)) *
                  (Math.floor(Math.max(...seat.map((data: any, index: number) => data.column)) / 2) - 1) &&
              index <
                Math.max(...seat.map((data: any, index: number) => data.row)) *
                  Math.floor(Math.max(...seat.map((data: any, index: number) => data.column)) / 2) ? (
                <div className={styles.seat_row_middle}>
                  <CustomTooltip
                    sx={classes.tooltip_container}
                    title={
                      <MUIDIV sx={classes.tooltip}>
                        <MUIDIV sx={classes.tooltip_row}>
                          <SeatSelectionUserIcon />
                          <MUIDIV sx={classes.tooltip_name}>{selectedTraveler}</MUIDIV>
                        </MUIDIV>
                        <MUIDIV sx={classes.tooltip_row_rupees_row}>
                          <div>{data.seatNumber} (Middle)</div>
                          <MUIDIV sx={classes.tooltip_row_rupees_row}>
                            {data.price === 0 ? '-' : `₹${data.price}`}
                          </MUIDIV>
                        </MUIDIV>
                      </MUIDIV>
                    }
                    placement="right">
                    {travelerDetailsArray?.filter(
                      seatNumberVal =>
                        seatNumberVal?.travelerSeatNumber === data.seatNumber &&
                        seatNumberVal?.segment === mainToggleSelected
                    ).length === 1 ? (
                      <div className={styles.seatAvailable_box_middle}>
                        <SeatSelectionSelected width={40} height={40} />
                        <div className={styles.seatAvailable_middle}>{data.seatNumber}</div>
                      </div>
                    ) : data.isAvailable === true && data.isExtraLegroom === true ? (
                      <SeatSelectionExtraLegroom
                        className={styles.seat_image}
                        width={40}
                        height={40}
                        onClick={() => seatClickHandler(data)}
                      />
                    ) : data.isAvailable === true && data.price === 0 ? (
                      <SeatSelectionFree
                        className={styles.seat_image}
                        width={40}
                        height={40}
                        onClick={() => seatClickHandler(data)}
                      />
                    ) : data.isAvailable === false ? (
                      <SeatSelectionBooked className={styles.seat_image_booked} width={40} height={40} />
                    ) : (
                      <SeatSelectionPaid
                        className={styles.seat_image}
                        width={40}
                        height={40}
                        onClick={() => seatClickHandler(data)}
                      />
                    )}
                  </CustomTooltip>
                  <div className={styles.seat_col}>{(rows += 1)}</div>
                </div>
              ) : (
                <div>
                  <CustomTooltip
                    sx={classes.tooltip_container}
                    title={
                      <MUIDIV sx={classes.tooltip}>
                        <MUIDIV sx={classes.tooltip_row}>
                          <SeatSelectionUserIcon />
                          <MUIDIV sx={classes.tooltip_name}>{selectedTraveler}</MUIDIV>
                        </MUIDIV>
                        <MUIDIV sx={classes.tooltip_row_rupees_row}>
                          <div>{data.seatNumber} (Middle)</div>
                          <MUIDIV sx={classes.tooltip_row_rupees_row}>
                            {data.price === 0 ? '-' : `₹${data.price}`}
                          </MUIDIV>
                        </MUIDIV>
                      </MUIDIV>
                    }
                    placement="right">
                    {travelerDetailsArray?.filter(
                      seatNumberVal =>
                        seatNumberVal?.travelerSeatNumber === data.seatNumber &&
                        seatNumberVal?.segment === mainToggleSelected
                    ).length === 1 ? (
                      <div className={styles.seatAvailable_box}>
                        <SeatSelectionSelected width={40} height={40} />
                        <div className={styles.seatAvailable}>{data.seatNumber}</div>
                      </div>
                    ) : data.isAvailable === true && data.isExtraLegroom === true ? (
                      <SeatSelectionExtraLegroom
                        className={styles.seat_image}
                        width={40}
                        height={40}
                        onClick={() => seatClickHandler(data)}
                      />
                    ) : data.isAvailable === true && data.price === 0 ? (
                      <SeatSelectionFree
                        className={styles.seat_image}
                        width={40}
                        height={40}
                        onClick={() => seatClickHandler(data)}
                      />
                    ) : data.isAvailable === false ? (
                      <SeatSelectionBooked className={styles.seat_image_booked} width={40} height={40} />
                    ) : (
                      <SeatSelectionPaid
                        className={styles.seat_image}
                        width={40}
                        height={40}
                        onClick={() => seatClickHandler(data)}
                      />
                    )}
                  </CustomTooltip>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.seat_types_row}>
        {seat_types.map((data, index: number) => (
          <div className={styles.seat_types} key={index}>
            <div>{data.icon}</div>
            <div className={styles.seat_types_heading}>{data.heading}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FlightsSeatSelection;
