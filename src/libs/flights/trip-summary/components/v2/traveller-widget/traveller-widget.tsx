import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { groupBy } from 'lodash-es';
import { useMemo, useState } from 'react';

import { ContactDetailsForm, DropdownArrowGreenIcon, UcButton } from '@uc/libs/shared/ui';
import { IPassenger, IPassengerFormData, IPassengerType } from './models';
import TravellerForm, { genderOptions } from './traveller-form';
import styles from './traveller-widget.module.scss';
import { useTripSummaryStateContext } from '../../../contexts/trip-summary-state.context';
import { useTripSummaryDispatchContext } from '../../../contexts/trip-summary-dispatch.context';

export interface TravellerWidgetProps {
  isDefence: boolean;
  existingTravellers: Array<IPassenger>;
  preSelectedTravellers: Array<IPassenger>;
  maxCriteria: {
    adults: number;
    children: number;
    infants: number;
  };
  onSelect: (selectedList: Array<IPassenger>, selectedItem: IPassenger) => void;
  onDeselect: (selectedList: Array<IPassenger>, selectedItem: IPassenger) => void;
}

export default function TravellerWidget(props: TravellerWidgetProps) {
  const { isDefence, existingTravellers, preSelectedTravellers, maxCriteria, onSelect, onDeselect } = props;
  const { adults, children, infants } = maxCriteria;
  const totalTravellers = adults + children + infants;

  const { contactDetails, selectedTravellers: selectedPassengers } = useTripSummaryStateContext();
  const dispatch = useTripSummaryDispatchContext();

  const selectedTravellerMap = useMemo(() => {
    const map = new Map<string, any>();
    preSelectedTravellers.map(s => map.set(s.travellerId, s));
    return map;
  }, [preSelectedTravellers]);

  const allTravellersFormData = useMemo(
    () =>
      existingTravellers.map(t => {
        const {
          name: { firstName, lastName },
          gender,
        } = t;
        const formData = { ...t, formTitle: `${firstName} ${lastName} (${genderOptions[gender]?.code})` };
        return formData;
      }),
    [existingTravellers]
  );

  const [expanded, setExpanded] = useState<boolean>(true);
  const [selectedTravellers, setSelectedTravellers] = useState<Array<IPassenger>>(preSelectedTravellers);
  const [allTravellers, setAllTravellers] = useState<Array<IPassengerFormData>>(allTravellersFormData);

  const { isDefenceIdRequired, currentSelectionMap, isCriteriaMet } = useMemo(() => {
    const shouldValidateDefenceID = isDefence ? isDefence !== !!selectedTravellers.find(t => !!t.serviceNumber) : false;
    // const currentSelection = { adult: 0, child: 0, infant: 0 };
    const currentSelection = groupBy(selectedTravellers, 'passengerType');
    // selectedTravellers.map(st => currentSelection[st.passengerType] += 1);
    const allCriteriaMet =
      maxCriteria.adults === currentSelection.adult &&
      maxCriteria.children === currentSelection.child &&
      maxCriteria.infants === currentSelection.infant;
    return {
      isDefenceIdRequired: shouldValidateDefenceID,
      currentSelectionMap: currentSelection,
      isCriteriaMet: allCriteriaMet,
    };
  }, [selectedTravellers]);

  const toggleExpanded = () => setExpanded(!expanded);

  const getNewTraveller = (type: IPassengerType, title: string): IPassenger & { formTitle: string } => ({
    formTitle: title,
    travellerId: '',
    gender: '',
    serviceNumber: '',
    doNotSaveTraveller: true,
    passengerType: type,
    name: {
      firstName: '',
      lastName: '',
      middleName: '',
      title: '',
    },
  });

  const emitOnSelect = (passenger: IPassenger) => {
    const updatedArray = [...selectedTravellers, passenger];
    onSelect(updatedArray, passenger);
    setSelectedTravellers(updatedArray);
  };

  const emitOnDeselect = (passenger: IPassenger) => {
    const updatedArray = selectedTravellers.filter(t => t.travellerId !== passenger.travellerId);
    onDeselect(updatedArray, passenger);
    setSelectedTravellers(updatedArray);
  };

  const addNewTravellerForms = () => {
    if (!isCriteriaMet) {
      // get the current criteria
      const { adults: maxAdults, children: maxChildren, infants: maxInfants } = maxCriteria;
      // get the currently selected counts
      const { adult = [], child = [], infant = [] } = currentSelectionMap;
      // new map having the difference of selected vs required counts
      const newPassengerCountsMap = new Map([
        ['adult', maxAdults - adult.length],
        ['child', maxChildren - child.length],
        ['infant', maxInfants - infant.length],
      ]);
      // create new traveller based on the difference above
      const newPassengerArray: any = [];
      newPassengerCountsMap.forEach((v, k) => {
        for (let index = 0; index < v; index++) {
          const newPassenger = getNewTraveller(k as IPassengerType, `${k} ${index + 1}`);
          newPassengerArray.push(newPassenger);
        }
      });
      setAllTravellers([...allTravellers, ...newPassengerArray]);
    }
  };

  const showOverLay = totalTravellers !== selectedPassengers?.length;

  const handleContactDetails = (contact: any) => {
    if (contact) {
      dispatch({ type: 'SET_CONTACT_DETAILS', payload: contact });
      dispatch({ type: 'SET_NEW_FORM_STEP', payload: '' });
    }
  };

  return (
    <Accordion className={styles.card}>
      <AccordionSummary expandIcon={<DropdownArrowGreenIcon onClick={toggleExpanded} />}>
        <div>
          <div className={styles.strong_title}>Traveller Details</div>
          <div>
            ({selectedTravellers.length}/{totalTravellers})
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {existingTravellers.length && <div className={styles.strong_title}>Saved Travellers</div>}
          {allTravellers.map((v, i) => {
            const uniqueKey = i;
            return (
              <TravellerForm
                key={uniqueKey}
                isDefenceIdRequired={isDefenceIdRequired}
                formTitle={v.formTitle}
                formData={v}
                selected={selectedTravellerMap.has(v.travellerId)}
                onSelect={emitOnSelect}
                onDeselect={emitOnDeselect}
              />
            );
          })}
          <div className={styles.addRow}>
            <UcButton
              className={styles.addNewCta}
              disabled={isCriteriaMet}
              variant="outlined"
              color="secondary"
              size="large"
              type="button"
              onClick={addNewTravellerForms}>
              Add New Traveller
            </UcButton>
          </div>
        </div>

        <ContactDetailsForm
          closeDrawer={toggleExpanded}
          showOverlay={showOverLay}
          onSubmit={handleContactDetails}
          contactDetails={contactDetails}
        />
      </AccordionDetails>
    </Accordion>
  );
}
