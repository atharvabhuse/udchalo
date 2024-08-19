import { format } from 'date-fns';

const INR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatStringToDate(dateString: string, dateFormat?: string) {
  if (dateString) {
    return format(new Date(dateString), dateFormat);
  }
  return '';
}

export function formatDateToTime(dateString: string): string {
  if (dateString) {
    return format(new Date(dateString), 'HH:mm');
  }
  return '';
}

export function formatToINR(value: number): string {
  if (value !== 0) {
    return INR.format(value);
  }
  return '₹0';
}

export function formatToHoursAndMins(duration: number): string {
  if (duration) {
    return `${(duration / 60).toString().split('.')[0]}hr ${duration % 60}m`;
  }
  return '';
}

export function dateToTextConvertHandler(dateString: string): string {
  if (dateString) {
    const date = new Date(dateString)
    return format(date, 'dd MMM EEE, HH:mm')
  }
  return '';
}

