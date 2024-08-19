import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatToINR } from '@uc/utils';
import styles from './total-pay-msite-accordian.module.scss';

/* eslint-disable-next-line */
export interface TotalPayMsiteAccordianProps {
  children?: any;
  title?: string;
  amount?: number;
}

export function TotalPayMsiteAccordian({ children, title, amount }: TotalPayMsiteAccordianProps) {
  let formattedTotalFare = '';
  if (typeof amount === 'number') {
    formattedTotalFare = formatToINR(amount);
  }

  return (
    <div className={styles.accordion_root}>
      <Accordion className={`${styles.accordion}`}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className={styles.accordian_content_summary}>
            <span className={styles.header}>{title}</span>
            <span className={styles.header}>{formattedTotalFare}</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
}

export default TotalPayMsiteAccordian;
