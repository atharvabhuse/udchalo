import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Plus from '@uc/assets/images/plusSign.svg';
import Minus from '@uc/assets/images/minusSign.svg';
import { Box } from '@mui/material';
import styles from './faqs.module.scss';

interface FlightFaqsData {
  content: string;
  title: string;
}

interface FAQ {
  faqData: {
    header: string;
    data: FlightFaqsData[];
  };
}

function CustomExpandIcon() {
  return (
    <Box
      sx={{
        '.Mui-expanded & > .collapsIconWrapper': {
          display: 'none',
        },
        '.expandIconWrapper': {
          display: 'none',
        },
        '.Mui-expanded & > .expandIconWrapper': {
          display: 'block',
        },
      }}>
      <div className="expandIconWrapper">
        <Minus />
      </div>
      <div className="collapsIconWrapper">
        <Plus />
      </div>
    </Box>
  );
}

export function Faqs(props: FAQ) {
  const { faqData } = props;

  return (
    <div className={styles.faqs_container}>
      <div className={styles.faqs_container_data}>
        <div className={styles.faqs_heading}>
          <div>{faqData?.header}</div>
        </div>
        <div>
          {faqData &&
            (faqData?.data || [])?.map((data: FlightFaqsData, index: number) => {
              const uniqueKey = `faq-details-${index}`;
              return (
                <div className={styles.faqs_data_details} key={uniqueKey}>
                  <Accordion className={styles.faqs_data}>
                    <AccordionSummary
                      expandIcon={<CustomExpandIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header">
                      <Typography component="div">
                        <div className={styles.faqs_title} dangerouslySetInnerHTML={{ __html: data?.title }} />
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component="div">
                        <div className={styles.faqs_all_info}>
                          <div dangerouslySetInnerHTML={{ __html: data?.content }} />
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Faqs;
