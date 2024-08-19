import dayjs from 'dayjs';

export const convertTimeStampToDate = (inputDateString: string) => {
  if (inputDateString) {
    const inputDate = new Date(inputDateString);
    return inputDate;
  }
  return undefined;
};

export const convertTimeStampToDayjs = (inputDateString: string) => {
  if (inputDateString) {
    const inputDate = dayjs(inputDateString);
    return inputDate;
  }
  return undefined;
};

export const convertSecondsToFormatted = (inputSeconds: number) => {
  const minutes = Math.floor(inputSeconds / 60);
  const seconds = inputSeconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${formattedMinutes}:${formattedSeconds}`;
};
