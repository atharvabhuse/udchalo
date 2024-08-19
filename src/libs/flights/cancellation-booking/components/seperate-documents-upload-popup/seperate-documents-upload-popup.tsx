import {
  CloseIcon,
  DocumentFileIcon,
  ImportantIcon,
  MinusIcon,
  PlusIcon,
  SingleTravellerIcon,
  UcButton,
  CloseBlueIcon,
} from '@uc/libs/shared/ui';
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import styles from './seperate-documents-upload-popup.module.scss';

/* eslint-disable-next-line */
export interface SeperateDocumentsUploadPopupProps {
  onClose: () => void;
  popUpData: Array<any>;
  surakshaReasons: any;
}

function SeperateDocumentsUploadPopup(props: SeperateDocumentsUploadPopupProps) {
  const { onClose, popUpData, surakshaReasons } = props;
  const [expanded, setExpanded] = useState<any>();

  const [raiseToClaim, setRaiseToClaim] = useState<Array<any>>([]);

  const handleChange = (panelId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panelId : '');
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const onChangeReasonToClaim = (event: any, id: any) => {
    const reasonArray: Array<any> = [];
    reasonArray.push({ passengerId: id, reason: event.target.value });
    setRaiseToClaim([...raiseToClaim, ...reasonArray]);
  };

  const onCloseHandler = () => {
    onClose();
  };

  return (
    <div className={styles.seperate_docs_upload_container}>
      <CloseIcon className={styles.close_icon} onClick={onCloseHandler} />
      <div className={styles.submit_documents_header_container}>
        <div className={styles.step_label}>Submit Proofs/Documents</div>
        <div className={styles.submit_documents_label}>
          To make a claim under Suraksha, Please submit proof(s) for cancellation.{' '}
          <span className={styles.submit_documents_label_link}>Read More</span>
        </div>
      </div>
      {popUpData &&
        popUpData.map(passengerData => {
          const list = (
            <div className={styles.upload_document_container}>
              <Accordion
                expanded={expanded === passengerData.passengerId}
                onChange={handleChange(passengerData.passengerId)}
                elevation={0}
                className={styles.accordion_container}>
                <AccordionSummary
                  className={styles.traveller_header_container}
                  sx={{
                    '& .Mui-expanded': {
                      marginBlock: '0px',
                    },
                    '& .MuiAccordionSummary-content': {
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBlock: '0px',
                    },
                  }}>
                  <div className={styles.trveller_label_container}>
                    <div className={styles.traveller_icon_container}>
                      <SingleTravellerIcon className={styles.traveller_icon} />
                    </div>
                    <div className={styles.trveller_name}>
                      {passengerData.name} {passengerData.lastName} (
                      {passengerData?.gender.toLowerCase() === 'male' ? 'M' : 'F'})
                    </div>
                  </div>
                  <div>{expanded === passengerData.passengerId ? <MinusIcon /> : <PlusIcon />}</div>
                </AccordionSummary>
                <AccordionDetails className={styles.accordion_details}>
                  <div>
                    <Select
                      key={passengerData.passengerId}
                      placeholder="Reason for claim"
                      value={raiseToClaim[passengerData.passengerId]?.reason}
                      sx={{
                        borderRadius: '8px',
                      }}
                      fullWidth
                      onChange={event => onChangeReasonToClaim(event, passengerData.passengerId)}>
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
                      {/* <DocumentCheckIcon className={styles.document_check_icon} />
                  <div className={styles.document_type_label}>
                    Armed Force & Emergency services recall
                  </div> */}
                    </div>
                    <div className={styles.document_upload_card}>
                      <DocumentFileIcon className={styles.document_file_icon_container} />
                      <div className={styles.upload_document_progress_container}>
                        <div className={styles.upload_document_name_container}>
                          <div className={styles.file_name}>Services Recall.png</div>
                          <div className={styles.file_progress}>100%</div>
                        </div>
                        <div className={styles.upload_document_upload_progress} />
                      </div>
                      <CloseBlueIcon className={styles.delete_icon} />
                    </div>
                    <div className={styles.upload_button_container}>
                      <UcButton
                        variant="outlined"
                        color="secondary"
                        onClick={handleUploadButtonClick}
                        sx={{
                          background: '#fff',
                        }}>
                        Upload Image
                      </UcButton>
                    </div>
                    <div className={styles.no_file_uploaded}>No file uploaded</div>
                    <div className={styles.file_upload_count}>01 uploaded</div>
                  </div>
                  <div className={styles.document_format_container}>
                    <div>File format supported: png/jpeg/pdf</div>
                    <div>Maximum file size: 3MB</div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          );
          return list;
        })}
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
  );
}

export default SeperateDocumentsUploadPopup;
