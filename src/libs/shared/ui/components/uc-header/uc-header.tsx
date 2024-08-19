import { usePathname } from 'next/navigation';
import {
  BusesIcon,
  FlightsIcon,
  HeaderProfilePopover,
  HolidaysIcon,
  HotelsIcon,
  LeftArrowIcon,
  NotificationIcon,
  ProfileIcon,
  SettingIcon,
  SupportIcon,
  TrainsIcon,
  WalletIcon,
  useSharedAppStateContext,
} from '@uc/libs/shared/ui';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import {
  useLogout,
  useGetUserProfileV2,
  useGetBalance,
  GetProfileV2Response,
  useGetRewardTransactions,
  retrieveAndDecryptFromLocalStorage,
  retrieveFromLocalStorage,
  Variant,
} from '@uc/services/network';
import { Avatar } from '@mui/material';
import { UDCHALO_TOKEN } from '@uc/utils/constants';
import UserSignUp from '../user-sign-up/user-sign-up';
import { UcBodyPortal } from '../uc-body-portal/uc-body-portal';
import { RouteNavigation } from '../route-navigation/route-navigation';
import styles from './uc-header.module.scss';
import { UcHeaderContext } from '../../contexts/uc-header.context';
import { useNotificationContextProvider } from '../../contexts/notification.context';
import { infoMessage, successMessage } from '../Notification/notification.constant';

/* eslint-disable-next-line */
export interface UcHeaderProps {
  selectedTab: any;
}

export function UcHeader({ selectedTab }: UcHeaderProps) {
  const context = useContext(UcHeaderContext);
  const selectedTabVar = context?.selectedTab || '';

  const [isLogOut, setIsLogOut] = useState(false);
  const { userData, setUserData, checkAuthentication, resetCheckAuthentication, resetAppState } =
    useSharedAppStateContext();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window?.innerWidth <= 767);
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoginBtnClicked, setLoginBtnClicked] = useState(false);
  const [isLoginBtnHover, setLoginBtnHover] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const ucToken = retrieveFromLocalStorage(UDCHALO_TOKEN);
    if (ucToken) {
      setLocalStorageLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Update isMobile when the window is resized
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { data: profileResponse, refetch: getUserProfileV2 }: any = useGetUserProfileV2({
    enabled: localStorageLoaded,
  });

  const { data: balanceData, refetch: refetchBalance }: any = useGetBalance({
    enabled: localStorageLoaded,
  });

  const { data: rewardTransactionsData, refetch: refetchRewardTransactions }: any = useGetRewardTransactions({
    enabled: localStorageLoaded,
  });

  const onLoginSuccess = () => {
    if (profileResponse) {
      const profileData: GetProfileV2Response = profileResponse.data;
      if (profileData?.response) {
        setUserData(profileData.response);
      }
      setIsUserLoggedIn(true);
    }
  };

  useEffect(onLoginSuccess, [profileResponse]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onLoginClick = () => {
    if (!isLoginBtnClicked) {
      setLoginBtnClicked(true);
    }
  };

  useEffect(() => {
    if (!retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN) && checkAuthentication) {
      onLoginClick();
    }
  }, [checkAuthentication]);

  const onMouseOver = () => {
    setLoginBtnHover(true);
  };

  const onMouseOut = () => {
    setLoginBtnHover(false);
  };

  const onCloseIconClick = () => {
    setLoginBtnClicked(false);
    resetCheckAuthentication();
  };

  const retrieveLoggedInUserDetails = () => {
    getUserProfileV2();
    refetchBalance();
    refetchRewardTransactions();
  };

  const routeName = usePathname();

  const logoutCall = useLogout();

  const logoutHandler = () => {
    logoutCall.mutate(undefined, {
      onSuccess(data, variables, contextVar) {
        localStorage.clear();
        resetAppState();
        setIsLogOut(false);
        setAnchorEl(null);
        setIsUserLoggedIn(false);
        alert('log out successfully');
      },
      onError(error, variables, contextVar) {
        alert('log out failed');
      },
    });
  };

  const onSetOverlayForMenu = () => {
    setIsLogOut(true);
  };
  const { sendNotification } = useNotificationContextProvider();
  const intentionalNotificationHandler = () => {
    sendNotification({ info: infoMessage.message, variant: infoMessage.type as Variant, autoHideDuration: 3000 });
    sendNotification({ info: successMessage.message, variant: successMessage.type as Variant, autoHideDuration: 3000 });
  };

  return (
    <div className={styles.header_container}>
      <div className={styles.modal_box}>
        {isLoginBtnClicked && (
          <UcBodyPortal>
            <UserSignUp
              closeBtnClick={onCloseIconClick}
              retrieveLoggedInUserDetails={retrieveLoggedInUserDetails}
              setOverlayForMenu={onSetOverlayForMenu}
            />
          </UcBodyPortal>
        )}
      </div>

      {false && isLogOut && isLoginBtnHover && (
        <div className={styles.modal_box}>
          <div className={styles.logout_info}>
            <div className={styles.logout_info_data} onMouseEnter={onMouseOver} onMouseLeave={onMouseOut}>
              <button type="button" className={styles.logout_info_button} onClick={logoutHandler}>
                Log out
              </button>
            </div>
          </div>
          <UcBodyPortal />
        </div>
      )}

      <div className={styles.desktop_header}>
        <div className={styles.top_header_container}>
          <div className={styles.left}>
            <MenuIcon className={styles.header_menu_hamburger} onClick={handleClick} />
            <a className={styles.icon} href="/" />
          </div>
          <div className={styles.center}>
            <a href="#travel" className={`${styles.navLink} ${styles.active}`} aria-label="Travel">
              Travel
            </a>
            <span
              className={styles.navLink}
              role="button"
              tabIndex={0}
              onClick={intentionalNotificationHandler}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  intentionalNotificationHandler();
                }
              }}>
              Electronics
            </span>
            <a href="#finance" className={styles.navLink}>
              Finance
            </a>
            <a href="#housing" className={styles.navLink}>
              Housing
            </a>
          </div>
          <div className={styles.right}>
            <div className={styles.profile}>
              <span className={styles.notification_icon}>
                <NotificationIcon title="NotificationIcon" />
              </span>
              {!isUserLoggedIn && (
                <>
                  <span className={styles.profile_icon}>
                    <ProfileIcon title="ProfileIcon" />
                  </span>
                  <button
                    type="button"
                    className={styles.login_text}
                    onClick={onLoginClick}
                    onMouseEnter={onMouseOver}
                    onMouseLeave={onMouseOut}>
                    Log In
                  </button>
                </>
              )}
              {isUserLoggedIn && (
                <div className={styles.header_profile_info_container}>
                  <Avatar alt="Profile Picture" src={userData?.upLoads?.profilePicUrl} className={styles.profilePic} />
                  <div
                    className={styles.header_profile_name_container}
                    onClick={handleClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleClick(e);
                      }
                    }}>
                    <span className={styles.login_text}>{userData?.name?.firstName}</span>
                    <KeyboardArrowDownOutlinedIcon className={styles.login_text} />
                    <div className={styles.header_profile_balance}>
                      <WalletIcon />
                      <div>{balanceData?.data?.response?.balance}</div>
                    </div>
                  </div>
                </div>
              )}
              <HeaderProfilePopover
                anchorEl={anchorEl}
                handleClose={handleClose}
                logoutHandler={logoutHandler}
                open={open}
                balanceData={balanceData}
                rewardTransactionsData={rewardTransactionsData}
              />
            </div>
          </div>
        </div>

        {routeName.split('/').length > 2 ? (
          <RouteNavigation selectedTab={selectedTabVar} />
        ) : (
          <div className={styles.sub_header_container}>
            <div className={styles.sub_header_item}>
              <div className={`${styles.sub_header_icon_text} ${routeName === '/flights' ? styles.border_active : ''}`}>
                <span>
                  <FlightsIcon />
                </span>
                <div className={styles.sub_header_text}>
                  <Link className={`${routeName === '/flights' ? styles.active : ''}`} href="/flights">
                    Flights
                  </Link>
                </div>
              </div>
              <div className={styles.sub_header_item}>
                <div className={styles.sub_header_icon_text}>
                  <span>
                    <TrainsIcon />
                  </span>
                  <div className={styles.sub_header_text}>Trains</div>
                </div>
              </div>
              <div className={styles.sub_header_item}>
                <div className={styles.sub_header_icon_text}>
                  <span>
                    <HotelsIcon />
                  </span>
                  <div className={styles.sub_header_text}>Hotels</div>
                </div>
              </div>
              <div className={styles.sub_header_item}>
                <div className={`${styles.sub_header_icon_text} ${routeName === '/buses' ? styles.border_active : ''}`}>
                  <span>
                    <BusesIcon />
                  </span>
                  <div className={styles.sub_header_text}>
                    <Link className={`${routeName === '/buses' ? styles.active : ''}`} href="/buses">
                      Buses
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.sub_header_item}>
                <div className={styles.sub_header_icon_text}>
                  <span>
                    <HolidaysIcon />
                  </span>
                  <div className={styles.sub_header_text}>Holidays</div>
                </div>
              </div>
              <div className={styles.sub_header_item}>
                <div className={styles.sub_header_icon_text}>
                  <span>
                    <SupportIcon />
                  </span>
                  <div className={styles.sub_header_text}>Support</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.mobile_search_header}>
        <div className={styles.search_header_column}>
          <div className={styles.search_text_section}>
            <span>
              <LeftArrowIcon className={styles.search_icon} />
            </span>
            <div className={styles.search_text}>Search</div>
          </div>
          <div className={styles.support_text_section}>
            <span>
              <SettingIcon className={styles.support_icon} />
            </span>
            <div className={styles.support_text}>Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UcHeader;
