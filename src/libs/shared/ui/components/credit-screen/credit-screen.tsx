import { ReactNode, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { findIndex, orderBy } from 'lodash-es';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  CreditsTransaction,
  EarningCreditsDataResponse,
  GetBalanceResponse,
  useGetBalance,
  useGetEarningCredits,
  retrieveFromLocalStorage,
} from '@uc/services/network';
import { Button } from '@mui/material';
import {
  CreditBalanceIcon,
  CreditBalanceUpperImage,
  CreditMFlightIcon,
  CreditMHotelIcon,
  CreditMRefundIcon,
  CreditScreenTypeFlightIcon,
  WhatIsUcCreditModal,
} from '@uc/libs/shared/ui';
import { UDCHALO_TOKEN } from '@uc/utils/constants';
import styles from './credit-screen.module.scss';

export interface CreditScreenProps {}

export function CreditScreen(props: CreditScreenProps) {
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
  const [showWhatIsCreditModal, setShowWhatIsCreditModal] = useState(false);
  const [creditsData, setCreditsData] = useState<CreditsTransaction[]>([]);
  const [sortedData, setSortedData] = useState<CreditsTransaction[]>([]);
  const [sortBy, setSortBy] = useState(['createdAt']);
  const [sortDirection, setSortDirection] = useState<Array<'asc' | 'desc'>>(['desc']);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const { data: getCreditsDataResponse, refetch }: any = useGetEarningCredits({
    enabled: !!localStorageLoaded,
  });

  const { data: getBalanceDataResponse, refetch: refetchBalance }: any = useGetBalance({
    enabled: !!localStorageLoaded,
  });

  useEffect(() => {
    const ucToken = retrieveFromLocalStorage(UDCHALO_TOKEN);
    if (ucToken) {
      setLocalStorageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (getCreditsDataResponse) {
      const creditsDataResponse: EarningCreditsDataResponse = getCreditsDataResponse.data;
      if (creditsDataResponse.success) {
        setCreditsData(creditsDataResponse.response.transactions);
        setSortedData(creditsDataResponse.response.transactions);
      }
    }
  }, [getCreditsDataResponse]);

  useEffect(() => {
    if (getBalanceDataResponse) {
      const balanceDataResponse: GetBalanceResponse = getBalanceDataResponse.data;
      if (balanceDataResponse.success) {
        setBalanceAmount(balanceDataResponse.response.balance);
      }
    }
  }, [getBalanceDataResponse]);

  useEffect(() => {
    setSortedData(orderBy(creditsData, sortBy, sortDirection));
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

  const handleModalClose = () => {
    setShowWhatIsCreditModal(false);
  };

  function renderServiceCell(row: CreditsTransaction): ReactNode {
    return (
      <div className={styles.service_type_cell}>
        <CreditScreenTypeFlightIcon />
        <div className={styles.service_type_info_container}>
          <div className={styles.service_type_text}>{row.type}</div>
          {row.crDr === 'cr' && <div className={styles.service_amount_credit}>{`+ ${row.amount}`}</div>}
          {row.crDr === 'dr' && <div className={styles.service_amount_debit}>{`- ${row.amount}`}</div>}
        </div>
      </div>
    );
  }

  function renderTextCell(dataValue: any, rowIndex: number): ReactNode {
    return <div className={styles.text_cell}>{dataValue}</div>;
  }

  const renderTransactionTypeImage = (type: string) => {
    let returnElement;

    switch (type) {
      case 'flight':
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

    return (
      <div className={styles.transaction_type_container}>
        {returnElement}
        <span className={styles.transaction_type}>{type}</span>
      </div>
    );
  };

  const renderTransactionCard = (dataValue: any, rowIndex: number) => {
    const isEven = rowIndex % 2 === 0;
    return (
      <div className={isEven ? styles.transaction_card_even : styles.transaction_card_odd}>
        <div className={styles.first_row}>
          {renderTransactionTypeImage(dataValue.type)}
          {false && <div className={styles.transaction_type}>{dataValue.type}</div>}
          <div>
            <div className={styles.card_heading}>Amount</div>
            {dataValue.crDr === 'cr' && <div className={styles.service_amount_credit}>{`+ ${dataValue.amount}`}</div>}
            {dataValue.crDr === 'dr' && <div className={styles.service_amount_debit}>{`- ${dataValue.amount}`}</div>}
          </div>
          <div className={styles.last_item}>
            <div className={styles.card_heading}>Balance</div>
            <div className={styles.amount_text}>₹{dataValue.currentBalance}</div>
          </div>
        </div>
        <div className={styles.detail_row}>
          <div className={styles.item}>
            <div className={styles.card_heading}>Booking ID</div>
            <div className={styles.value_text}>{dataValue.referenceId}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.card_heading}>Date of Transaction</div>
            <div className={styles.value_text}>{dayjs(dataValue.createdAt).format('DD MMM YYYY')}</div>
          </div>
        </div>
        <div className={styles.detail_row}>
          <div className={styles.item}>
            <div className={styles.card_heading}>Reference Details</div>
            <div className={styles.value_text}>{dataValue.referenceId}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.card_heading}>Transaction ID</div>
            <div className={styles.value_text}>{dataValue.transactionId}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderTableRowsForWebView = () => (
    <div className={styles.table_web_view}>
      {sortedData?.map((row, rowIndex) => (
        <div className={rowIndex % 2 === 0 ? styles.table_row_even : styles.table_row_odd}>
          <div className={styles.body_item_f1}>{renderServiceCell(row)}</div>
          <div className={styles.body_item_f1}>{row.transactionId}</div>
          <div className={styles.body_item_f1}>{row.referenceId}</div>
          <div className={styles.body_item_f1}>{dayjs(row.createdAt).format('DD MMM YYYY')}</div>
          <div className={styles.body_item_f1}>{row.referenceType}</div>
          <div className={styles.body_item_f1}>{row.currentBalance}</div>
        </div>
      ))}
    </div>
  );

  const renderSortDirection = (fieldName: string) => {
    const index = findIndex(sortBy, item => item === fieldName);

    return (
      <div>
        {index > -1 &&
          (sortDirection[index] === 'asc' ? (
            <KeyboardArrowUpIcon className={styles.sort_icon} />
          ) : (
            <KeyboardArrowDownIcon className={styles.sort_icon} />
          ))}
      </div>
    );
  };

  return (
    <div className={styles.credit_screen_container}>
      <div className={styles.credit_screen_web}>
        <div className={styles.creditBalance}>
          <CreditBalanceIcon />
          <div className={styles.credit_balance_amount_section}>
            <div className={styles.main_amount}>₹{balanceAmount}</div>
            <div className={styles.amount_sub_description}>Available Credits</div>
          </div>
        </div>
        <div className={styles.creditBalanceRefundSection}>
          <div>You can request a refund for the credit balance.</div>
          <Button variant="contained" className={styles.refundButton}>{`Refund ₹ ${balanceAmount}`}</Button>
        </div>
        <div className={styles.credit_data_container}>
          <div className={styles.table_header_section}>
            <div className={styles.header_item_f1} onClick={() => changeSortDirection('service')}>
              <span>Services</span>
              {renderSortDirection('service')}
            </div>
            <div className={styles.header_item_f1} onClick={() => changeSortDirection('transactionId')}>
              <span>Transaction ID</span>
              {renderSortDirection('transactionId')}
            </div>
            <div className={styles.header_item_f1} onClick={() => changeSortDirection('referenceId')}>
              <span>Booking ID</span>
              {renderSortDirection('referenceId')}
            </div>
            <div className={styles.header_item_f1} onClick={() => changeSortDirection('createdAt')}>
              <span>Date</span>
              {renderSortDirection('createdAt')}
            </div>
            <div className={styles.header_item_f1} onClick={() => changeSortDirection('referenceType')}>
              <span>Reference Details</span>
              {renderSortDirection('referenceType')}
            </div>
            <div className={styles.header_item_f1} onClick={() => changeSortDirection('currentBalance')}>
              <span>Balance</span>
              {renderSortDirection('currentBalance')}
            </div>
          </div>

          <div className={styles.table_body_section}>{renderTableRowsForWebView()}</div>
        </div>
      </div>
      <div className={styles.credit_screen_msite}>
        <div className={styles.available_credit_section}>
          <div className={styles.upper_section}>
            <div className={styles.item}>
              <CreditBalanceIcon />
            </div>
            <div className={styles.item}>
              <div className={styles.credit_balance_amount_section}>
                <div className={styles.main_amount}>₹{balanceAmount}</div>
                <div className={styles.amount_sub_description}>Available Credits</div>
              </div>
            </div>
            <div className={styles.item}>
              <CreditBalanceUpperImage />
            </div>
          </div>
          <div
            className={styles.description_text}
            onClick={() => {
              setShowWhatIsCreditModal(true);
            }}>
            What is udChalo Credits?
          </div>
          <WhatIsUcCreditModal open={showWhatIsCreditModal} handleClose={handleModalClose} />
        </div>
        <div className={styles.transaction_history_panel}>
          <div className={styles.transaction_header_bar}>
            <div className={styles.header}>Transaction History</div>
            <div className={styles.header}>Sort by</div>
          </div>
          <div className={styles.transaction_details_grid}>
            {sortedData?.map((row, rowIndex) => renderTransactionCard(row, rowIndex))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditScreen;
