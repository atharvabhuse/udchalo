import { Accordion, AccordionSummary, AccordionDetails, Checkbox, Container, FormControlLabel } from '@mui/material';
import { ChangeEvent, ForwardedRef, RefObject, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { DropdownArrowGreenIcon } from '@uc/libs/shared/ui';
import styles from './checkbox-form.module.scss';

export interface CheckboxFormConfig {
  background_color: string;
  description: string;
  heading: string;
  image: string;
  read: boolean;
  inputFields: Array<any>;
}

export interface CheckboxFormProps {
  config: CheckboxFormConfig;
  initialValue?: { [key: string]: any };
  hideExpandIcon?: boolean;
  onFormSelect: (selected: boolean) => void;
}

const CheckboxForm = forwardRef(
  ({ config, initialValue, hideExpandIcon, onFormSelect }: CheckboxFormProps, ref: ForwardedRef<any>) => {
    const { formState, register, trigger, getValues } = useForm({ mode: 'onChange', defaultValues: initialValue });
    const { errors } = formState;
    const [checked, setChecked] = useState(false);

    const checkboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
      onFormSelect(event.target.checked);
    };

    const validationRules = (data: any) => {
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

    const isFormValid = async () => trigger();
    const getFormValues = () => getValues();

    useImperativeHandle(ref, () => ({ isFormValid, getFormValues }), []);

    return (
      <Accordion
        className={styles.card}
        expanded={checked}
        style={{ backgroundColor: config?.background_color, boxShadow: 'none' }}>
        <AccordionSummary expandIcon={hideExpandIcon ? <></> : <DropdownArrowGreenIcon />}>
          <div>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={checkboxHandler} />}
              label={config?.heading}
            />
            <div className={styles.description}>{config?.description}</div>
          </div>
        </AccordionSummary>

        <AccordionDetails className={styles.checkbox_accordion_detail}>
          <form className={styles.checkbox_accordion_detail_form}>
            {config?.inputFields?.map((data: any, index: number) => (
              <div className={styles.input_box} key={index}>
                <TextField
                  label={data.label}
                  variant="outlined"
                  id={data.id}
                  type="text"
                  className={styles.add_traveller_inp}
                  placeholder={data.label}
                  helperText={errors[data.id]?.message as string}
                  error={errors[data.id] != null}
                  {...register(data.id, validationRules(data))}
                />
              </div>
            ))}
          </form>
        </AccordionDetails>
      </Accordion>
    );
  }
);

export default CheckboxForm;
