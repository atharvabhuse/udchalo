import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Travellers from '@uc/assets/images/travellers.svg';
import { TravellerCard } from '@uc/libs/flights/shared/ui/components/traveller-card/traveller-card';
import styles from './booked-traveller-details.module.scss';

export interface BookedTravellerDetailsProps {
  bookedTravellDetails: Array<any>;
  isReadOnly?: boolean;
}

export function BookedTravellerDetails(props: BookedTravellerDetailsProps) {
  const { bookedTravellDetails, isReadOnly } = props;
  return (
    <div className={styles.accordion_root}>
      <Accordion className={styles.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span>
            <Travellers />
          </span>
          <span className={styles.header}>Traveller Details</span>
        </AccordionSummary>
        <AccordionDetails>
          {bookedTravellDetails?.map((eachTravellerInfo: any) => (
            <TravellerCard
              name={`${eachTravellerInfo.name.firstName} ${eachTravellerInfo.name.lastName}`}
              typeOfTraveller={eachTravellerInfo.passengerType}
              gender={eachTravellerInfo.gender}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
