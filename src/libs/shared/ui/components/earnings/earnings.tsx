import { useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { EarningInfoIcon1, EarningInfoIcon2, EarningInfoIcon3 } from '@uc/libs/shared/ui';
import styles from './earnings.module.scss';
// import { makeStyles } from '@mui/styles';
import { EarningsConstants } from './earnings.constants';
import {CreditScreen} from '../credit-screen/credit-screen';
import {CoinScreen} from '../coin-screen/coin-screen';

// const useStyles = makeStyles((theme) => ({

//   customTabs: {
//     '& .MuiTabs-indicator': {
//       display: 'none'
//     }
//   },

//   customTab: {
//     color: 'black',
//     background: '#F5F8FB',
//     fontSize: '12px',
//     lineHeight: '20px',
//     textTransform: 'none',

//     '&.Mui-selected': {
//       borderBottom: '4px solid #32996A',
//       background: 'white'
//     },

//     '& .MuiTab-wrapper': {
//       alignItems: 'flex-start'
//     }

//   },
//   customTabMView: {
//     color: '#858585',
//     background: 'white',
//     fontSize: '12px',
//     lineHeight: '20px',
//     textTransform: 'none',
//     width: '50%',

//     '&.Mui-selected': {
//       borderBottom: '2px solid #32996A',
//       color: '#32996A',
//       fontSize: '12px',
//       fontWeight: '600',
//       lineHeight: '16px',
//     },

//     '& .MuiTab-wrapper': {
//       alignItems: 'flex-start'
//     }

//   },
// }));

export interface EarningsProps {}

export function Earnings(props: EarningsProps) {
  // const classes = useStyles();

  const classes = {
    customTabs: {
      '& .MuiTabs-indicator': {
        display: 'none',
      },
    },

    customTab: {
      color: 'black',
      background: '#F5F8FB',
      fontSize: '12px',
      lineHeight: '20px',
      textTransform: 'none',

      '&.Mui-selected': {
        borderBottom: '4px solid #32996A',
        background: 'white',
      },

      '& .MuiTab-wrapper': {
        alignItems: 'flex-start',
      },
    },
    customTabMView: {
      color: '#858585',
      background: 'white',
      fontSize: '12px',
      lineHeight: '20px',
      textTransform: 'none',
      width: '50%',

      '&.Mui-selected': {
        borderBottom: '2px solid #32996A',
        color: '#32996A',
        fontSize: '12px',
        fontWeight: '600',
        lineHeight: '16px',
      },

      '& .MuiTab-wrapper': {
        alignItems: 'flex-start',
      },
    },
  };

  const [tabValue, setTabValue] = useState(0);
  const [isReadyToRender, setIsReadyToRender] = useState(false);

  useEffect(() => {
    setIsReadyToRender(true);
  }, []);

  const handleTabChange = (_event: any, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className={styles.earning_container}>
      <div className={styles.earning_info_container}>
        {tabValue === 0 && <div className={styles.earning_info_title}>What is udChalo Credits</div>}
        {tabValue === 1 && <div className={styles.earning_info_title}>What is udChalo Coins</div>}
        <div className={styles.earning_info_points}>
          {tabValue === 0 && (
            <>
              <div className={styles.element_odd}>
                <EarningInfoIcon1 />
                <span className={styles.element_text}>Contains Failed as well as Refund amounts from trips.</span>
              </div>
              <div className={styles.element_even}>
                <EarningInfoIcon2 />
                <span>Allows you to use to book trips on udChalo.</span>
              </div>
              <div className={styles.element_odd}>
                <EarningInfoIcon3 />
                <span className={styles.element_text}>Can be credited back to your bank account / card anytime.</span>
              </div>
            </>
          )}
          {tabValue === 1 && (
            <>
              <div className={styles.element_odd}>
                <EarningInfoIcon1 />
                <span className={styles.element_text}>Earn as you pay through UPI</span>
              </div>
              <div className={styles.element_even}>
                <EarningInfoIcon2 />
                <span>Use Coins in your next transaction</span>
              </div>
            </>
          )}
        </div>
        {tabValue === 1 && (
          <div className={styles.earning_terms_and_condition}>
            <span>
              View more reasons in
              <span className={styles.terms_conditions_label}>Terms of Use</span>
            </span>
          </div>
        )}
      </div>
      {isReadyToRender && (
        <div className={styles.profile_wrapper}>
          <div className={styles.sub_heading}>UC Earnings</div>
          <div className={styles.m_nav_container}>
            <Tabs
              value={tabValue}
              orientation="horizontal"
              onChange={handleTabChange}
              sx={{ root: classes.customTabs }}>
              {EarningsConstants.TABS.map((tabName, index) => (
                <Tab key={tabName} label={tabName} sx={{ root: classes.customTabMView }} />
              ))}
            </Tabs>
          </div>
          <div className={styles.flex_container}>
            <div className={styles.side_panel}>
              <Tabs
                value={tabValue}
                orientation="vertical"
                onChange={handleTabChange}
                sx={{ root: classes.customTabs }}>
                {EarningsConstants.TABS.map((tabName, index) => (
                  <Tab key={tabName} label={tabName} sx={{ root: classes.customTab }} />
                ))}
              </Tabs>
            </div>
            <div className={styles.main_panel}>
              {tabValue === 0 && <CreditScreen />}
              {tabValue === 1 && <CoinScreen />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Earnings;
