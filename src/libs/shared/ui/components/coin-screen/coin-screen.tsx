import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { findIndex, orderBy } from 'lodash-es';
import {
  CoinRewardsTransaction,
  EarningCoinRewardsDataResponse,
  useGetRewardTransactions,
  retrieveFromLocalStorage,
} from '@uc/services/network';
import { CreditCoinBalanceIcon, CreditMFlightIcon, CreditMHotelIcon, CreditMRefundIcon } from '@uc/libs/shared/ui';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { UDCHALO_TOKEN } from '@uc/utils/constants';
import styles from './coin-screen.module.scss';

export interface CoinScreenProps {}

export function CoinScreen(props: CoinScreenProps) {
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
  const [coinRewardsTransactionData, setCoinRewardsTransactionData] = useState<CoinRewardsTransaction[]>([]);
  const [sortedData, setSortedData] = useState<CoinRewardsTransaction[]>([]);
  const [sortBy, setSortBy] = useState(['transactionDate']);
  const [sortDirection, setSortDirection] = useState<Array<'asc' | 'desc'>>(['desc']);
  const [currentBalanceAmount, setCurrentBalanceAmount] = useState(0);
  const [totalRewardEarned, setTotalRewardEarned] = useState(0);
  const { data: getRewardTransactionsDataResponse, refetch }: any = useGetRewardTransactions({
    enabled: !!localStorageLoaded,
  });

  useEffect(() => {
    const ucToken = retrieveFromLocalStorage(UDCHALO_TOKEN);
    if (ucToken) {
      setLocalStorageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (getRewardTransactionsDataResponse) {
      const creditsDataResponse: EarningCoinRewardsDataResponse = getRewardTransactionsDataResponse.data;
      if (creditsDataResponse.success) {
        setCoinRewardsTransactionData(creditsDataResponse.response.userTransactions);
        setSortedData(orderBy(creditsDataResponse.response.userTransactions, sortBy, sortDirection));
        setTotalRewardEarned(creditsDataResponse.response.totalRewardEarned);
        setCurrentBalanceAmount(creditsDataResponse.response.currentBalance);
      }
    }
  }, [getRewardTransactionsDataResponse]);

  useEffect(() => {
    setSortedData(orderBy(coinRewardsTransactionData, sortBy, sortDirection));
  }, [sortDirection]);

  const changeSortDirection = (sortByField: string) => {
    const index = findIndex(sortBy, item => item === sortByField);
    if (index > -1) {
      setSortDirection(sortDirection => {
        let newSortOrder = [...sortDirection];
        if (newSortOrder[index] === 'asc') {
          newSortOrder[index] = 'desc';
        } else {
          setSortBy(sortBy => [...sortBy.slice(0, index), ...sortBy.slice(index + 1)]);
          newSortOrder = [...sortDirection.slice(0, index), ...sortDirection.slice(index + 1)];
        }
        return newSortOrder;
      });
    } else {
      setSortBy([...sortBy, sortByField]);
      setSortDirection([...sortDirection, 'asc']);
    }
  };

  const renderTransactionTypeImage = (type: string) => {
    let returnElement;

    switch (type) {
      case 'flights':
        returnElement = <CreditMFlightIcon />;
        break;
      case 'hotel':
        returnElement = <CreditMHotelIcon />;
        break;
      case 'refund':
        returnElement = <CreditMRefundIcon />;
        break;
      default:
        returnElement = <CreditMFlightIcon />;
    }

    return returnElement;
  };

  const renderTableRowsForMSite = () => (
    <div className={styles.table_m_view}>
      {sortedData?.map((row, rowIndex) => (
        <div
          className={
            row.isExpired
              ? rowIndex % 2 === 0
                ? styles.table_row_expired_even
                : styles.table_row_expired_odd
              : rowIndex % 2 === 0
                ? styles.table_row_even
                : styles.table_row_odd
          }>
          <div className={styles.upper_part}>
            <div style={{ display: 'flex', gap: '5px' }}>
              {renderTransactionTypeImage(row.service)}
              <div>
                <div className={styles.main_text}>
                  {row.bookingAmount} {row.service}
                </div>
                <div>
                  <span className={styles.normal_text}>Reference ID: </span>
                  <span className={styles.main_text}>{row.transactionId}</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              {row.isUsed ? (
                <div className={styles.reward_cell}>
                  <div>Used</div>
                  <div className={styles.negative_reward}>-{row.reward}</div>
                </div>
              ) : (
                <div className={styles.reward_cell}>
                  <div>Earned</div>
                  <div className={styles.positive_reward}>+{row.reward}</div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.upper_part}>
            <div className={styles.normal_text}>{dayjs(row.transactionDate).format('DD MMM YYYY')}</div>
            <div className={styles.expiry_date}>
              {row.isExpired ? 'Expired' : `Valid till: ${dayjs(row.expiry).format('DD MMM YYYY')}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableRowsForWebView = () => (
    <div className={styles.table_web_view}>
      {sortedData?.map((row, rowIndex) => (
        <div
          className={
            row.isExpired
              ? rowIndex % 2 === 0
                ? styles.table_row_expired_even
                : styles.table_row_expired_odd
              : rowIndex % 2 === 0
                ? styles.table_row_even
                : styles.table_row_odd
          }>
          <div className={styles.body_item_f1}>
            {renderTransactionTypeImage(row.service)}
            <div className={styles.service_details_cell}>
              <div className={styles.service_name}>{row.service}</div>
              <div className={styles.amount}>₹{row.bookingAmount}</div>
            </div>
          </div>
          <div className={styles.body_item_f1}>{row.transactionId}</div>
          <div className={styles.body_item_f1}>{row.bookingId}</div>
          <div className={styles.body_item_f1}>{dayjs(row.transactionDate).format('DD MMM YYYY')}</div>
          <div className={styles.body_item_f1}>{row.remark}</div>
          <div className={styles.body_item_f1}>
            {row.isUsed ? (
              <div className={styles.reward_cell}>
                <div className={styles.negative_reward}>-{row.reward}</div>
                <div>Used</div>
              </div>
            ) : (
              <div className={styles.reward_cell}>
                <div className={styles.positive_reward}>+{row.reward}</div>
                <div>Earned</div>
              </div>
            )}
          </div>
          <div className={styles.body_item_f1}>
            <span className={styles.expiry_date}>
              {row.isExpired ? 'Expired' : dayjs(row.expiry).format('DD MMM YYYY')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSortDirection = (fieldName: string) => {
    const index = findIndex(sortBy, item => item === fieldName);

    return (
      <>
        {index > -1 ? (
          sortDirection[index] === 'asc' ? (
            <KeyboardArrowUpIcon className={styles.sort_icon} />
          ) : (
            <KeyboardArrowDownIcon className={styles.sort_icon} />
          )
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <div>
      <div className={styles.credit_balance_section}>
        <div className={styles.credit_balance_upper_section}>
          <div className={styles.creditBalance}>
            <CreditCoinBalanceIcon />
            <div className={styles.creditBalanceAmountSection}>
              <div className={styles.main_amount}>₹{totalRewardEarned}</div>
              <div className={styles.amount_sub_description}>Earned Till Date</div>
            </div>
          </div>
          <div className={styles.creditBalance}>
            <div className={styles.creditBalanceAmountSection}>
              <div className={styles.main_amount}>₹{currentBalanceAmount}</div>
              <div className={styles.amount_sub_description}>Balance</div>
            </div>
          </div>
        </div>
        <div className={styles.credit_balance_lower_section}>What is udChalo Coins?</div>
      </div>

      <div className={styles.data_table_container}>
        <div className={styles.sort_bar}>
          <div>Transaction History</div>
          <div>Sort by</div>
        </div>
        <div className={styles.table_header_section}>
          <div className={styles.header_item_f1} onClick={() => changeSortDirection('service')}>
            <span>Services</span>
            {renderSortDirection('service')}
          </div>
          <div className={styles.header_item_f1} onClick={() => changeSortDirection('transactionId')}>
            <span>Transaction ID</span>
            {renderSortDirection('transactionId')}
          </div>
          <div className={styles.header_item_f1} onClick={() => changeSortDirection('bookingId')}>
            <span>Booking ID</span>
            {renderSortDirection('bookingId')}
          </div>
          <div className={styles.header_item_f1} onClick={() => changeSortDirection('transactionDate')}>
            <span>Date</span>
            {renderSortDirection('transactionDate')}
          </div>
          <div className={styles.header_item_f1} onClick={() => changeSortDirection('remark')}>
            <span>Reference Details</span>
            {renderSortDirection('remark')}
          </div>
          <div className={styles.header_item_f1} onClick={() => changeSortDirection('reward')}>
            <span>Rewards</span>
            {renderSortDirection('reward')}
          </div>
          <div className={styles.header_item_f1} onClick={() => changeSortDirection('expiry')}>
            <span>Validity</span>
            {renderSortDirection('expiry')}
          </div>
        </div>
        <div className={styles.table_body_section}>
          {renderTableRowsForWebView()}
          {renderTableRowsForMSite()}
        </div>
      </div>
    </div>
  );
}

export default CoinScreen;
