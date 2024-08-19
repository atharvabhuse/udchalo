import { Button, IconButton, Modal, Paper, Radio, RadioGroup } from '@mui/material';
import {
  CloseIcon,
  HeaderBannerIndianAirforceIcon,
  HeaderBannerIndianArmedForceIcon,
  HeaderBannerIndianArmyIcon,
  HeaderBannerIndianCoastGuardIcon,
  HeaderBannerIndianNavyIcon,
  HeaderBannerProudIndianIcon,
} from '@uc/assets/images';
import { useState } from 'react';
import styles from './select-header-banner--modal.module.scss';
import { MyProfileConstants } from '../my-profile/my-profile.constants';

/* eslint-disable-next-line */
export interface SelectHeaderBannerModalProps {
  open: boolean;
  handleOkClick?: (event: any) => void;
  handleClose?: (event: any) => void;
}

export function SelectHeaderBannerModal({ open, handleOkClick, handleClose }: SelectHeaderBannerModalProps) {
  const [selectedValue, setSelectedValue] = useState('');
  const handleModalClick = (e: any) => {
    e.stopPropagation();
  };

  const handlePatternSelectionChange = (e: any) => {
    if (e?.target?.value) {
      setSelectedValue(e.target.value);
    }
  };

  const getIcon = (defenceType: string) => {
    switch (defenceType) {
      case 'Proud Indian':
        return <HeaderBannerProudIndianIcon />;
      case 'Indian Armed forces':
        return <HeaderBannerIndianArmedForceIcon />;
      case 'Indian Army':
        return <HeaderBannerIndianArmyIcon />;
      case 'Indian Navy':
        return <HeaderBannerIndianNavyIcon />;
      case 'Indian Airforce':
        return <HeaderBannerIndianAirforceIcon />;
      case 'Indian Coast Guards':
        return <HeaderBannerIndianCoastGuardIcon />;
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={handleClose} className={styles.select_header_banner_modal}>
      <div className={styles.modal_content} onClick={handleModalClick}>
        <div className={styles.close_btn}>
          <CloseIcon onClick={handleClose} width={27} height={25} />
        </div>
        <Paper className={styles.paper}>
          <div className={styles.select_pattern_title}>Select Pattern</div>
          <div className={styles.pattern_options_panel}>
            <RadioGroup name="use-radio-group" onChange={handlePatternSelectionChange} value={selectedValue}>
              {MyProfileConstants.DEFENCE_SERVICE_BANNERS.map((defenceService, index) => (
                <div className={styles.pattern_option}>
                  {getIcon(defenceService.name)}
                  <div>{defenceService.name}</div>
                  <div className={styles.radio_button_container}>
                    <Radio className={styles.radio} value={defenceService.name} />
                  </div>
                </div>
              ))}

              <div className={styles.pattern_option}>
                <HeaderBannerIndianArmedForceIcon />
                <div>Indian Armed forces</div>
                <div className={styles.radio_button_container}>
                  <Radio className={styles.radio} value="second" />
                </div>
              </div>
            </RadioGroup>
          </div>
          <div className={styles.add_traveller_buttons_row}>
            <div className={styles.flex_2}>
              <Button className={styles.cancel_btn} onClick={handleClose} fullWidth>
                No
              </Button>
            </div>
            <div className={styles.flex_2}>
              <Button className={styles.add_traveller_btn} onClick={handleOkClick} fullWidth>
                Yes
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </Modal>
  );
}

export default SelectHeaderBannerModal;
