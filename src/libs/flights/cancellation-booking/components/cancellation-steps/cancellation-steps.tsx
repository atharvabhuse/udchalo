import {
  CloseBlueIcon,
  DocumentCheckIcon,
  DocumentFileIcon,
  ImportantIcon,
  SurakshaLogo,
  SurakshaSheild,
  UcButton,
  UcSwitch,
} from '@uc/libs/shared/ui';

import { Alert, Dialog, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { SignedUrlPayloadType, useFileUpload, usePostUploadDocsonAws } from '@uc/services/network';
import { useEffect, useState } from 'react';
import SeperateDocumentsUploadPopup from '../seperate-documents-upload-popup/seperate-documents-upload-popup';
import styles from './cancellation-steps.module.scss';

/* eslint-disable-next-line */
export interface CancellationStepsProps {
  surakshaReasons: any;
  isSurakshaOpted: boolean;
  cancellationBookingDetails: any;
  clickable: (arg: boolean) => any;
  passengerIDsCallback: (arg: string[]) => any;
  flightCancellationReasonCallback: (arg: string) => any;
  onSurakshaToggleCallBack: (arg: boolean) => any;
  bookingId: string;
}

function CancellationSteps(props: CancellationStepsProps) {
  const {
    surakshaReasons,
    isSurakshaOpted,
    cancellationBookingDetails,
    clickable,
    passengerIDsCallback,
    flightCancellationReasonCallback,
    onSurakshaToggleCallBack,
    bookingId,
  } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const [seperateTravellerPopup, setseperateTravellerPopup] = useState(false);
  const [onSurakshaToggle, setOnSurakshaToggle] = useState<boolean>(false);
  const [raiseToClaim, setRaiseToClaim] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState<string>('');

  const randomString = (length: number) =>
    Math.round(36 ** (length + 1) - Math.random() * 36 ** length)
      .toString(36)
      .slice(1);

  const getDummyFileName = () => {
    const fileName = randomString(6);
    return fileName;
  };

  const signedUrlPayload: SignedUrlPayloadType = {
    type: 'suraksha',
    operation: 'put',
    fileName: `${bookingId}/${getDummyFileName()}`,
  };

  const fileUploadMutationFn = useFileUpload();

  const postUploadDocsMutationFn = usePostUploadDocsonAws();

  const handleClose = () => {
    setOpen(false);
  };

  const documentFormats = ['image/jpeg', 'image/png', 'application/pdf'];

  const documentSize = 3145728;

  const handleDocumentChange = (e: any) => {
    let error = '';
    const file = e.target.files[0];

    if (!documentFormats.includes(file.type)) {
      error = 'File format not supported';
      setSnackBarMsg(error);
      setOpen(true);
      setFileError(true);
    } else if (file.size > documentSize) {
      error = 'Upload failed (Exceeded file size)';
      setSnackBarMsg(error);
      setFileError(true);
      setOpen(true);
    } else {
      onFileSubmission(file);
    }
    setSelectedFile(file);
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const onFileSubmission = (file: any) => {
    fileUploadMutationFn.mutate(signedUrlPayload, {
      onSuccess(data: any, variables, context) {
        const response: any = data?.data?.response;
        if (!response.putUrl || response.putUrl === '') {
          const error = 'Unable to upload file';
          setSnackBarMsg(error);
          setOpen(true);
          setFileError(true);
        } else {
          postUploadDocsMutationFn.mutate(
            { url: response.putUrl, file },
            {
              onSuccess(data, variables, context) {},
              onError(error, variables, context) {
                console.log('postUploadDocsMutationFn error', error);
              },
            }
          );
        }
      },
      onError(error, variables, context) {},
    });
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (step: any) => {
    setActiveStep(step);
  };
  const handleSeperatetravellerPopup = () => {
    setseperateTravellerPopup(!seperateTravellerPopup);
  };

  const [flightCancelledReason, setFlightCancelledReason] = useState();
  const [passengersSelected, setPassengersSelected] = useState<Array<any>>([]);

  useEffect(() => {
    if (cancellationBookingDetails && cancellationBookingDetails.passengers) {
      const selectedPassengerArr: Array<any> = [];
      cancellationBookingDetails.passengers.forEach((passengerRecord: any) => {
        selectedPassengerArr.push({
          name: passengerRecord.name?.firstName,
          lastName: passengerRecord.name?.lastName,
          selected: true,
          passengerId: passengerRecord.passengerId,
          gender: passengerRecord.gender,
        });
      });
      setPassengersSelected([...selectedPassengerArr]);
      passengerIDsCallback(selectedPassengerArr.map(item => item.passengerId));
      clickable(true);
    } else {
      clickable(false);
    }
  }, [cancellationBookingDetails]);

  const checkboxChangeHandler = (e: any, passenger: any) => {
    if (passenger) {
      passengersSelected.find(item => {
        if (item.passengerId === passenger.passengerId) {
          item.selected = e.target.checked;
        }
      });
    }
    setPassengersSelected([...passengersSelected]);
    passengerIDsCallback(passengersSelected.filter(item => item.selected).map(item => item.passengerId));
  };

  const radioChangeHandler = (e: any) => {
    setFlightCancelledReason(e.target.value);
    flightCancellationReasonCallback(e.target.value);
  };

  const onChangeSurakshaClaimToggle = (e: any) => {
    setOnSurakshaToggle(e.target.checked);
  };

  const formControlLabel: any = {
    '& .MuiFormControlLabel-label': {
      fontSize: {
        md: '1rem',
        lg: '1rem',
        xl: '1rem',
        sm: '12px',
        xs: '12px',
      },
    },
  };

  const seperateTravellerPopupStyle: any = {
    className: 'popup-dialog',
    style: {
      position: 'absolute',
      zIndex: 1,
      border: '1px',
      borderStyle: 'solid',
      borderColor: '#E5EDF4',
      top: '70px',
      marginInline: '351px',
      width: '100%',
      borderRadius: '16px',
      overflowY: 'inherit',
    },
  };

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
    '& .MuiOutlinedInput-input': {
      paddingBlock: '12px',
      paddingLeft: '33px',
    },
  };

  const selectBoxSx = {
    borderRadius: '8px',
    '& .MuiOutlinedInput-input': {
      paddingInline: '16px',
      paddingBlock: '11px',
    },
  };
  const onChangeReasonToClaim = (e: any) => {
    setRaiseToClaim(e.target.value as string);
  };

  const onFileDelete = () => {
    setSelectedFile(null);
    setOpen(false);
    setFileError(false);
  };

  return (
    <div className={styles.CancellationSteps_container}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {`${snackbarMsg}`}
        </Alert>
      </Snackbar>
      {cancellationBookingDetails?.isSurakshaOpted === true && (
        <div className={styles.suraksha_container}>
          <div className={styles.suraksha_left}>
            <div className={styles.suraksha_logo}>
              <SurakshaLogo />
            </div>
            <div className={styles.claim_text}>Claim Enabled</div>
            <UcSwitch onChange={onChangeSurakshaClaimToggle} />
          </div>
          <div className={styles.suraksha_right}>
            <div className={styles.suraksha_shield_logo}>
              <SurakshaSheild />
            </div>
            <div className={styles.covered_text}>What is covered?</div>
          </div>
        </div>
      )}

      <FormControl>
        <div className={styles.select_passengers_container}>
          <div className={styles.select_passengers_label_container}>
            <div className={styles.step}>1</div>
            <div className={styles.step_label}>Select Passengers</div>
          </div>
          {passengersSelected &&
            passengersSelected?.map((passenger: any, index: number) => (
              <div className={styles.passengers_list_container} id={passenger.passengerId} key={index}>
                <div className={styles.passengers_checkbox}>
                  <FormControlLabel
                    sx={formControlLabel}
                    label={`${passenger.name} ${passenger.lastName}`}
                    control={<Checkbox onChange={e => checkboxChangeHandler(e, passenger)} defaultChecked />}
                  />
                </div>
              </div>
            ))}
        </div>
      </FormControl>

      <div className={styles.divider} />
      <div className={styles.cancellation_reason_container}>
        <div className={styles.cancellation_header_container}>
          <div className={styles.cancellation_reason_label_container}>
            <div className={styles.step}>2</div>
            <div className={styles.step_label}>Tell us why would you like to cancel?</div>
          </div>
          <div className={styles.cancellation_reason_label}>
            Select the correct cancellation reason to get your request approved.
          </div>
        </div>

        <FormControl>
          <RadioGroup onChange={radioChangeHandler}>
            <div className={styles.reason_container}>
              <div className={styles.cancellation_reason_radio}>
                <FormControlLabel
                  sx={formControlLabel}
                  label="My flight was cancelled by the airline."
                  value="flightCancelled"
                  control={<Radio />}
                />
              </div>
            </div>
            <div className={styles.reason_container}>
              <div className={styles.cancellation_reason_radio}>
                <FormControlLabel
                  sx={formControlLabel}
                  label="I am not travelling."
                  value="notTravelling"
                  control={<Radio />}
                />
              </div>
            </div>
            <div className={styles.reason_container}>
              <div className={styles.cancellation_reason_radio}>
                <FormControlLabel
                  sx={formControlLabel}
                  label="I am not travelling and I have already cancelled my booking with airline."
                  value="noShow"
                  control={<Radio />}
                />
              </div>
            </div>
          </RadioGroup>
        </FormControl>

        <div className={styles.textField_container}>
          <TextField
            placeholder="Add Note (Optional)"
            fullWidth
            sx={textFieldSx}
            id="outlined-basic"
            variant="outlined"
            className={styles.text_field}
          />
        </div>
      </div>
      <div className={styles.divider} />
      {onSurakshaToggle && cancellationBookingDetails?.isSurakshaOpted === true && flightCancelledReason && (
        <div className={styles.submit_documents_container}>
          <div className={styles.submit_documents_header_container}>
            <div className={styles.submit_documents_label_container}>
              <div className={styles.step}>3</div>
              <div className={styles.step_label}>Submit Proofs/Documents</div>
            </div>
            <div className={styles.submit_documents_label}>
              To make a claim under Suraksha, Please submit proof(s) for cancellation.{' '}
              <span className={styles.submit_documents_label_link}>Read More</span>
            </div>
          </div>

          <div className={styles.upload_document_container}>
            <div>
              <Select
                placeholder="Reason for claim"
                value={raiseToClaim}
                sx={selectBoxSx}
                fullWidth
                onChange={onChangeReasonToClaim}>
                {surakshaReasons?.reasons.map((reason: any) => (
                  <MenuItem value={reason.reasonEnglish}>
                    {reason.reasonEnglish}
                    {' ( '}
                    {reason.reasonHindi}
                    {' ) '}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <div className={styles.what_can_submit_label}>What can be submited:</div>
              <div className={styles.what_can_submit}>
                An official letter from the passenger’s reporting Officer being recalled to duty.
              </div>
            </div>
            <div className={styles.upload_container}>
              <div className={styles.document_type_container}>
                {raiseToClaim && <DocumentCheckIcon className={styles.document_check_icon} />}
                <div className={styles.document_type_label}>{raiseToClaim}</div>
              </div>
              {selectedFile && !fileError && (
                <div className={styles.document_upload_card}>
                  <DocumentFileIcon className={styles.document_file_icon_container} />
                  <div className={styles.upload_document_progress_container}>
                    <div className={styles.upload_document_name_container}>
                      <div className={styles.file_name}>{selectedFile?.name}</div>
                      <div className={styles.file_progress}>100%</div>
                    </div>
                    <div className={styles.upload_document_upload_progress} />
                  </div>
                  <CloseBlueIcon className={styles.delete_icon} onClick={onFileDelete} />
                </div>
              )}
              <div className={styles.upload_button_container}>
                <UcButton
                  variant="outlined"
                  color="secondary"
                  onClick={handleUploadButtonClick}
                  sx={{
                    background: '#fff',
                  }}>
                  Upload Image
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleDocumentChange}
                    style={{ display: 'none' }}
                    multiple={false}
                  />
                </UcButton>
              </div>
              {!selectedFile && <div className={styles.no_file_uploaded}>No file uploaded</div>}
              {selectedFile && !fileError && <div className={styles.file_upload_count}>01 uploaded</div>}
            </div>
            <div className={styles.document_format_container}>
              <div>File format supported: png/jpeg/pdf</div>
              <div>Maximum file size: 3MB</div>
            </div>
          </div>
          <div className={styles.separate_document_container}>
            <div className={styles.separate_document_checkbox}>
              <Checkbox onClick={handleSeperatetravellerPopup} />
            </div>
            <div className={styles.seperate_document_label}>Separate Docs for each traveler.</div>
          </div>
          <div className={styles.important_note_container}>
            <div>
              <ImportantIcon className={styles.important_icon} />
            </div>
            <div className={styles.important_note}>
              <span className={styles.note_highlighted}>Important: </span>
              The proof(s) can be submitted within 60 days from the travel date.
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={seperateTravellerPopup}
        PaperProps={seperateTravellerPopupStyle}
        onClose={handleSeperatetravellerPopup}>
        <SeperateDocumentsUploadPopup
          surakshaReasons={surakshaReasons}
          popUpData={passengersSelected.filter(item => item.selected)}
          onClose={handleSeperatetravellerPopup}
        />
      </Dialog>
    </div>
  );
}

export default CancellationSteps;
