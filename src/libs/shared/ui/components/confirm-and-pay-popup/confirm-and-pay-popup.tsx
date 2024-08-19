import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import {
  CloseBlueIcon,
  UcCard,
  BaggageDetails,
  BookedContactDetails,
  BannerWithicon,
  BookedTravellerDetails,
  UcFareBreakup,
  CongratsBannerWithIcon,
  UmbrellaIcon,
  IciciLogo,
  GrayLeftArrow,
  ShareIcon,
  ProceedToPay,
  SavedMoney,
  TravellerDetailsWithoutAccordian,
} from '@uc/libs/shared/ui';
import { FlightLegDetails } from '@uc/libs/flights/shared/ui';
import { bookingData, flightDetails, search } from '@uc/utils/confirm-and-pay-popupdata';
import { useGetBookingDetails } from '@uc/services/network';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './confirm-and-pay-popup.module.scss';

/* eslint-disable-next-line */
export interface ConfirmAndPayPopupProps {
  openCallback: (arg: boolean) => void;
  flightDetails: any;
  state: any;
  proceed: () => void;
}

export function ConfirmAndPayPopup({ openCallback, flightDetails, state, proceed }: ConfirmAndPayPopupProps) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(true);
    openCallback(true);
  };
  const handleClose = () => {
    setOpen(false);
    openCallback(false);
  };

  const review = {
    baseFare: flightDetails[0]?.fare?.baseTotalFare,
    taxesAndFees: flightDetails[0]?.fare?.totalFee + flightDetails[0]?.fare?.totalTax,
    conveienceFees: flightDetails[0]?.fare?.totalConvenienceFee,
  } as any;
  const discount = {
    name: state?.coupon?.code,
    price: state?.coupon?.discountAmount,
  };
  const [totalFare, setTotalFare] = useState();
  const fareHandler = (data: any) => {
    setTotalFare(data);
  };

  const titleSubtitleForCard = {
    title: 'Congratulations!',
    subTitle: 'Your trip is now insured',
  };

  /* *****Proceed to pay start ***** */
  const airline = flightDetails ? flightDetails[0]?.leg?.airline : '6E';

  /* *****Proceed to pay start****** */

  const styleObj = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      md: '60%',
      lg: '60%',
      xl: '60%',
      sm: '100%',
      xs: '100%',
    },
    borderRadius: '1rem',
    boxShadow: 24,
    height: '85%',
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const onward = searchParams.get('onward');
  const { data } = useGetBookingDetails({
    bookingId: id,
    flightId: onward,
  });

  const [passengerDetails, setpassengerDetails] = useState([]);
  const flightId = state.onwardFlightId;

  useEffect(() => {
    state.passengers.forEach((element: any, index: number) => {
      const seatNumber = element?.ancillaries[flightId]?.seats?.get(index)?.seatNumber || '';
      const meal = element?.ancillaries[flightId]?.meals?.get(index)?.value;
      const excessBaggage = `${element?.ancillaries[flightId]?.baggage?.text?.match(/\d+/g)[0]} Kg`;
      let gender;
      if (element.gender === 'male') {
        gender = 'M';
      } else if (element.gender === 'female') {
        gender = 'F';
      } else if (element.gender === 'transgender') {
        gender = 'T';
      } else {
        gender = 'Gender Not Selected';
      }
      const passenger = {
        travellerId: element.travellerId,
        travellerName: `${element.name.firstName} ${element.name.lastName}`,
        gender,
        seatNo: seatNumber || 'Not Selected',
        meal: meal || 'Not Selected',
        ExcessBaggage: parseInt(excessBaggage) ? excessBaggage : 'Not Selected',
      };
      if (passengerDetails.filter(data => data.travellerId === passenger.travellerId).length) {
      } else {
        setpassengerDetails(passengerDetails => [...passengerDetails, passenger]);
      }
    });
  }, [state]);

  const totalInsuranceFee = 0;
  const totalSurakshaFee = 0;
  const totalSeatFee = state?.passengers.reduce((a, c) => (a += c.ancillaries[flightId]?.seats?.get(0)?.price), 0)
    ? state?.passengers.reduce((a, c) => (a += c.ancillaries[flightId]?.seats?.get(0)?.price), 0)
    : 0;
  const totalMealFee = state?.passengers.reduce((a, c) => (a += c.ancillaries[flightId]?.meals?.get(0)?.price), 0)
    ? state?.passengers.reduce((a, c) => (a += c.ancillaries[flightId]?.meals?.get(0)?.price), 0)
    : 0;
  const totalBaggageFee = state?.passengers.reduce((a, c) => (a += c.ancillaries[flightId]?.baggage?.price), 0)
    ? state?.passengers.reduce((a, c) => (a += c.ancillaries[flightId]?.baggage?.price), 0)
    : 0;
  const totalFareIncludingExtras =
    state.flightDetails[0].fare.totalFare +
    totalBaggageFee +
    totalMealFee +
    totalSeatFee +
    totalInsuranceFee +
    totalSurakshaFee -
    (discount.price ? discount?.price : 0);

  const extraFare = [
    {
      extraFareDescription: 'Suraksha Fees',
      extraFarePrice: totalSurakshaFee,
    },
    {
      extraFareDescription: 'Insurance',
      extraFarePrice: totalInsuranceFee,
    },
    {
      extraFareDescription: 'Seat Fee',
      extraFarePrice: totalSeatFee,
    },
    {
      extraFareDescription: 'Meal Fee',
      extraFarePrice: totalMealFee,
    },
    {
      extraFareDescription: 'Baggage Fee',
      extraFarePrice: totalBaggageFee,
    },
  ];

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={styleObj}>
          <div className={`${styles.modal_container}`}>
            <div className={styles.modal_content}>
              <div className={styles.model_header}>
                <div className={styles.close_icon_wrapper}>
                  <div className={styles.close_btn} onClick={handleClose}>
                    <CloseBlueIcon />
                  </div>
                </div>

                <div className={styles.header_content}>
                  <div className={styles.arrow_and_popup_heading}>
                    <div className={styles.heading}>Confirm And Pay</div>
                  </div>
                  <ShareIcon />
                </div>
              </div>

              <div className={styles.inner_container}>
                <section>
                  <UcCard id="tripSummary" style={{ overflow: 'hidden' }}>
                    <FlightLegDetails
                      legDetails={flightDetails[0]?.leg}
                      departDate={bookingData?.departDate}
                      arriveDate={bookingData?.arriveDate}
                    />
                  </UcCard>
                </section>

                <section>
                  <div id="baggageDetails" className={styles.baggage_details}>
                    <BaggageDetails baggageDetailsData={bookingData.benefits} isReadOnly state={state} />
                  </div>
                </section>

                <section>
                  <TravellerDetailsWithoutAccordian travelerDetails={passengerDetails} />
                </section>
                <section>
                  <div id="bookedContactDetails" className={styles.contact_details}>
                    <BookedContactDetails
                      fullName={`${state?.contactDetails?.name?.firstName} ${state?.contactDetails?.name?.lastName}`}
                      email={state?.contactDetails?.email}
                      phoneNumber={state?.contactDetails?.phoneNumber}
                      isReadOnly
                    />
                  </div>
                </section>

                <section className={styles.suraksha_and_congrats_card}>
                  <div id="suraksha" className={styles.suraksha}>
                    <BannerWithicon bannerType="suraksha" heading=" Your trip is now covered under suraksha" />
                  </div>

                  <div className={styles.congrats_card}>
                    <CongratsBannerWithIcon
                      leftIcon={UmbrellaIcon}
                      titles={titleSubtitleForCard}
                      rightIcon={IciciLogo}
                    />
                  </div>
                </section>

                <section className={styles.fare}>
                  <UcFareBreakup
                    review={review}
                    discount={state.coupon}
                    fareChangeCallback={fareHandler}
                    seatFees={undefined}
                    totalFare={undefined}
                    extraFare={extraFare}
                  />
                </section>

                <div className={styles.agreement}>
                  <p>
                    By clicking on proceed to pay, I agree to udChalo’s{' '}
                    <span className={styles.hyperlink}>Terms and Conditions</span>
                  </p>
                </div>
              </div>

              <div className={styles.modal_footer}>
                <section>
                  <SavedMoney />
                </section>

                <section style={{ position: 'relative', zIndex: '99' }}>
                  <ProceedToPay
                    airline={airline}
                    originLabel={search.origin}
                    desitnationLabel={search.destination}
                    dateString=""
                    travellerCount={1}
                    cabin={search.cabin}
                    totalFare={totalFareIncludingExtras}
                    proceed={() => proceed()}
                    isBorder
                    airlineIcon={false}
                  />
                </section>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ConfirmAndPayPopup;
