import { Autocomplete, Drawer, TextField } from '@mui/material';
import { AeroplaneIcon, CloseIconImage, MSiteUcHeader, SearchIcon } from '@uc/libs/shared/ui';
import { FlightSearchRequest, IPopularAirports } from '@uc/services/network';
import { useEffect, useMemo, useState } from 'react';
import styles from './city-search-msite.module.scss';
export interface CitySearchMsiteProps {
  fieldLabel: string;
  airportList?: any;
  placeholder: string;
  cityCode?: any;
  onCitySelect: (data: any) => void;
  errorMessage?: string;
  recentSearches?: FlightSearchRequest[];
  popularSearches?: IPopularAirports[];
}

function CitySearchMsite(props: CitySearchMsiteProps) {
  const {
    airportList: allAirportList,
    fieldLabel,
    placeholder: placeHolder,
    cityCode,
    errorMessage,
    onCitySelect,
    recentSearches,
    popularSearches,
  } = props;
  const [searchInput, setSearchInput] = useState('');
  const [selectedAirport, setSelectedAirport] = useState({} as any);
  const [airportList, setAirportList] = useState([...allAirportList]);

  const filterAirports = (searchQuery: any) => {
    const queryString = searchQuery.target.value;
    setSearchInput(queryString);
    const filteredAirports = allAirportList.filter((airport: any) => {
      const query = queryString.toLowerCase();
      const { code, city, state } = airport;
      return (
        code.toLowerCase().includes(query) ||
        city.toLowerCase().includes(query) ||
        (state && state.toLowerCase().includes(query))
      );
    });
    setAirportList(filteredAirports);
  };

  const resetSearchInput = () => {
    setSearchInput('');
    setAirportList([...allAirportList]);
  };

  const selectAirport = (data: any) => {
    setSelectedAirport(data);
    onCitySelect(data);
    resetSearchInput();
  };

  useEffect(() => {
    const airport = airportList.find(a => a.code === cityCode);
    if (airport) {
      setSelectedAirport(airport);
    }
  }, [cityCode]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openSearchDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeSearchDrawer = () => {
    setIsDrawerOpen(false);
  };

  const recentSearchedCities = () => {
    if (recentSearches) {
      return (
        <div className={styles.recent_searches_container}>
          <div className={styles.container_header}>Recent Search</div>
          <div className={styles.list_container}>
            {recentSearches.map((search, index) => {
              const city =
                fieldLabel === 'Origin'
                  ? allAirportList.find(airport => airport.code === search.origin)
                  : allAirportList.find(airport => airport.code === search.destination);
              return (
                <div
                  key={`recentSearches-${index}`}
                  className={styles.list}
                  onClick={() => {
                    selectAirport(city);
                    closeSearchDrawer();
                  }}>
                  <div className={styles.list_title_container}>
                    <div>{city?.city}</div>
                    <div>({city?.code})</div>
                  </div>
                  <div className={styles.airport_container}>
                    <AeroplaneIcon />
                    <div>{city?.airport_name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  const filteredPopularAirports = useMemo(() => {
    if (!popularSearches || !allAirportList) {
      return [];
    }
    const filteredAirports = popularSearches
      .map(location => {
        const city = allAirportList.find(airport => airport.code === location.cityCode);
        return city;
      })
      .filter(Boolean);
    return filteredAirports;
  }, [popularSearches, allAirportList]);

  const popularCities = () => {
    if (popularSearches) {
      return (
        <div className={styles.popular_searches_container}>
          <div className={styles.container_header}>Popular Search</div>
          <div className={styles.list_container}>
            {filteredPopularAirports &&
              filteredPopularAirports.map((city, index) => {
                const uniqueKey = `recentSearches-${index}`;
                return (
                  <div
                    key={uniqueKey}
                    className={styles.list}
                    onClick={() => {
                      selectAirport(city);
                      closeSearchDrawer();
                    }}>
                    <div className={styles.list_title_container}>
                      <div>{city?.city}</div>
                      <div>({city?.code})</div>
                    </div>
                    <div className={styles.airport_container}>
                      <AeroplaneIcon />
                      <div>{city?.airport_name}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      );
    }
    return null;
  };

  const floatLabelStyle = errorMessage ? `${styles.float_label} ${styles.float_label_error}` : styles.float_label;
  const inputBoxStyles = errorMessage ? `${styles.input_box} ${styles.input_box_error}` : styles.input_box;
  return (
    <div>
      <div className={styles.city_search_container}>
        <div className={floatLabelStyle}>{fieldLabel}</div>
        <div onClick={openSearchDrawer} className={inputBoxStyles}>
          {selectedAirport?.code ? (
            <div>
              <div className={styles.content_box}>
                <div className={styles.title}>{selectedAirport?.city}</div>
                <div className={styles.subtitle}>{`${selectedAirport?.code} - ${selectedAirport?.airport_name}`}</div>
              </div>
            </div>
          ) : (
            <div className={styles.placeholder}>{placeHolder}</div>
          )}
        </div>
      </div>
      {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}

      {isDrawerOpen && (
        <Drawer
          anchor="bottom"
          PaperProps={{
            style: {
              height: '100%',
              width: '100%',
              backgroundColor: 'white',
            },
          }}
          open={isDrawerOpen}
          onClose={closeSearchDrawer}>
          <div>
            <MSiteUcHeader backHandler={() => closeSearchDrawer()}>
              <MSiteUcHeader.LeftContent>Search Airport/City</MSiteUcHeader.LeftContent>
            </MSiteUcHeader>
            <div className={styles.msite_container}>
              <Autocomplete
                freeSolo
                fullWidth
                inputValue={searchInput}
                onInputChange={filterAirports}
                disableClearable
                options={airportList}
                openOnFocus
                getOptionLabel={airport => JSON.stringify(airport)}
                renderOption={(option, props) => {
                  const airport = props;
                  return (
                    <div
                      onClick={() => {
                        selectAirport(airport);
                        closeSearchDrawer();
                      }}
                      className={styles.single_search_option}
                      key={airport?.code}>
                      <div className={styles.single_search_option_row1}>
                        <div>{airport?.city}</div>
                        <div>{airport?.code}</div>
                      </div>
                      <div className={styles.single_search_option_row2}>
                        <AeroplaneIcon />
                        <div>{airport?.airport_name}</div>
                      </div>
                    </div>
                  );
                }}
                renderInput={params => (
                  <div className={styles.input_container}>
                    <div className={styles.search_image}>
                      <SearchIcon />
                    </div>
                    <TextField
                      fullWidth
                      {...params}
                      label="Search input"
                      InputProps={{
                        ...params.InputProps,
                      }}
                      sx={{
                        '& .MuiInputLabel-root': {
                          marginLeft: params.inputProps.value ? '0px' : '30px',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          marginLeft: '0px !important',
                        },
                        '& .MuiAutocomplete-input': {
                          marginInline: '30px',
                        },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                    <div className={styles.close_icon}>
                      {searchInput ? <CloseIconImage onClick={resetSearchInput} /> : ''}
                    </div>
                  </div>
                )}
              />

              {recentSearchedCities()}
              {popularCities()}
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
}

export default CitySearchMsite;
