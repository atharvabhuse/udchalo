export type IPassengerType = 'adult' | 'child' | 'infant';

export interface IGenderOptions {
  [key: string]: any;
}

export interface IPassgengerName {
  title?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IPassenger {
  travellerId: string;
  name: IPassgengerName,
  passengerType: IPassengerType;
  gender: string;
  serviceNumber?: string;
  dateOfBirth?: { day: number, month: number, year: number };
  doNotSaveTraveller: boolean
}

export interface IPassengerFormData extends IPassenger {
  formTitle: string;
}