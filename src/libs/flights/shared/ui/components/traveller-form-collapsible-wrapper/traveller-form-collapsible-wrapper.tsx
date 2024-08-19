// // import { DropdownArrowGreenIcon, UcTravellerForm, UserFormData } from '@uc/libs/shared/ui';
// import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Container, FormControlLabel } from '@mui/material';
// import { ChangeEvent, useState } from 'react';
// import { useTripSummaryDispatchContext, useTripSummaryStateContext } from '@uc/libs/flights/trip-summary';
// import { DropdownArrowGreenIcon } from '@uc/assets/images';
// import { UcTravellerForm, UserFormData } from '@uc/libs/shared/ui';
// import styles from './traveller-form-collapsible-wrapper.module.scss';

// /* eslint-disable-next-line */
// export interface TravellerFormCollapsibleWrapperProps {
//   traveller?: UserFormData;
//   heading?: string;
// }

// export function TravellerFormCollapsibleWrapper({ traveller, heading }: TravellerFormCollapsibleWrapperProps) {
//   const [expanded, setExpanded] = useState<boolean>(false);
//   const [selected, setSelected] = useState<boolean>(false);
//   const { adults, children, infants, passengers } = useTripSummaryStateContext();
//   const dispatch = useTripSummaryDispatchContext();

//   const totalTravellers = adults + children + infants;

//   const onUpdateTraveller = (traveller: any) => {
//     dispatch({
//       type: 'UPDATE_TRAVELLER',
//       payload: traveller,
//     });
//     setExpanded(false);
//   };
//   const onCancel = () => {
//     setExpanded(false);
//   };

//   const onAddTraveller = (traveller: any) => {
//     dispatch({
//       type: 'ADD_TRAVELLER',
//       payload: traveller,
//     });
//     setExpanded(false);
//   };

//   const toggleExpanded = () => setExpanded(!expanded);

//   /**
//    * if false always allow
//    * if true only allow when selected traveller is less that total travellers
//    * @param event
//    */
//   const toggleUserSelection = (event: ChangeEvent<HTMLInputElement>) => {
//     const selected = event.target.checked;
//     if (!selected || (selected && passengers.length < totalTravellers)) {
//       setSelected(selected);
//       if (!traveller?.serviceNumber) {
//         setExpanded(selected);
//       }
//       const type = selected ? 'SELECT_TRAVELLER' : 'DESELECT_TRAVELLER';
//       dispatch({ type, payload: traveller });
//     }
//   };

//   const displayLabel = traveller ? `${traveller.name.firstName} ${traveller.name.lastName}` : heading;

//   return (
//     <Accordion expanded={expanded} className={styles.card} style={{ boxShadow: 'none' }}>
//       <AccordionSummary expandIcon={<DropdownArrowGreenIcon onClick={toggleExpanded} />}>
//         <Container>
//           <FormControlLabel
//             control={<Checkbox checked={selected} onChange={toggleUserSelection} />}
//             label={displayLabel}
//           />
//         </Container>
//       </AccordionSummary>
//       <AccordionDetails>
//         <UcTravellerForm
//           userData={traveller}
//           submitLabel="Update Traveller"
//           onSubmit={onUpdateTraveller}
//           onCancel={onCancel}
//         />
//       </AccordionDetails>
//     </Accordion>
//   );
// }
function TravellerFormCollapsibleWrapper() {}
export default TravellerFormCollapsibleWrapper;
