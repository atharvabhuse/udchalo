import Link from 'next/link';
import { Popover, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';

import {
  BuddyInviteIcon,
  CallIcon,
  ContactUsIcon,
  ContactUsWhatsappIcon,
  MailIcon,
  MyProfileIcon,
  MyBookingsIcon,
  NodalOfficeIcon,
  UcEarningsIcon,
  LogOutIcon,
} from '@uc/libs/shared/ui';

import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import styles from './header-profile-popover.module.scss';

export interface HeaderProfilePopoverProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  logoutHandler: () => void;
  balanceData: any;
  rewardTransactionsData: any;
}

export function HeaderProfilePopover(props: HeaderProfilePopoverProps) {
  const { anchorEl, open, handleClose, balanceData, rewardTransactionsData, logoutHandler } = props;

  const id = open ? 'header-profile-popover' : undefined;

  const connectOnWhatsapp = (phoneNumber: string) => {
    window.open(`https://wa.me/${phoneNumber}`);
  };

  const openDialer = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_blank');
  };

  const sendEmail = (emailId: string) => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${emailId}`);
  };
  const sx = { minWidth: '40px' };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      slotProps={{
        paper: {
          style: { width: 350 },
        },
      }}>
      <List>
        <Link onClick={handleClose} href="/user/profile">
          <ListItem component="div" className={styles.list_item_style}>
            <ListItemIcon sx={sx}>
              <MyProfileIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" secondary="Edit Profile, Manage Travelers, Payments, Notifications" />
            <ChevronRightOutlinedIcon className={styles.rightOutlinedIcon} />
          </ListItem>
        </Link>
        <Divider />
        <Link onClick={handleClose} href="/user/bookings">
          <ListItem component="div" className={styles.list_item_style}>
            <ListItemIcon sx={sx}>
              <MyBookingsIcon />
            </ListItemIcon>
            <ListItemText primary="My Bookings" secondary="View and Manage Bookings" />
            <ChevronRightOutlinedIcon className={styles.rightOutlinedIcon} />
          </ListItem>
        </Link>
        <Divider />
        <Link onClick={handleClose} href="/user/earnings">
          <ListItem component="div" className={styles.list_item_style}>
            <ListItemIcon sx={sx}>
              <UcEarningsIcon />
            </ListItemIcon>
            <ListItemText
              primary="UC Earnings"
              secondary={
                <>
                  <div>udChalo Credits: ₹{balanceData?.data?.response?.balance}</div>
                  <div>
                    udChalo Coins:
                    {rewardTransactionsData?.data?.response?.currentBalance}
                  </div>
                </>
              }
            />
            <ChevronRightOutlinedIcon className={styles.rightOutlinedIcon} />
          </ListItem>
        </Link>
        <Divider />
        <Link onClick={handleClose} href="/user/buddy-invite">
          <ListItem component="div" className={styles.list_item_style}>
            <ListItemIcon sx={sx}>
              <BuddyInviteIcon />
            </ListItemIcon>
            <ListItemText
              primary="Buddy Invite"
              secondary={<div>Refer your friends for exclusive perks, and unbeatable discout</div>}
            />
            <ChevronRightOutlinedIcon className={styles.rightOutlinedIcon} />
          </ListItem>
        </Link>
        <Divider />
        <Link onClick={handleClose} href="">
          <ListItem component="div" className={styles.list_item_style}>
            <ListItemIcon sx={sx}>
              <ContactUsIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
          </ListItem>
        </Link>
        <div className={styles.contact_us_box}>
          <div>For General Queries, you can contact us on</div>
          <div className={styles.contact_container}>
            <CallIcon />
            <button type='button' className={styles.contact_detail_text} onClick={() => openDialer('+918408833030')}>
              +91 8408833030
            </button>
          </div>
          <div className={styles.contact_container}>
            <ContactUsWhatsappIcon />
            <button type='button' className={styles.contact_detail_text} onClick={() => connectOnWhatsapp('+919272203030')}>
              +91 9272203030
            </button>
          </div>
          <div className={styles.contact_container}>
            <MailIcon />
            <button type='button' className={styles.contact_detail_text} onClick={() => sendEmail('customercare@udchalo.com')}>
              customercare@udchalo.com
            </button>
          </div>
        </div>
        <Divider />
        <Link onClick={handleClose} href="">
          <ListItem component="div" className={styles.list_item_style}>
            <ListItemIcon sx={sx}>
              <NodalOfficeIcon />
            </ListItemIcon>
            <ListItemText primary="udChalo Nodal Offices" secondary="View Nodal offices details" />
            <ChevronRightOutlinedIcon className={styles.rightOutlinedIcon} />
          </ListItem>
        </Link>
        <div className={styles.log_out_button_container}>
          <button type='button' className={styles.log_out_button_component} onClick={logoutHandler}>
            <LogOutIcon />
            Log Out
          </button>
        </div>
      </List>
    </Popover>
  );
}

export default HeaderProfilePopover;
