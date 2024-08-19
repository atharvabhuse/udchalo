'use client';

import { SwipeableDrawer, Accordion, AccordionDetails, AccordionSummary, Dialog } from '@mui/material';
import { FlightLegDetails } from '@uc/libs/flights/shared/ui';
import { formatDateToTime, formatToHoursAndMins, formatToINR } from '@uc/utils';
import Image from 'next/image';
import React, { SyntheticEvent, useState } from 'react';
import { ArrowLeftIcon } from '@mui/x-date-pickers';
import { DefenceBadgeMSite, NonStop, OneStop, TataProductBadge } from '@uc/assets/images';
import FlightFareSummary from '../flight-fare-table/flight-fare-table';
import styles from './flight-summary.module.scss';
import CheapestRegularFare from '../cheapest-regular-fare/cheapest-regular-fare';

export interface FlightSummaryProps {
  flightDetails: any;
  shouldExpand: boolean;
  isCheapest: boolean;
  isFastest: boolean;
  isReturnFlight?: boolean;
  tripMode?: string;
  bookFlight: (flightId: string) => void;
  isDefence: boolean;
  isCheapestRegularFare: boolean;
  onAccordionClick:(flightIs: string) =>void;
  isExpanded:boolean;
}

export function FlightSummary({
  flightDetails,
  shouldExpand,
  isCheapest,
  isFastest,
  isReturnFlight,
  bookFlight,
  tripMode,
  isDefence,
  isCheapestRegularFare,
  onAccordionClick,
  isExpanded
}: FlightSummaryProps) {
  const logoDimention = window.innerWidth < 600 ? 25 : 40;
  const {
    departDate,
    arriveDate,
    departOffset,
    arriveOffset,
    airline,
    duration,
    origin,
    destination,
    stops,
    isLCC,
    mode,
    brandedFlights,
    vouchers,
  } = flightDetails;

  const departDateStr = formatDateToTime(departDate);
  const arrivalDateStr = formatDateToTime(arriveDate);
  const durationStr = formatToHoursAndMins(duration);
  const firstLeg = brandedFlights[0];
  const { aircraft, seatAvailable, airlineName, flightNumber } = firstLeg.segments[0];
  const {
    fare: { totalFare, baseTotalFare, totalFee, totalTax, totalConvenienceFee },
    strikeOffFare,
    oldBookingFare,
    rescheduleFee,
  } = firstLeg;
  const rescheduleFare =
    baseTotalFare + totalFee + totalTax + rescheduleFee + totalConvenienceFee - oldBookingFare > 0
      ? formatToINR(baseTotalFare + totalFee + totalTax + rescheduleFee + totalConvenienceFee - oldBookingFare)
      : formatToINR(0);
  const currentFare = totalFare ? formatToINR(totalFare) : '';
  const strikedFare = strikeOffFare ? formatToINR(strikeOffFare) : '';
  const offer = vouchers && vouchers[0]?.discountAmount;
  const fareOptionsArray: any[] = [];

  brandedFlights.forEach((element: any) => {
    const {
      brandName,
      benefits,
      fare: { totalFare },
      flightId,
    } = element;
    const benefitsArray = [...benefits];
    const formattedPrice = formatToINR(totalFare);
    benefitsArray.unshift({ flightId, brandName, totalFare: formattedPrice });
    fareOptionsArray.push(benefitsArray);
  });

  const [showSummaryDetails, setShowSummaryDetails] = useState<boolean>(isExpanded);
  const [showSummaryDialog, setShowSummaryDialog] = useState<boolean>(false);

  const showFlightFareSummaryModal = () => setShowSummaryDialog(true);
  const handleSummaryDialogClose = () => setShowSummaryDialog(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeHandler = () => {
    setDrawerOpen(false);
  };

  const openHandler = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isDesktop = window.innerWidth > 600;
  const flightMode = isReturnFlight ? 'Return' : 'Onward';

  const handleAccordionClick = ()=>{
    onAccordionClick(flightDetails?.brandedFlights[0]?.flightId);
    setShowSummaryDetails(!isExpanded);
  }
  const accProps = shouldExpand
    ? { expanded:isExpanded , onChange: handleAccordionClick }
    : { expanded: false, onClick: showFlightFareSummaryModal };

  const airlineNameVar = flightDetails?.brandedFlights[0]?.segments[0].airlineName;
  let isTataProduct;

  if (airlineNameVar === 'Air India' || airlineNameVar === 'Vistara' || airlineNameVar === 'Air India Express') {
    isTataProduct = true;
  } else {
    isTataProduct = false;
  }

  const SwipeableDrawerPaperProps = {
    paddingTop: '2rem',
    paddingBottom: '3rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    borderTopLeftRadius: '2rem',
    borderTopRightRadius: '2rem',
  };

  const stopsHandler = (stops:number) => {
    if (stops === 0) {
      return 'Non-Stop';
    }
    if (stops === 1) {
      return `${stops} Stop`;
    }
    return `${stops} Stops`;
  };

  const priceSectionTagHandler = () => {
    if (tripMode === 'reschedule' && rescheduleFare === formatToINR(0)) {
      return '';
    }
    if (isCheapest) {
      return 'Cheapest';
    }
    return '';
  };

  const addtionalText = flightDetails?.vouchers[0]?.voucherContent?.headerText
  return (
    <>
      {isDefence && isDesktop && (
        <div className={styles.defence_row}>
          <span
            className={
              drawerOpen === false ? styles.defence_tag_when_accordion_close : styles.defence_tag_when_accordion_open
            }>
            Defence
          </span>
        </div>
      )}
      {isCheapestRegularFare ? (
        <CheapestRegularFare>
          <Accordion elevation={0} className={styles.accordion_root} onChange={handleAccordionClick} {...accProps}>
            <AccordionSummary onClick={openHandler}>
              {showSummaryDetails && isExpanded && isDesktop ? (
                <FlightLegDetails legDetails={firstLeg} departDate={departDate} arriveDate={arriveDate} stops={stopsHandler(stops)}/>
              ) : (
                <div className={styles.flight_summary_accordion}>
                  <div className={styles.single_flight_data}>
                    <div className={styles.flight_name_section}>
                      <div className={styles.flight_icon_row}>
                        {!isDesktop && isDefence && (
                          <span className={styles.defence_badge_box}>
                            <DefenceBadgeMSite />
                          </span>
                        )}
                        <Image
                          src={`https://static.udchalo.com/client_assets/img/airline_logo/${airline}.png`}
                          width={logoDimention}
                          height={logoDimention}
                          alt="airline logo"
                        />
                        <div className={styles.flight_name_row}>
                          <div className={styles.flight_name}>{airlineName}</div>
                          <div className={styles.flight_desc}>
                            {airline} -{flightNumber}
                          </div>
                        </div>
                      </div>
                      {seatAvailable > 0 && seatAvailable <= 2 && (
                        <div className={styles.seats_left}>{seatAvailable} Seats left</div>
                      )}
                    </div>

                    <div className={styles.flight_timing_section}>
                      <div className={styles.flight_timing}>{departDateStr}</div>
                      <div className={styles.flight_duration_section}>
                        <div className={styles.flight_duration}>{durationStr}</div>
                        {stops === 0 ? <NonStop className={styles.line} /> : <OneStop className={styles.line} />}
                        <div className={styles.flight_duration}>{stopsHandler(stops)}</div>
                      </div>
                      <div className={styles.flight_timing}>{arrivalDateStr}</div>
                    </div>

                    <div className={styles.flight_price_section}>
                      <div className={styles.keyword}>{priceSectionTagHandler()}</div>
                      <div className={styles.keyword_fastest}>{isFastest ? 'Fastest' : ''}</div>
                      {isTataProduct && (
                        <div className={styles.tata_product}>
                          <TataProductBadge />
                        </div>
                      )}
                      <div className={styles.current_price}>
                        {tripMode && tripMode === 'reschedule' ? rescheduleFare : currentFare}
                      </div>
                      <div className={styles.previous_price}>{strikedFare}</div>
                    </div>
                  </div>
                </div>
              )}
            </AccordionSummary>
            {isDesktop ? (
              <AccordionDetails>
                <div className={styles.flight_details}>
                  <FlightFareSummary fareOptions={fareOptionsArray} onFlightSelect={bookFlight} />
                </div>
              </AccordionDetails>
            ) : (
              <SwipeableDrawer
                anchor="bottom"
                open={drawerOpen}
                onClose={closeHandler}
                onOpen={openHandler}
                PaperProps={{
                  style: SwipeableDrawerPaperProps,
                }}>
                <div className={styles.flight_details}>
                  <FlightLegDetails legDetails={firstLeg} departDate={departDate} arriveDate={arriveDate} stops={stopsHandler(stops)}/>
                  <FlightFareSummary fareOptions={fareOptionsArray} onFlightSelect={bookFlight} />
                </div>
              </SwipeableDrawer>
            )}
          </Accordion>
        </CheapestRegularFare>
      ) : (
        <Accordion elevation={0} className={styles.accordion_root} onChange={handleAccordionClick} {...accProps}>
          <AccordionSummary onClick={openHandler}>
            {showSummaryDetails && isExpanded && isDesktop ? (
              <FlightLegDetails legDetails={firstLeg} departDate={departDate} arriveDate={arriveDate} stops={stopsHandler(stops)}/>
            ) : (
              <div className={styles.flight_summary_accordion}>
                <div className={styles.single_flight_data}>
                  <div className={styles.flight_name_section}>
                    <div className={styles.flight_icon_row}>
                      {!isDesktop && isDefence && (
                        <span className={styles.defence_badge_box}>
                          <DefenceBadgeMSite />
                        </span>
                      )}
                      <Image
                        src={`https://static.udchalo.com/client_assets/img/airline_logo/${airline}.png`}
                        width={logoDimention}
                        height={logoDimention}
                        alt="airline logo"
                      />
                      <div className={styles.flight_name_row}>
                        <div className={styles.flight_name}>{airlineName}</div>
                        <div className={styles.flight_desc}>
                          {airline} -{flightNumber}
                        </div>
                      </div>
                    </div>
                    {seatAvailable > 0 && seatAvailable <= 2 && (
                      <div className={styles.seats_left}>{seatAvailable} Seats left</div>
                    )}
                  </div>

                  <div className={styles.flight_timing_section}>
                    <div className={styles.flight_timing}>{departDateStr}</div>
                    <div className={styles.flight_duration_section}>
                      <div className={styles.flight_duration}>{durationStr}</div>
                      {stops === 0 ? <NonStop className={styles.line} /> : <OneStop className={styles.line} />}
                      <div className={styles.flight_duration}>{stopsHandler(stops)}</div>
                    </div>
                    <div className={styles.flight_timing}>{arrivalDateStr}</div>
                  </div>

                  <div className={styles.flight_price_section}>
                    <div className={styles.keyword}>{priceSectionTagHandler()}</div>
                    <div className={styles.keyword_fastest}>{isFastest ? 'Fastest' : ''}</div>
                    {isTataProduct && (
                      <div className={styles.tata_product}>
                        <TataProductBadge />
                      </div>
                    )}

                    <div className={styles.current_price}>
                      {tripMode && tripMode === 'reschedule' ? rescheduleFare : currentFare}
                    </div>
                    <div className={styles.previous_price}>{strikedFare}</div>
                    <div className={styles.addtional_off}>{addtionalText}</div>
                  </div>
                </div>
              </div>
            )}
          </AccordionSummary>
          {isDesktop ? (
            <AccordionDetails>
              <div className={styles.flight_details}>
                <FlightFareSummary fareOptions={fareOptionsArray} onFlightSelect={bookFlight} />
              </div>
            </AccordionDetails>
          ) : (
            <SwipeableDrawer
              anchor="bottom"
              open={drawerOpen}
              onClose={closeHandler}
              onOpen={openHandler}
              PaperProps={{
                style: SwipeableDrawerPaperProps,
              }}>
              <div className={styles.flight_details}>
                <FlightLegDetails legDetails={firstLeg} departDate={departDate} arriveDate={arriveDate} stops={stopsHandler(stops)}/>
                <FlightFareSummary fareOptions={fareOptionsArray} onFlightSelect={bookFlight} />
              </div>
            </SwipeableDrawer>
          )}
        </Accordion>
      )}
      <Dialog onClose={handleSummaryDialogClose} open={showSummaryDialog} maxWidth="lg">
        <div className={styles.summary_modal}>
          <div className={styles.modal_header}>
            <div className={styles.menu}>
              <ArrowLeftIcon />
              <div>
                Select more options for
                {flightMode} flight
              </div>
            </div>
            <div />
          </div>
          <FlightFareSummary fareOptions={fareOptionsArray} onFlightSelect={bookFlight} />
        </div>
      </Dialog>
    </>
  );
}

export default FlightSummary;
