export const useAirportCodeToCityNameConverter = (airportList: any, airportCode: any) => {
  for (const key in airportList) {
    if (key == airportCode) {
      const { city } = airportList[key];
      return { city };
    }
  }
  return { city: '' };
};