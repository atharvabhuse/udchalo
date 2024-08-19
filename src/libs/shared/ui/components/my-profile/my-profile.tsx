import { Tab, Tabs } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import styles from './my-profile.module.scss';
import {EditProfile} from '../edit-profile/edit-profile';
import {UcProfileManageTravelers} from '../uc-profile-manage-travelers/uc-profile-manage-travelers';
import {UcNotificationsSettings} from '../uc-notifications-settings/uc-notifications-settings';
import { MyProfileConstants } from './my-profile.constants';
import {DeleteAccountModal} from '../delete-account-modal/delete-account-modal';

// const useStyles = makeStyles((theme) => ({

//   customTabs: {
//     '& .MuiTabs-indicator': {
//       display: 'none'
//     }
//   },
//   customTab: {
//     background: '#F5F8FB',
//     textTransform: 'none',
//     '&.Mui-selected': {
//       borderBottom: '4px solid #32996A',
//       background: 'white'
//     },

//     '& .MuiTab-wrapper': {
//       alignItems: 'flex-start'
//     }

//   },
// }));

export interface MyProfileProps {
  handleSubModuleChange: (subModule: string) => void;
}

export function MyProfile(props: MyProfileProps) {
  // const classes = useStyles();
  const classes = {
    customTabs: {
      '& .MuiTabs-indicator': {
        display: 'none',
      },
    },
    customTab: {
      background: '#F5F8FB',
      textTransform: 'none',
      '&.Mui-selected': {
        borderBottom: '4px solid #32996A',
        background: 'white',
      },

      '& .MuiTab-wrapper': {
        alignItems: 'flex-start',
      },
    },
  };

  const { handleSubModuleChange } = props;
  const [tabValue, setTabValue] = useState(0);
  const [isReadyToRender, setIsReadyToRender] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  useEffect(() => {
    setIsReadyToRender(true);
  }, []);

  const handleTabChange = (_event: any, newValue: number) => {
    if (newValue === 3) {
      setShowDeleteAccountModal(true);
    } else {
      setTabValue(newValue);
      handleSubModuleChange(MyProfileConstants.TABS[newValue]);
    }
  };

  const handleDeletModalClose = () => {
    setShowDeleteAccountModal(false);
  };

  const handleDeleteOkClick = () => {
    // TO DO :: CALL API TO Delete the user account and logout handling
    setShowDeleteAccountModal(false);
  };

  return (
    <div className={styles.profile_container}>
      {isReadyToRender && (
        <div className={styles.profile_wrapper}>
          <div className={styles.sub_heading}>My Profile</div>

          <div className={styles.flex_container}>
            <div className={styles.side_panel}>
              <Tabs
                value={tabValue}
                orientation="vertical"
                onChange={handleTabChange}
                sx={{ root: classes.customTabs }}>
                {MyProfileConstants.TABS.map((tabName, index) => (
                  <Tab key={tabName} label={tabName} sx={{ root: classes.customTab }} />
                ))}
              </Tabs>
            </div>
            <div className={styles.main_panel}>
              {tabValue === 0 && <EditProfile />}
              {tabValue === 1 && (
                <UcProfileManageTravelers dispatch={null} clickableCallback={null} totalTravelers={3} />
              )}
              {tabValue === 2 && <UcNotificationsSettings />}
              <DeleteAccountModal
                open={showDeleteAccountModal}
                handleClose={handleDeletModalClose}
                handleOkClick={handleDeleteOkClick}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
