export const useDateToTextConverter = (dateInText: string) => {
  const year = dateInText?.split('T')[0].split('-')[0];
  const dateMonth = new Date(
    parseInt(dateInText?.split('T')[0].split('-')[0],10),
    parseInt(dateInText?.split('T')[0].split('-')[1],10) - 1,
    parseInt(dateInText?.split('T')[0].split('-')[2],10)
  )
    .toString()
    .split(' ')
    .slice(0, 3)
    .slice(1, 3)
    .reverse()
    .join(' ');
    const day = new Date(
      parseInt(dateInText?.split('T')[0].split('-')[0], 10),
      parseInt(dateInText?.split('T')[0].split('-')[1], 10),
      parseInt(dateInText?.split('T')[0].split('-')[2], 10)
  )
    .toString()
    .split(' ')
    .slice(0, 3)[0];
  const time = dateInText?.split('T')[1];
  return { time, dateMonth, day, year };
};
