"use client"

 import React, { useState } from 'react';
 import CloseIcon from '@uc/assets/images/fareDrop_close_Icon.svg';
 import FlightIcon from '@uc/assets/images/fareDrop_icon.svg'
 import { IconButton, Typography } from '@mui/material';
import styles from './fare-drop-popup.module.scss';



export interface FareDropInfoProps {
  title: string;
  message: string;
}

function FareDropPopup(props: FareDropInfoProps) {
  const { title, message } = props;
  const [dialogueOpen, setDialogueOpen] = useState(true);

  const handleCloseDialogue = () => {
    setDialogueOpen(false);
  };

  return (
    <div>
      {dialogueOpen && (
        <div className={styles.faredrop_container}>
          <IconButton onClick={handleCloseDialogue} className={styles.close_button}>
            <CloseIcon />
          </IconButton>
          <div className={styles.fare_drop}>
            <div className={styles.text_container}>
              <Typography variant="body1">
                <div className={styles.icon_and_title}>
                  <FlightIcon />
                  <span className={styles.title}>{title}</span>
                </div>
              </Typography>
              <Typography variant="body1" className={styles.text}>
                {message}
              </Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FareDropPopup;
