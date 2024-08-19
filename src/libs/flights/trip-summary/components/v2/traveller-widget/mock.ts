import { IPassenger } from "./models";
import { TravellerWidgetProps } from "./traveller-widget";

export const existingTravellers: Array<IPassenger> = [
  {
    travellerId: "f111f5e4-c514-47e5-a7fa-eaa258e0d8f8",
    gender: 'male',
    serviceNumber: '',
    doNotSaveTraveller: true,
    passengerType: 'adult',
    name: {
      firstName: 'Ashish',
      lastName: 'Gaikwad',
      middleName: 'S',
      title: 'Mr.'
    }
  },
  {
    travellerId: "f222f5e4-c514-47e5-a7fa-eaa258e0d8f8",
    gender: 'male',
    serviceNumber: '',
    doNotSaveTraveller: true,
    passengerType: 'adult',
    name: {
      firstName: 'Apurv',
      lastName: 'Khadamkar',
      middleName: 'A',
      title: ''
    }
  },
  {
    travellerId: "f333f5e4-c514-47e5-a7fa-eaa258e0d8f8",
    gender: 'male',
    serviceNumber: '',
    doNotSaveTraveller: true,
    passengerType: 'child',
    name: {
      firstName: 'Atharva',
      lastName: 'Bhuse',
    }
  }
];

const preSelectedTravellers: Array<IPassenger> = [
  {
    travellerId: "f111f5e4-c514-47e5-a7fa-eaa258e0d8f8",
    gender: 'male',
    serviceNumber: '',
    doNotSaveTraveller: true,
    passengerType: 'adult',
    name: {
      firstName: 'Ashish',
      lastName: 'Gaikwad',
      middleName: 'S',
      title: 'Mr.'
    }
  }
]
  
export const initialData = {
  existingTravellers,
  preSelectedTravellers,
  maxCriteria: { adults: 1, children: 1, infants: 0 }

}