import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetValidateIFSC } from '@uc/services/network';
import styles from './mode-of-refund.module.scss';

export interface Modes {
  bank: string;
  refundToSource: string;
  wallet: string;
}
export interface modeOfRefundRequiredDetails {
  modes: Modes;
  bookingId: string;
  flightId: string;
  email: string;
  phoneNumber: string;
}
export interface ModeOfRefundProps {
  modeOfRefundRequiredDetails: modeOfRefundRequiredDetails;
  neftFormValidCallback: (arg: boolean) => void;
  neftAddApiCallDataCallback: (arg: any) => void;
  modeOfRefund: (arg: string) => void;
}

function ModeOfRefund({
  modeOfRefundRequiredDetails,
  neftFormValidCallback,
  neftAddApiCallDataCallback,
  modeOfRefund,
}: ModeOfRefundProps) {
  const radioChangeHandler = (e: any) => {
    modeOfRefund(e.target.value);
  };

  const { modes, bookingId, flightId, email, phoneNumber } = modeOfRefundRequiredDetails;

  const form = useForm();
  const {
    register,
    formState: { isValid, errors },
    setValue,
    getValues,
    watch,
  } = form;

  const [neftCheckbox, setNeftCheckbox] = useState(false);

  useEffect(() => {
    if (neftCheckbox && isValid) {
      const data = getValues();

      neftAddApiCallDataCallback({
        accountNumber: data.accountNumber,
        ifscCode: data.IFSCCode,
        bankName: data.bankName,
        accountHolderName: data.accountHolderName,
        emailId: email,
        phoneNumber,
        refundMode: 1,
        bookingId,
        flightId,
        isSurakshaOpted: true,
      });
      neftFormValidCallback(true);
    } else {
      neftFormValidCallback(false);
    }
  }, [isValid, neftCheckbox]);

  const [IFSCCodeInput, setIFSCCodeInput] = useState('');

  const verifyIFSCHandler = (e: any) => {
    e.preventDefault();
    const IFSCCodeInputTemp = getValues('IFSCCode');
    setIFSCCodeInput(IFSCCodeInputTemp);
  };

  const { data: bankName } = useGetValidateIFSC(IFSCCodeInput);

  const accordionStyles = {
    boxShadow: 'none',
    border: '1px solid lightgray',
    borderRadius: '1rem',
    padding: '0.5rem 1rem 1rem 1rem',
    width: '100%',
    marginTop: '1rem',
  };

  useEffect(() => {
    setValue(
      'bankName',
      bankName?.data && bankName?.data.response
        ? `${bankName?.data.response.BANK}, ${bankName?.data.response.BRANCH}, ${bankName?.data.response.STATE}`
        : null
    );
  }, [bankName]);

  const neftCheckboxClickHandler = (e: any) => {
    setNeftCheckbox(e.target.checked);
  };

  return (
    <div className={styles.mode_of_refund_container}>
      <div className={styles.mode_of_refund_header}>Mode of Refund</div>
      <div className={styles.mode_of_refund_desc}>Where do you want us to send the refund</div>

      <div className={styles.detailContainer}>
        <FormControl>
          <RadioGroup onChange={radioChangeHandler}>
            <div className={styles.optionBox}>
              {modes?.refundToSource && (
                <Accordion style={accordionStyles}>
                  <AccordionSummary>
                    <FormControlLabel
                      label="Refund to Source"
                      value="Refund to source"
                      style={{ fontWeight: 600 }}
                      control={<Radio />}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className={styles.requestMessage}>
                      Once your request is approved, the amount will reflect in your source account within 
                      <span className={styles.highlightedMessage}> 5 working days.</span>
                    </div>
                  </AccordionDetails>
                </Accordion>
              )}
            </div>

            <form className={styles.optionBox}>
              {modes?.bank && (
                <Accordion style={accordionStyles}>
                  <AccordionSummary>
                    <FormControlLabel label="NEFT" value="NEFT" control={<Radio />} />
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className={styles.account_information}>Account Information:</div>
                    <div className={styles.account_information_form_container}>
                      <div className={styles.IFSC_row}>
                        <TextField
                          label="IFSC Code"
                          className={styles.form_field_IFSC}
                          {...register('IFSCCode', {
                            required: {
                              value: true,
                              message: 'This is required field',
                            },
                            pattern: {
                              value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                              message: 'Please enter valid IFSC code',
                            },
                          })}
                        />
                        <p className={styles.error_message}>{errors.IFSCCode?.message as string}</p>
                        <button className={styles.verify} onClick={verifyIFSCHandler}>
                          Verify
                        </button>
                      </div>
                      <TextField
                        label="Bank Name"
                        className={styles.form_field}
                        {...register('bankName', {
                          required: {
                            value: true,
                            message: 'This is required field',
                          },
                          pattern: {
                            value: /^[A-Za-z\s&.,-]+$/,
                            message: 'Please enter valid Bank name',
                          },
                        })}
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <p className={styles.error_message}>{errors.bankName?.message as string}</p>
                      <TextField
                        label="Account Holder Name"
                        className={styles.form_field}
                        {...register('accountHolderName', {
                          required: {
                            value: true,
                            message: 'This is required field',
                          },
                          pattern: {
                            value: /^[A-Za-z]+(?: [A-Za-z]+)+$/,
                            message: 'Please enter valid Account holder name',
                          },
                        })}
                      />
                      <p className={styles.error_message}>{errors.accountHolderName?.message as string}</p>
                      <TextField
                        label="Account Number"
                        className={styles.form_field}
                        {...register('accountNumber', {
                          required: {
                            value: true,
                            message: 'This is required field',
                          },
                          pattern: {
                            value: /^\d{9,18}$/,
                            message: 'Please enter valid Account number',
                          },
                        })}
                      />
                      <p className={styles.error_message}>{errors.accountNumber?.message as string}</p>
                      <TextField
                        label="Confirm Account Number"
                        className={styles.form_field}
                        {...register('confirmAccountNumber', {
                          required: {
                            value: true,
                            message: 'This is required field',
                          },
                          pattern: {
                            value: /^\d{9,18}$/,
                            message: 'Please enter valid confirm Account number',
                          },
                          validate: (val: string) => {
                            if (watch('accountNumber') != val) {
                              return 'your password do not match';
                            }
                          },
                        })}
                      />
                      <p className={styles.error_message}>{errors.confirmAccountNumber?.message as string}</p>
                    </div>
                    <div className={styles.checkbox_row}>
                      <Checkbox onClick={neftCheckboxClickHandler} checked={neftCheckbox} />
                      <span className={styles.checkbox_text}>
                        I confirm that the information given in this form is accurate
                      </span>
                    </div>
                  </AccordionDetails>
                </Accordion>
              )}
            </form>
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}

export default ModeOfRefund;
