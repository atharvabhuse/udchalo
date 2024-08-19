import Paytm from '@uc/assets/images/paytrm_icon.svg';
import PhonePe from '@uc/assets/images/phonepay_icon.svg';
import Gpay from '@uc/assets/images/gpay_icon.svg';

import UPI from '@uc/assets/images/UPI_icon.svg';
import BuyNow from '@uc/assets/images/buynowpaylater_icon.svg';
import CreditCard from '@uc/assets/images/creditcard_icon.svg';
import NetBanking from '@uc/assets/images/netbanking.svg';
import Wallet from '@uc/assets/images/wallet_icon.svg';

import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import styles from './uc-payments.module.scss';
import {UcFareBreakup} from '../uc-fare-breakup/uc-fare-breakup';
import {UcCarousel} from '../uc-carousel/uc-carousel';

/* eslint-disable-next-line */
export interface UcPaymentsProps {}

export function UcPayments(props: UcPaymentsProps) {
  const creditAndCashReward = [
    {
      heading: 'UdChalo Credits',
      icon: <Gpay />,
      desc: 'Balance ₹1,023',
      info: 'Usable ₹1,023',
    },
    {
      heading: 'UdChalo Coins',
      icon: <Gpay />,
      desc: 'Balance: 500',
      info: 'Usable: 50',
    },
  ];
  const otherOptions = [
    {
      heading: 'UPI',
      desc: 'Google pay, Phonepe, BHIM UPI, Paytm',
      info: 'Get cashback ₹250',
      icon: <UPI />,
    },
    {
      heading: 'Buy Now Pay Later',
      desc: 'Lazypay',
      info: 'Settle payment within 15-20 days @ 0% extra cost',
      icon: <BuyNow />,
    },
    {
      heading: 'Credit/Debit card',
      desc: 'Visa, Mastercard, Pupay & more',
      info: '',
      icon: <CreditCard />,
    },
    {
      heading: 'Net banking',
      desc: 'Pay through your bank',
      info: '',
      icon: <NetBanking />,
    },
    {
      heading: 'Wallet',
      desc: 'Link your wallet & pay',
      info: '',
      icon: <Wallet />,
    },
  ];
  const upiOptions = [
    {
      heading: 'Paytm',
      icon: <Paytm />,
    },
    {
      heading: 'PhonePe',
      icon: <PhonePe />,
    },
    {
      heading: 'Gpay',
      icon: <Gpay />,
    },
  ];

  const savedUPI = [
    {
      heading: 'vikramsingh@okhdfcbank',
      icon: <UPI />,
    },
  ];

  const fareHandler = () => {};

  const bankOfferTemplateContent = [
    {
      desc: 'Get 20% discount using Bank of Baroda cards',
      icon: <Gpay />,
    },
    {
      desc: 'Get 20% discount using ICICI Bank Debit card',
      icon: <Gpay />,
    },
  ];

  const bankOfferTemplate = bankOfferTemplateContent.map(data => (
    <div className={styles.bank_offer_container}>
      <Gpay />
      <div className={styles.bank_offer_desc}>{data.desc}</div>
    </div>
  ));

  return (
    <div className={styles.payments}>
      <div className={styles.timeout_message}>
        This page will timeout in
        <span className={styles.timeout_time}>09:25</span> minutes
      </div>

      <div className={styles.payments_content}>
        <div className={styles.payments_left}>
          <div className={styles.credit_and_cash_reward_container}>
            <p className={styles.credit_and_cash_text}>udChalo Credits and Cash Rewards</p>

            <div className={styles.credit_and_cash_reward_content}>
              {creditAndCashReward.map(data => (
                <div className={styles.credit_and_cash_reward_row}>
                  <div className={styles.credit_and_cash_reward_row_left}>
                    <div className={styles.credit_and_cash_reward_icon}>{data.icon}</div>
                    <div className={styles.credit_and_cash_reward_content}>
                      <div className={styles.credit_and_cash_reward_row_heading}>{data.heading}</div>
                      <div className={styles.credit_and_cash_reward_row_desc}>{data.desc}</div>
                    </div>
                  </div>
                  <div className={styles.credit_and_cash_reward_row_right}>
                    <div className={styles.credit_and_cash_reward_row_info}>{data.info}</div>
                    <input type="checkbox" className={styles.credit_and_cash_reward_checkbox} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.other_options_container}>
            <p className={styles.other_options_text}>Other options</p>

            <div className={styles.other_options_content}>
              <div className={styles.other_options_left}>
                {otherOptions.map(data => (
                  <div className={styles.other_options_left_row}>
                    <div className={styles.other_options_left_icon}>{data.icon}</div>
                    <div className={styles.other_options_left_content}>
                      <div className={styles.other_options_left_heading}>{data.heading}</div>
                      <div className={styles.other_options_left_desc}>{data.desc}</div>
                      <div className={styles.other_options_left_info}>{data.info}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.other_options_right}>
                <p className={styles.saved_options_text}>Saved Options</p>
                {savedUPI.map(data => (
                  <div className={styles.upi_option_row}>
                    <div className={styles.upi_option_row_left}>
                      <div className={styles.upi_option_icon}>{data.icon}</div>
                      <div className={styles.upi_option_row_text}>{data.heading}</div>
                    </div>
                    <div className={styles.upi_option_row_right}>
                      <input type="radio" className={styles.upi_option_row_right_radio} />
                    </div>
                  </div>
                ))}
                <p className={styles.upi_options_text}>UPI Options</p>

                {upiOptions.map(data => (
                  <div className={styles.upi_option_row}>
                    <div className={styles.upi_option_row_left}>
                      <div className={styles.upi_option_icon}>{data.icon}</div>
                      <div className={styles.upi_option_row_text}>{data.heading}</div>
                    </div>
                    <div className={styles.upi_option_row_right}>
                      <input type="radio" className={styles.upi_option_row_right_radio} />
                    </div>
                  </div>
                ))}

                <div className={styles.add_new_upi_id_row}>
                  <button type='button' className={styles.add_new_upi_id}>Add New UPI ID</button>
                </div>
              </div>
            </div>
            <div className={styles.pay_button_row}>
              <div className={styles.pay_button}>Pay ₹12,096</div>
            </div>
          </div>
        </div>
        <div className={styles.payments_right}>
          <Accordion className={styles.payments_accordion}>
            <AccordionSummary className={styles.payments_accordion_summary}>
              <div className={styles.total_fare}>
                <div>Total Fare</div>
                <div>₹15,926</div>
              </div>
            </AccordionSummary>

            <AccordionDetails>
              <UcFareBreakup
                review={undefined}
                discount={undefined}
                fareChangeCallback={fareHandler}
                seatFees={undefined}
                totalFare={undefined}
              />
            </AccordionDetails>
          </Accordion>

          <div className={styles.payment_offers_heading}>Payment Offers</div>

          {/* <UcCarousel
            slides={bankOfferTemplate}
            spaceBetween={0}
            slidesPerView={1}
            showPagination={true}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default UcPayments;
