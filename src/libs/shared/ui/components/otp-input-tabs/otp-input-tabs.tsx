import { TextField } from '@mui/material';
import { useEffect, useRef } from 'react';
import styles from './otp-input-tabs.module.scss';

/* eslint-disable-next-line */
export interface OtpInputTabsProps {
  noOfOtpBox: number[];
  otpError?: string;
  enteredOTP?: string;
  setEnteredOTP: (inputText: string) => void;
}

export function OtpInputTabs(props: OtpInputTabsProps) {
  const { noOfOtpBox, enteredOTP, otpError, setEnteredOTP } = props;
  /*
  const otpInputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    otpInputsRef.current[0]?.focus(); // Focus the first input field on mount
  }, []);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {

    if (e.key === 'Backspace' && index > 0) {
      otpInputsRef.current[index - 1]?.focus(); // Move focus to the previous input on Backspace
    } else if (e.key >= '0' && e.key <= '9' && index < noOfOtpBox.length - 1) {
      otpInputsRef.current[index + 1]?.focus(); // Move focus to the next input on number input
    }
  };
*/

  return (
    <div className={styles.otp_parent_box}>
      <div className={styles.otp_box}>
        {noOfOtpBox.map((key, index) => {
          const list = (
            <TextField
              variant="outlined"
              key={`otpInput${key}`}
              inputProps={{ maxLength: 1 }}
              className={styles.otp_input}
              onInput={(e: any) => {
                setEnteredOTP(enteredOTP + e.target.value);
              }}
              // inputRef={(input) => (otpInputsRef.current[index] = input)}
            />
          );
          return list;
        })}
      </div>
      {otpError && <div className={styles.otp_error}>{otpError}</div>}
    </div>
  );
}

export default OtpInputTabs;
