import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { usePopper } from 'react-popper';
// import { UcBodyPortal, AeroplaneIcon, CloseIcon, SearchIcon } from '@uc/libs/shared/ui';
import styles from './city-search.module.scss';
import { AeroplaneIcon, CloseIcon, SearchIcon, UcBodyPortal } from '@uc/libs/shared/ui';

/* eslint-disable-next-line */
export interface CitySearchProps {
  fieldLabel: string;
  airportList?: any;
  placeholder: string;
  cityCode?: any;
  onCitySelect: (data: any) => void;
  errorMessage?: string;
}

function CitySearch(props: CitySearchProps) {
  const {
    airportList: allAirportList,
    fieldLabel,
    placeholder: placeHolder,
    cityCode,
    errorMessage,
    onCitySelect,
  } = props;
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedAirport, setSelectedAirport] = useState({} as any);
  const [airportList, setAirportList] = useState([...allAirportList]);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);

  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  });
  const popperRef = useRef(null);

  const setPopperRef = (ref: any) => {
    setPopperElement(ref);
    popperRef.current = ref;
  };

  useOnClickOutside(popperRef, () => setDropdownOpen(false));
  const openSearchDropdown = () => setDropdownOpen(true);

  const filterAirports = (searchQuery: any) => {
    const queryString = searchQuery.target.value.trim();
    setSearchInput(queryString);
    const filteredAirports = allAirportList.filter((airport: any) => {
      const query = queryString.toLowerCase();
      const { code = '', city = '', state = '' } = airport;
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
    setDropdownOpen(false);
    resetSearchInput();
  };

  useEffect(() => {
    const airport = airportList.find(a => a.code === cityCode);
    if (airport) {
      setSelectedAirport(airport);
    }
  }, [cityCode]);

  const floatLabelStyle = errorMessage ? `${styles.float_label} ${styles.float_label_error}` : styles.float_label;
  const inputBoxStyles = errorMessage ? `${styles.input_box} ${styles.input_box_error}` : styles.input_box;
  return (
    <>
      <div>
        <div className={styles.city_search_container} ref={setReferenceElement}>
          <div className={floatLabelStyle}>{fieldLabel}</div>
          <div onClick={openSearchDropdown} className={inputBoxStyles}>
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
      </div>
      {isDropdownOpen ? (
        <UcBodyPortal>
          <div
            className="city_search_dropdown_menu"
            ref={setPopperRef}
            style={popperStyles.popper}
            {...attributes.popper}>
            <div className="search_box">
              <div className="search_heading">Search</div>
              <div className="search_inp_row">
                <SearchIcon className="search_icon" />
                <input className="search_inp" autoFocus value={searchInput} onChange={filterAirports} />
                {searchInput ? <CloseIcon className="exit_icon" onClick={resetSearchInput} /> : ''}
              </div>
            </div>
            <div className="search_options">
              {airportList?.length !== 0
                ? airportList?.map((data: any, index: number) => {
                    const uniqueKey = `airportList-${index}`;
                    return (
                      <div onClick={() => selectAirport(data)} className="single_search_option" key={uniqueKey}>
                        <div className="single_search_option_row1">
                          <div>{data?.city}</div>
                          <div>{data?.code}</div>
                        </div>
                        <div className="single_search_option_row2">
                          <AeroplaneIcon />
                          <div>{data?.airport_name}</div>
                        </div>
                      </div>
                    );
                  })
                : ''}
            </div>
          </div>
        </UcBodyPortal>
      ) : (
        ''
      )}
    </>
  );
}

export default CitySearch;
