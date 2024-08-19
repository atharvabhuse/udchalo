import { Dialog, DialogContent, FormControlLabel, Radio, RadioGroup, SwipeableDrawer } from '@mui/material';
import { StarRatingForSuraksha } from '@uc/assets/images';
import {
  CloseButton,
  GreenCheckCircleIcon,
  LeftArrowBlueIcon,
  RedCrossCircleIcon,
  SurakshaLogo,
  SurakshaShieldLogo,
  UcButton,
  useDeviceDetect,
} from '@uc/libs/shared/ui';
import { useState } from 'react';
import styles from './suraksha-choice.module.scss';

const surakshaDetails = [
  { label: 'Total Base Fare', included: true },
  { label: 'Total Taxes & Fees', included: true },
  { label: 'Seat Fee', included: true },
  { label: 'Meals Fee', included: true },
  { label: 'Baggage Fee', included: true },
  { label: 'Convenience Fee', included: false },
  { label: 'Refundable Fee', included: false },
  { label: 'Insurance Fee', included: false },
];

/* eslint-disable-next-line */
export interface SurakshaChoiceProps {
  selectedSuraksha?: boolean;
  onSelect: (selected: boolean) => void;
  closeDrawer: (arg: boolean) => void;
  refundAmountWithSuraksha: string;
  refundAmountWithoutSuraksha: string;
  perTravellerSurakshaAmt: string;
}

export function SurakshaChoice({
  selectedSuraksha,
  onSelect,
  closeDrawer,
  refundAmountWithSuraksha,
  refundAmountWithoutSuraksha,
  perTravellerSurakshaAmt,
}: SurakshaChoiceProps) {
  const [value, setValue] = useState<boolean>(selectedSuraksha ?? false);
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = (event.target as HTMLInputElement).value === 'true';
    setValue(selected);
  };

  const showWhatsCovered = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onSelect(value);
    setOpen(false);
  };

  const clickHandler = () => {
    onSelect(value);
    closeDrawer(true);
  };

  const handleKeyDown = () => {};

  const { isMobile } = useDeviceDetect();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.intro_row}>
          <div className={styles.intro}>
            <div className={styles.sub_header}> Full refund with</div>
            <SurakshaLogo />
            <div className={styles.more_info}>Read More</div>
          </div>
          <div className={styles.logo}>
            <SurakshaShieldLogo />
          </div>
        </div>
      </div>
      <div className={styles.traveller_availed_discount}>
        <div className={styles.star_logo}>
          <StarRatingForSuraksha />
        </div>
        <div className={styles.txt}>2.5k travellers availed in last one month</div>
      </div>
      <div className={styles.option_row}>
        <div className={styles.whats_cover_link} onClick={showWhatsCovered} onKeyDown={handleKeyDown} role="none">
          What is covered?
        </div>
        <RadioGroup
          row
          aria-labelledby="suraksha-options"
          name="suraksha-group"
          className={styles.option_group}
          value={value}
          onChange={handleChange}>
          <div>
            <FormControlLabel
              className={styles.green_border}
              value
              control={<Radio key="yes" color="success" />}
              label={
                <div className={styles.labelText}>
                  Pay <span className={styles.bold}>₹{perTravellerSurakshaAmt} per traveller</span>
                  <div className={styles.refund_amt_suraksha}>
                    Refund* amount ₹<span className={styles.red_txt}>{refundAmountWithSuraksha}</span>
                  </div>
                </div>
              }
            />
          </div>
          <div>
            <FormControlLabel
              className={styles.red_border}
              value={false}
              control={<Radio key="no" color="success" />}
              label={
                <div className={styles.labelText}>
                  No, <span className={styles.bold}>I don’t want free cancellation</span>
                  <div className={styles.refund_amt_suraksha}>
                    Approx refund amount ₹<span className={styles.red_txt}>{refundAmountWithoutSuraksha}</span>
                  </div>
                </div>
              }
            />
          </div>
        </RadioGroup>

        {false && <div className={styles.error}>Please select one of the options to proceed</div>}

        <div className={styles.t_and_c}>
          By adding Suraksha, I agree to the{' '}
          <a className={styles.out_link} href="/">
            Terms & Conditions
          </a>
        </div>

        <div className={styles.button_row}>
          <UcButton variant="contained" type="button" className={styles.add_btn} onClick={clickHandler}>
            Continue
          </UcButton>
        </div>
      </div>
      {isMobile ? (
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={handleClose}
          onOpen={handleClose}
          className={styles.suraksha_dialog}
          PaperProps={{
            style: {
              borderTopLeftRadius: '2rem',
              borderTopRightRadius: '2rem',
              height: '70%',
              overflowY: 'unset',
            },
          }}>
          <div className={styles.suraksha_dialog_content}>
            <div className={styles.covered_details}>
              <div className={styles.suraksha_cvr_header_container}>
                <div className={styles.suraksha_cvr_backArrow}>
                  <LeftArrowBlueIcon onClick={handleClose} />
                </div>
                <div className={styles.heading}>What is covered under Suraksha</div>
                <CloseButton className={styles.close_icon} onClick={handleClose} />
              </div>

              <table className={styles.tbl}>
                <thead>
                  <tr className={styles.tbl_header}>
                    <td className={styles.fare_text}>Fare/Fees</td>
                    <td>
                      <span style={{ color: '#00B00C' }}>Included</span> /
                      <span style={{ color: '#FF0000' }}>Not-Included</span>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {surakshaDetails.map(surakshaValue => (
                    <tr key={surakshaValue.label} className={styles.t_row}>
                      <td>{surakshaValue.label}</td>
                      <td style={{ textAlign: 'center' }}>
                        {surakshaValue.included ? <GreenCheckCircleIcon /> : <RedCrossCircleIcon />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SwipeableDrawer>
      ) : (
        <Dialog
          onClose={handleClose}
          open={open}
          className={styles.suraksha_dialog}
          sx={{ '& .MuiDialog-paper': { borderRadius: '28px', overflowY: 'unset' } }}>
          <DialogContent className={styles.suraksha_dialog_content}>
            <div className={styles.covered_details}>
              <div className={styles.suraksha_cvr_header_container}>
                <div className={styles.suraksha_cvr_backArrow}>
                  <LeftArrowBlueIcon onClick={handleClose} />
                </div>
                <div className={styles.heading}>What is covered under Suraksha</div>
                <CloseButton className={styles.close_icon} onClick={handleClose} />
              </div>

              <table className={styles.tbl}>
                <thead>
                  <tr className={styles.tbl_header}>
                    <td className={styles.fare_text}>Fare/Fees</td>
                    <td>
                      <span style={{ color: '#00B00C' }}>Included</span> /
                      <span style={{ color: '#FF0000' }}>Not-Included</span>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {surakshaDetails.map(surakshaValue => (
                    <tr key={surakshaValue.label} className={styles.t_row}>
                      <td>{surakshaValue.label}</td>
                      <td style={{ textAlign: 'center' }}>
                        {surakshaValue.included ? <GreenCheckCircleIcon /> : <RedCrossCircleIcon />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default SurakshaChoice;
