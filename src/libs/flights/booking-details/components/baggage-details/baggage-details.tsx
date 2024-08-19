import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { BaggageAllowanceIcon } from '@uc/assets/images';
import styles from './baggage-details.module.scss';

export interface BaggageDetailsPropTypes {
  baggageDetailsData?: Array<any>;
  isReadOnly: boolean;
  state?: any;
}

export function BaggageDetails({ baggageDetailsData, isReadOnly, state }: BaggageDetailsPropTypes) {
  return (
    <div className={styles.accordion_root}>
      {!isReadOnly ? (
        <Accordion className={styles.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <span>
              <BaggageAllowanceIcon />
            </span>
            <span className={styles.header}>Baggage Details</span>
            <span className={styles.m_site_header}>Baggage Allowance</span>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.container}>
              <div className={styles.left_side}>
                <ul>
                  {baggageDetailsData?.slice(0, 3)?.map((baggageDetails: any) => (
                    <li className={styles.list_item}>
                      <span className={styles.lbl}>{baggageDetails.key}</span>
                      <span className={styles.value}>{baggageDetails.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.right_side}>
                <ul>
                  {baggageDetailsData?.slice(3, baggageDetailsData.length)?.map((baggageDetails: any) => (
                    <li className={styles.list_item}>
                      <span className={styles.lbl}>{baggageDetails.key}</span>
                      <span className={styles.value}>{baggageDetails.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ) : (
        <div className={styles.read_only_container}>
          <div className={styles.icon_and_heading}>
            <span>
              <BaggageAllowanceIcon />
            </span>
            <span className={styles.header_read_only}>Baggage Details</span>
            <span className={styles.m_site_header}>Baggage Allowance</span>
          </div>

          <div className={styles.container}>
            <div className={styles.left_side}>
              <ul className={styles.left_side_ul}>
                <li className={styles.list_item}>
                  <li className={styles.lbl}>
                    <div>Cabbin Baggage:</div>
                    <div className={styles.value}>
                      {state.segments[0].handBaggage}
                      Kg
                    </div>
                  </li>
                </li>
                <li className={styles.list_item}>
                  <li className={styles.lbl}>
                    <div>Check-in Baggage:</div>
                    <div className={styles.value}>
                      1 Piece X{state.segments[0].checkInBaggage}
                      Kgs/person
                    </div>
                  </li>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
