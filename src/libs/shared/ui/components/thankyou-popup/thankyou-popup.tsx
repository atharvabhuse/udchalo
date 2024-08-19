import { Dialog, DialogTitle, Button, SwipeableDrawer } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import CloseButton from '@uc/assets/images/closeButton.svg';
import { styled } from '@mui/system';
import styles from './thankyou-popup.module.scss';
// import { makeStyles } from '@mui/styles';

export interface ThankyouPopupProps {
  popupDetails: {
    icon: ReactNode;
    heading: string;
    desc: string;
    btnLink1: string;
    btnLink2: string;
    note: boolean;
    dimentions: {
      width: string;
      height: string;
    };
    closeButtonFixedPosition: {
      top: string;
      right: string;
    };
  };
  close: number;
  children: ReactNode;
}

export function ThankyouPopup(props: ThankyouPopupProps) {
  const { popupDetails, close, children } = props;
  const [open, setOpen] = useState(false);

  const dialogPaperStyle = {
    width: popupDetails?.dimentions?.width,
    height: popupDetails?.dimentions?.height,
    maxWidth: '1400px',
    maxHeight: '800px',
    borderRadius: '16px',
    padding: '20px 20px 0px 20px',
    display: 'flex',
    justifyContent: 'center',
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'fixed',
    right: popupDetails?.closeButtonFixedPosition?.right,
    top: popupDetails?.closeButtonFixedPosition?.top,
    cursor: 'pointer',
  };

  const closeClickHandler = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (popupDetails !== undefined) {
      setOpen(true);
    }
  }, [popupDetails]);

  useEffect(() => {
    setOpen(false);
  }, [close]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeHandler = () => {
    setOpen(false);
  };

  const openHandler = () => {
    setOpen(true);
  };
  
  const MUIDIV = styled('div')({});

  const classes = {
    swiper_drawer_content: {
      borderTopLeftRadius: '2rem',
      borderTopRightRadius: '2rem',
      padding: '1rem',
      backgroundColor: 'white',
    },
  };

  return (
    <div className={styles.thankyouPopup}>
      {window.innerWidth > 600 ? (
        <Dialog
          open={open}
          onClose={() => setOpen(true)}
          PaperProps={{
            style: dialogPaperStyle,
          }}>
          <CloseButton onClick={closeClickHandler} style={closeButtonStyle} />
          {children}
        </Dialog>
      ) : (
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={closeHandler}
          onOpen={openHandler}
          PaperProps={{ style: { backgroundColor: 'transparent' } }}>
          <MUIDIV sx={classes.swiper_drawer_content}>{children}</MUIDIV>
        </SwipeableDrawer>
      )}
    </div>
  );
}

export default ThankyouPopup;
