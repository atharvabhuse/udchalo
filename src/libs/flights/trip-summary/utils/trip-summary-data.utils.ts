import { ISurakshaResponse } from '@uc/services/network';
import { IAppliedCoupon, IFlightTripSummaryState } from '../flights-trip-summary-reducer';
import { FlightTripSummaryState } from '../models';

export function getCouponListPayload(flightReviewData: any, sessionId: string, onwardId: string) {
  const { baseTotalFare, totalConvenienceFee, totalFare, totalFee, totalTax } =
    flightReviewData?.data?.response?.onwardLeg?.fare || {};
  return {
    userId: '',
    sessionId,
    flightIds: [onwardId],
    fareDetails: {
      baseFare: baseTotalFare,
      taxesAndFees: totalFee + totalTax,
      convenienceFee: totalConvenienceFee,
      insuranceFee: 0,
      donationMoney: 0,
      surakshaFee: 0,
      seatsFee: 0,
      mealsFee: 0,
      baggageFee: 0,
      totalFare,
    },
  };
}

function getPassengerType(type: string) {
  let result = 'ADT';
  switch (type) {
    case 'child':
      result = 'CHD';
      break;
    case 'adult':
      result = 'ADT';
      break;
    case 'infant':
      result = 'INF';
      break;
    default:
      break;
  }
  return result;
}

export function generateSaveBookingPayload(sessionId: string, flightIds: string[], state: FlightTripSummaryState) {
  const { passengers: selectedPassengers, contactDetails } = state;
  const { receiveInfoOnWhatsApp, firstName, phonenumber, ...otherContactDetails } = contactDetails;
  const passengers: any[] = [];

  selectedPassengers.forEach((tv: any) => {
    const {
      ancillaries,
      relationship,
      uploads,
      isEnabled,
      isDefence,
      type,
      userId,
      age,
      saveTravellerInfo,
      passportNumber,
      passportIssuingDate,
      passportExpiryDate,
      ...passenger
    } = tv;
    const ancWithArray: any = {};
    for (const flightId in ancillaries) {
      const value = ancillaries[flightId];
      ancWithArray[flightId] = {
        seats: Array.from(value.seats.values()),
        meals: Array.from(value.meals.values()),
        baggage: value.baggage ?? {},
      };
    }
    passenger.ancillaries = ancWithArray;
    passenger.passengerType = type ? getPassengerType(type) : 'ADT';
    passenger.dateOfBirth =
      passenger.passengerType === 'ADT' ? { day: 7, month: 1, year: 1986 } : { day: 9, month: 2, year: 2015 };
    passenger.doNotSaveTraveller = !(saveTravellerInfo && saveTravellerInfo == true);
    passengers.push(passenger);
  });

  const payload: any = {
    sessionId,
    flightIds,
    source: 'website',
    passengers,
    contactDetails: otherContactDetails,
    code: state?.coupon ? state.coupon.code : '',
    isInsuranceOpted: state.isInsuranceOpted,
    isRefundProtectionOpted: null,
    isSurakshaOpted: !!state.isSurakshaOpted,
    refundProtectionOnAddOns: false,
    cabService: [],
    emailNewsLetterActive: false,
    donationAmount: 5,
    fareDetails: {
      baseFare: 6926,
      taxesAndFees: 1678,
      convenienceFee: 498,
      insuranceFee: 398,
      donationMoney: 5,
      surakshaFee: 0,
      seatsFee: 1400,
      mealsFee: 650,
      baggageFee: 0,
      totalFare: 11555,
      isBankOffer: true,
    },
    isDonationOpted: state.isDonationOpted,
  };

  if (state.isGstSelected && state.gstDetails) {
    payload.gstDetails = state.gstDetails;
  }

  return payload;
}

export function getPaymentRedirectLink(bookingId: number, state: FlightTripSummaryState) {}
export const calculateFareDetails = fareList => {
  const fareDetails = {
    baseFare: 0,
    taxesAndFees: 0,
    convenienceFee: 0,
    insuranceFee: 0,
    donationMoney: 0,
    surakshaFee: 0,
    seatsFee: 0,
    mealsFee: 0,
    baggageFee: 0,
    totalFare: 0,
    isBankOffer: false,
  };

  (fareList?.listComponents || [])?.forEach(component => {
    (component?.list || [])?.forEach(item => {
      switch (item.fareName.toLowerCase()) {
        case 'base fare':
          fareDetails.baseFare += item.fareAmount;
          break;
        case 'taxes & fees':
          fareDetails.taxesAndFees += item.fareAmount;
          break;
        case 'convenience fee':
          fareDetails.convenienceFee += item.fareAmount;
          break;
        case 'insurance':
          fareDetails.insuranceFee += item.fareAmount;
          break;
        case 'donation':
          fareDetails.donationMoney += item.fareAmount;
          break;
        case 'suraksha':
          fareDetails.surakshaFee += item.fareAmount;
          break;
        case 'seat fee':
          fareDetails.seatsFee += item.fareAmount;
          break;
        case 'meal fee':
          fareDetails.mealsFee += item.fareAmount;
          break;
        case 'baggage fee':
          fareDetails.baggageFee += item.fareAmount;
          break;
        default:
          break;
      }
    });
  });

  // Calculate the total fare
  fareDetails.totalFare =
    fareDetails.baseFare +
    fareDetails.taxesAndFees +
    fareDetails.convenienceFee +
    fareDetails.insuranceFee +
    fareDetails.donationMoney +
    fareDetails.surakshaFee +
    fareDetails.seatsFee +
    fareDetails.mealsFee +
    fareDetails.baggageFee;

  return fareDetails;
};

export const generateSaveBookingPayloadv2 = (sessionId, onwardId, state: IFlightTripSummaryState) => {
  const {
    selectedTravellers,
    contactDetails,
    appliedCoupon,
    gstDetails,
    isInsuranceOpted,
    isRefundProtectionOpted,
    isSurakshaOpted,
    isDonationOpted,
    isGstOpted,
    fareList,
    donationAmount,
  } = state;
  const passengers = (selectedTravellers || [])?.map(traveller => {
    traveller.passengerType = traveller?.passengerType ? getPassengerType(traveller?.passengerType) : 'ADT';
    traveller.dateOfBirth =
      traveller?.passengerType === 'ADT' ? { day: 7, month: 1, year: 1986 } : { day: 9, month: 2, year: 2015 };
    const { formTitle, ...passengerTrimmed } = traveller;
    return passengerTrimmed;
  });
  const { receiveInfoOnWhatsApp, ...otherContactDetails } = contactDetails;
  const fareDetails = calculateFareDetails(fareList);

  const payLoad: any = {
    sessionId,
    flightIds: [onwardId],
    passengers,
    contactDetails: otherContactDetails,
    source: 'website',
    code: appliedCoupon?.coupon?.code || '',
    isInsuranceOpted,
    isRefundProtectionOpted,
    isSurakshaOpted,
    refundProtectionOnAddOns: false,
    cabService: [],
    emailNewsLetterActive: false,
    fareDetails,
    isLtcCheck: false,
    isDonationOpted,
  };
  if (isGstOpted && state.gstDetails) {
    payLoad.gstDetails = gstDetails;
  }
  if (isDonationOpted) {
    payLoad.donationAmount = donationAmount || 0;
  }
  return payLoad;
};

const calculateFees = travelers =>
  (travelers || [])?.reduce(
    (totals, traveler) => {
      const travelerAncillaries = traveler?.ancillaries;
      const ancillariesKeys = Object.keys(travelerAncillaries);

      (ancillariesKeys || [])?.forEach(key => {
        const ancillaries = travelerAncillaries[key];

        if (ancillaries?.meals) {
          ancillaries.meals.forEach(meal => {
            totals.mealFee += meal.price;
          });
        }

        if (ancillaries?.baggage) {
          totals.baggageFee += ancillaries.baggage.price;
        }

        if (ancillaries?.seats) {
          ancillaries.seats.forEach(seat => {
            totals.seatFee += seat.amount;
          });
        }
      });

      return totals;
    },
    { mealFee: 0, baggageFee: 0, seatFee: 0 }
  );

export const calculateFareList = (tripSummaryState: IFlightTripSummaryState) => {
  const {
    flightPriceData,
    flightPriceDetails,
    currentLegIdx,
    selectedTravellers,
    surakshaAmounts,
    appliedCoupon,
    isInsuranceOpted,
    isSurakshaOpted,
    isDonationOpted,
    donationAmount,
  } = tripSummaryState;
  const passengerCount = selectedTravellers?.length;

  const { mealFee, baggageFee, seatFee } = calculateFees(selectedTravellers);

  const fare = flightPriceDetails?.[currentLegIdx]?.leg?.fare;
  const baseFare = fare?.baseTotalFare || 0;
  const taxesAndFees = (fare?.totalTax || 0) + (fare?.totalFee || 0);
  const convenienceFee = fare?.totalConvenienceFee || 0;
  const coupon = appliedCoupon?.coupon;
  const couponDiscount = coupon ? -coupon.actual_off : 0;
  const insuranceFee = isInsuranceOpted ? flightPriceData?.insuranceDetails?.netPremium || 0 : 0;
  const surakshaFee = isSurakshaOpted ? (surakshaAmounts?.surakshaAmountPerTraveller || 0) * passengerCount : 0;
  const donationAmountFee = isDonationOpted ? donationAmount : 0;

  const flightsFareList = [
    {
      fareName: 'Base Fare',
      fareDescription: '',
      passengerMultiplierTextShown: true,
      numberOfPassenger: passengerCount,
      fareAmount: baseFare,
    },
    {
      fareName: 'Taxes & Fees',
      fareDescription: '',
      passengerMultiplierTextShown: false,
      numberOfPassenger: passengerCount,
      fareAmount: taxesAndFees,
    },
    {
      fareName: 'Convenience Fee',
      fareDescription: '*(This is not refundable)',
      passengerMultiplierTextShown: false,
      numberOfPassenger: passengerCount,
      fareAmount: convenienceFee,
    },
  ];

  if (coupon) {
    flightsFareList.push({
      fareName: `Coupon - ${coupon.code}`,
      fareDescription: '',
      passengerMultiplierTextShown: false,
      numberOfPassenger: passengerCount,
      fareAmount: couponDiscount,
    });
  }

  const extrasList = [];

  if (surakshaFee > 0) {
    extrasList.push({
      fareName: 'Suraksha',
      fareDescription: '',
      passengerMultiplierTextShown: false,
      numberOfPassenger: passengerCount,
      fareAmount: surakshaFee,
    });
  }

  if (insuranceFee > 0) {
    extrasList.push({
      fareName: 'Insurance',
      fareDescription: '',
      passengerMultiplierTextShown: true,
      numberOfPassenger: passengerCount,
      fareAmount: insuranceFee,
    });
  }

  if (seatFee > 0) {
    extrasList.push({
      fareName: 'Seat Fee',
      fareDescription: '',
      passengerMultiplierTextShown: true,
      numberOfPassenger: passengerCount,
      fareAmount: seatFee,
    });
  }

  if (mealFee > 0) {
    extrasList.push({
      fareName: 'Meal Fee',
      fareDescription: '',
      passengerMultiplierTextShown: true,
      numberOfPassenger: passengerCount,
      fareAmount: mealFee,
    });
  }

  if (baggageFee > 0) {
    extrasList.push({
      fareName: 'Baggage Fee',
      fareDescription: '',
      passengerMultiplierTextShown: true,
      numberOfPassenger: passengerCount,
      fareAmount: baggageFee,
    });
  }

  if (donationAmountFee > 0) {
    extrasList.push({
      fareName: 'Donation Amount',
      fareDescription: '',
      passengerMultiplierTextShown: false,
      numberOfPassenger: passengerCount,
      fareAmount: donationAmountFee,
    });
  }
  const newFts = tripSummaryState;
  newFts.fareList = {
    youSavedText: {
      isYouSavedText: false,
    },
    headerText: 'Fare Breakup',
    footerText: 'Total Fare',
    listComponents: [
      {
        headerText: 'Flights Fare',
        list: flightsFareList,
      },
      {
        headerText: 'Extras',
        list: extrasList,
      },
    ],
  };
};

export const calculateSurakshaAmounts = (
  surakshaResponse: ISurakshaResponse[],
  flightLegId: string,
  totalTravellers: number,
  appliedCoupon: IAppliedCoupon
) => {
  let amountPerTraveller = 0;
  let totalRefundAmount = 0;
  let amountWithoutSuraksha = 0;
  const totalAncillariesAmount = 0;

  if (surakshaResponse?.length > 0) {
    const surakshaForParticularLeg = (surakshaResponse || [])?.find(
      surakshaOption => surakshaOption.legId === flightLegId
    );

    if (surakshaForParticularLeg?.isEnabled && surakshaForParticularLeg?.details) {
      const { totalCoverage, fareConfig, refundCharges } = surakshaForParticularLeg?.details || {};

      const totalOnwardCoverage = totalCoverage?.onward || 0;
      const totalReturnCoverage = totalCoverage?.return || 0;
      const totalAncillaryAmount = totalAncillariesAmount || 0;
      const couponDiscount = appliedCoupon?.actualDiscount || 0;

      if (!fareConfig?.isSlabBasedFare && fareConfig?.fareInPercentage) {
        amountPerTraveller = Math.ceil(
          (totalOnwardCoverage + totalReturnCoverage + totalAncillaryAmount - couponDiscount) *
            (fareConfig.fareInPercentage / 100)
        );
      }

      amountPerTraveller = Math.max(0, amountPerTraveller);
      totalRefundAmount = Math.max(0, totalOnwardCoverage);
      amountWithoutSuraksha = Math.max(0, totalOnwardCoverage - refundCharges);
    }
  }

  return {
    surakshaAmountPerTraveller: amountPerTraveller,
    totalSurakshaRefundAmount: totalRefundAmount,
    totalRefundAmountWithoutSuraksha: amountWithoutSuraksha,
  };
};
