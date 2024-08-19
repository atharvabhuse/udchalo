import { ThankyouIcon } from '@uc/libs/shared/ui';
import React, { useState } from 'react';
import { usePostNPSSurveyAdd } from '@uc/services/network';
import styles from './rate-us-on-scale.module.scss';

interface NpsSurveyRequiredDataInterface {
  surveyId: number;
  userId: string;
  status: string;
  rewardedAmount: number;
  discountCouponCode: number;
  email: string;
  phoneNumber: string;
  platform: string;
  userType: string;
  metadata: {
    pnr?: string;
  };
  place: string;
}

interface RateUsOnScaleInterface {
  showComment: boolean;
  close: (arg: boolean) => void;
  npsSurveyRequiredData: NpsSurveyRequiredDataInterface;
}

function RateUsOnScale({ showComment, close, npsSurveyRequiredData }: RateUsOnScaleInterface) {
  const scale = [
    {
      number: 1,
      backgroundColor: '#FACEC8',
      color: '#CC1100',
      selectedBackgroundColor: '#cc1100',
      selectedColor: '#f7c2bb',
    },
    {
      number: 2,
      backgroundColor: '#FACEC8',
      color: '#CC1100',
      selectedBackgroundColor: '#cc1100',
      selectedColor: '#f7c2bb',
    },
    {
      number: 3,
      backgroundColor: '#FACEC8',
      color: '#CC1100',
      selectedBackgroundColor: '#cc1100',
      selectedColor: '#f7c2bb',
    },
    {
      number: 4,
      backgroundColor: '#FACEC8',
      color: '#CC1100',
      selectedBackgroundColor: '#cc1100',
      selectedColor: '#f7c2bb',
    },
    {
      number: 5,
      backgroundColor: '#FACEC8',
      color: '#CC1100',
      selectedBackgroundColor: '#cc1100',
      selectedColor: '#f7c2bb',
    },
    {
      number: 6,
      backgroundColor: '#FACEC8',
      color: '#CC1100',
      selectedBackgroundColor: '#cc1100',
      selectedColor: '#f7c2bb',
    },
    {
      number: 7,
      backgroundColor: '#F4EEB4',
      color: '#C3952E',
      selectedBackgroundColor: '#c3952e',
      selectedColor: '#e9db97',
    },
    {
      number: 8,
      backgroundColor: '#F4EEB4',
      color: '#C3952E',
      selectedBackgroundColor: '#c3952e',
      selectedColor: '#e9db97',
    },
    {
      number: 9,
      backgroundColor: '#85E2B8',
      color: '#1F7B51',
      selectedBackgroundColor: '#1e7b51',
      selectedColor: '#7fdcb2',
    },
    {
      number: 10,
      backgroundColor: '#85E2B8',
      color: '#1F7B51',
      selectedBackgroundColor: '#1e7b51',
      selectedColor: '#7fdcb2',
    },
  ];

  const [rateUs, setRateUs] = useState(undefined);
  const rateUsHandler = (data: number) => {
    setRateUs(data);
  };

  const [popupName, setPopupName] = useState('rateUsOnScale');

  const closeHandler = () => {
    close(true);
  };

  const rateUsSubmitHandler = () => {
    if (rateUs >= 1 && rateUs <= 8) {
      setPopupName('thankyou');
    } else if (rateUs >= 9 && rateUs <= 10 && showComment === true) {
      setPopupName('rateUsByNote');
    } else if (rateUs >= 9 && rateUs <= 10 && showComment === false) {
      setPopupName('thankyou');
    }
  };

  const [note, setNote] = useState();
  const inputValChangeHandler = e => {
    setNote(e.target.value);
  };

  const npsSurveyAddPayload = {
    surveyId: npsSurveyRequiredData.surveyId,
    userId: npsSurveyRequiredData.userId,
    rating: rateUs,
    status: npsSurveyRequiredData.status,
    rewardedAmount: npsSurveyRequiredData.rewardedAmount,
    discountCouponCode: npsSurveyRequiredData.discountCouponCode,
    comment: note,
    email: npsSurveyRequiredData.email,
    phoneNumber: npsSurveyRequiredData.phoneNumber,
    platform: npsSurveyRequiredData.platform,
    userType: npsSurveyRequiredData.userType,
    metadata: { pnr: npsSurveyRequiredData.metadata.pnr },
    place: npsSurveyRequiredData.place,
  };
  const api = usePostNPSSurveyAdd(npsSurveyAddPayload);

  const rateUsByNoteClickHandler = () => {
    setPopupName('thankyou');
    api.mutate();
  };

  const isMobile = window.innerWidth < 600;

  return (
    <>
      {popupName === 'rateUsOnScale' && (
        <div className={styles.rate_us_container}>
          <div className={styles.rate_us_heading}>Rate us to help you better</div>
          <div className={styles.scale_container}>
            <div className={styles.scale_container_text}>
              On the scale of 1 to 10, How likely {isMobile ? 'will you' : 'are you going to'} refer udChalo to your
              friends?
            </div>
            <div className={styles.scale_number_container}>
              {scale.map(data => (
                <button
                  className={styles.scale_number}
                  style={{
                    backgroundColor: rateUs === data.number ? data.selectedBackgroundColor : data.backgroundColor,
                    color: rateUs === data.number ? data.selectedColor : data.color,
                  }}
                  onClick={() => rateUsHandler(data.number)}
                  key={data.number}
                  type="button">
                  {data.number}
                </button>
              ))}
            </div>
            <div className={styles.scale_container_likely_row}>
              <div className={styles.dislike}>
                <span className={styles.flip}>👎</span><div>Not very likely</div>
              </div>

              {isMobile ? <div>Very likely👍</div> : <div>👍 Very likely</div>}
            </div>
          </div>

          <div className={styles.btn_row}>
            <button type="button" className={styles.btn_link1} onClick={closeHandler}>
              Ask Me Later
            </button>
            <button
              type="button"
              onClick={rateUsSubmitHandler}
              className={rateUs === undefined ? styles.btn_link2_disabled : styles.btn_link2}>
              Submit
            </button>
          </div>
        </div>
      )}
      {popupName === 'rateUsByNote' && (
        <div className={styles.rate_us_by_note_container}>
          <div className={styles.rate_us_by_note_heading}>Rate us to help you better</div>
          <div className={styles.rate_us_by_note_share_container}>
            Would you like to share your experience?
            <textarea
              onChange={inputValChangeHandler}
              className={styles.textarea}
              rows={5}
              placeholder="Add Note (Optional)"
              maxLength={200}
            />
            <div className={styles.textarea_max_words_text}>Maximum 200 characters</div>
          </div>
          <div className={styles.btn_row}>
            <button onClick={rateUsByNoteClickHandler} type="button" className={styles.btn_link1}>
              Skip
            </button>
            <button onClick={rateUsByNoteClickHandler} type="button" className={styles.btn_link2}>
              Submit
            </button>
          </div>
        </div>
      )}
      {popupName === 'thankyou' && (
        <div className={styles.thankyou_container}>
          <div className={styles.thankyou_icon}>
            <ThankyouIcon />
          </div>
          <div className={styles.thankyou_heading}>Thank you for sharing feedback</div>
          <div className={styles.btn_row}>
            <button onClick={closeHandler} type="button" className={styles.btn_link2}>
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default RateUsOnScale;
