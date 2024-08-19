import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import styles from './uc-checkbox-row.module.scss';

/* eslint-disable-next-line */

export interface Details {
  background_color: string;
  description: string;
  heading: string;
  image: string;
  read: boolean;
  input_fields: any;
}

export interface UcCheckboxRowProps {
  details: Details;
  register: any;
  formState: any;
  trigger: any;
  clickable: any;
  dispatch: any;
}

export function UcCheckboxRow({ details, register, formState, trigger, clickable, dispatch }: UcCheckboxRowProps) {
  const { errors } = formState;
  const [checked, setChecked] = useState(false);
  const ref = useRef();

  const checkboxHandler = () => {
    setChecked(!checked);
    dispatch({ type: details.heading, payload: !checked });
  };

  const validationRulesFunc = (data: any) => {
    let validationRules: any = { required: 'This is a required field' };
    if (data.id === 'email') {
      validationRules = {
        ...validationRules,
        pattern: {
          value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          message: 'Invalid Email',
        },
      };
    } else if (data.id === 'ltc') {
      validationRules = {
        ...validationRules,
        pattern: {
          value: /^[A-Za-z0-9]+$/,
          message: 'Invalid LTC Type',
        },
      };
    } else if (data.id === 'gstnumber') {
      validationRules = {
        ...validationRules,
        pattern: {
          value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
          message: 'Invalid GST Number',
        },
      };
    }
    return validationRules;
  };

  return (
    <Accordion
      className={styles.checkbox_row_accordion}
      expanded={checked}
      style={{ backgroundColor: details?.background_color }}>
      <AccordionSummary
        className={styles.checkbox_row}
        style={{
          backgroundColor: !clickable ? 'white' : details?.background_color,
          opacity: !clickable ? 0.4 : 1,
          pointerEvents: !clickable ? 'none' : undefined,
        }}>
        <div className={styles.checkbox_row_left}>
          <input type="checkbox" className={styles.inp} onClick={checkboxHandler} />
          <div className={styles.heading_desc_col}>
            <div className={styles.checkbox_heading}>{details?.heading}</div>
            <div className={styles.checkbox_desc}>{details?.description}</div>
          </div>
        </div>

        <div className={styles.checkbox_row_right}>
          <div>{details.image}</div>
          <div className={styles.checkbox_read_more}>{details.read === true ? 'Read More' : ''}</div>
        </div>
      </AccordionSummary>

      {checked && (
        <AccordionDetails className={styles.checkbox_accordion_detail}>
          <form className={styles.checkbox_accordion_detail_form} noValidate>
            {details?.input_fields?.map((data: any,index: number) => (
              <div className={styles.input_box} key={data.id}>
                <TextField
                  label={data.label}
                  variant="outlined"
                  id={`index- ${index}`}
                  type="text"
                  className={styles.add_traveller_inp}
                  placeholder={data.label}
                  {...register(data.id, validationRulesFunc(data))}
                />
                <p className={styles.error_message}>{errors[data.id]?.message}</p>
              </div>
            ))}
          </form>
        </AccordionDetails>
      )}
    </Accordion>
  );
}

export default UcCheckboxRow;
