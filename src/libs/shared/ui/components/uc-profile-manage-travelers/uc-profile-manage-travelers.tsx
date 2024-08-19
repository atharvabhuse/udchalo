import axios from 'axios';
import { Accordion, AccordionDetails, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { apiUrls } from '@uc/services/network/api-endpoints';
import { retrieveAndDecryptFromLocalStorage } from '@uc/services/network';
import { UDCHALO_TOKEN } from '@uc/utils/constants';
import {GenderSelectionPanel} from '../gender-selection-panel/gender-selection-panel';
import {UcProfileSavedTravelerCard} from '../uc-profile-saved-traveler-card/uc-profile-saved-traveler-card';
import styles from './uc-profile-manage-travelers.module.scss';

/* eslint-disable-next-line */
export interface UcProfileManageTravelersProps {
  clickableCallback: any;
  dispatch: any;
  totalTravelers: any;
}

export function UcProfileManageTravelers({
  clickableCallback,
  dispatch,
  totalTravelers,
}: UcProfileManageTravelersProps) {
  // const useStyles = makeStyles({
  //   icon: {
  //     backgroundColor: '#DDF0FB',
  //     color: '#3398D5',
  //   },
  // });
  // const classes = useStyles();

  const classes = {
    icon: {
      backgroundColor: '#DDF0FB',
      color: '#3398D5',
    },
  };

  const [addTraveller, setAddTraveller] = useState(false);
  const [isTravellerDataModified, setIsTravellerDataModified] = useState(false);

  const addTravelerForm = useForm({
    defaultValues: {
      gender: 'male',
      firstAndMiddleName: '',
      lastname: '',
      age: '',
    },
  });

  const { register, handleSubmit, formState, trigger, reset } = addTravelerForm;
  const { errors } = formState;

  const [selectedGender, setSelectedGender] = useState('male');

  const [selectedGenderError, setSelectedGenderError] = useState(false);
  const handlerGenderClick = (gender: string) => {
    setSelectedGender(gender);
    addTravelerForm.setValue('gender', gender);
  };

  const addTravellerToggleHandler = () => {
    setAddTraveller(true);
  };

  const backToSavedTraveler = () => {
    setAddTraveller(false);
  };

  const [savedTraveler, setSavedTraveler] = useState([]);

  const getSavedTravelerApiHandler = async () => {
    const config = {
      headers: {
        Udchalotoken: retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN),
      },
    };

      const api = await axios.get(apiUrls.getTravellersData, config);
      setSavedTraveler(api.data.response);
  };

  const totalTraveler = parseInt(totalTravelers,10);

  const [sameDefenceIDError, setSameDefenceIDError] = useState(false);

  const [addedTraveler, setAddedTraveler] = useState<any[]>([]);

  const addTravelerApiHandler = async (data: { firstAndMiddleName: string; lastname: any; gender: any }) => {
    const config = {
      headers: {
        Udchalotoken: retrieveAndDecryptFromLocalStorage(UDCHALO_TOKEN),
      },
    };

    const api = await axios.post(
      apiUrls.addTraveler,
      {
        title: 'mr',
        firstName: data?.firstAndMiddleName.split(' ')[0],
        lastName: data?.lastname,
        middleName: data?.firstAndMiddleName.split(' ')[1] || '',
        dateOfBirth: '1999-07-19T18:30:00.000Z',
        // age: data?.age, //TO DO :: Age not supported
        serviceNumber: null,
        gender: data?.gender,
      },
      config
    );
    setIsTravellerDataModified(!isTravellerDataModified);
    backToSavedTraveler();
    reset();
  };

  const addedTravelerHandler = (data: any) => {
    const isDuplicate = addedTraveler.some(traveler => traveler.defenceID === data.defenceID);

    if (!isDuplicate) {
      setAddedTraveler([...addedTraveler, data]);
      setSameDefenceIDError(false);
    } else {
      setSameDefenceIDError(true);
    }
  };

  const [removeTraveler, setRemoveTraveler] = useState();
  const removeHandler = (data: any) => {
    setRemoveTraveler(data);
    addedTraveler.splice(addedTraveler.indexOf(data), 1);
  };

  const addNewTravelerHandler = (data: any) => {
    setAddedTraveler([...addedTraveler, data]);
  };

  const [addedTravelerError, setAddedTravelerError] = useState(false);

  const [travelerDetails, setTravelerDetails] = useState({});

  const submitHandler = (data: any) => {
    setTravelerDetails({
      travelers: addedTraveler,
      contactDetails: data,
    });
    clickableCallback(true);
    dispatch({
      type: 'travelerDetails',
      payload: {
        travelers: addedTraveler,
        contactDetails: data,
      },
    });
  };

  const validateFormHandler = async (data: any) => {
    const isValid = await trigger();
    if (addedTraveler.length !== totalTraveler) {
      return setAddedTravelerError(true);
    }
    setAddedTravelerError(false);

    if (isValid) {
      handleSubmit(submitHandler);
    }
  };

  useEffect(() => {
    getSavedTravelerApiHandler();
  }, [isTravellerDataModified]);

  const [accordionExpanded, setAccordionExpanded] = useState(true);

  const accordionExpandedHandler = () => {
    setAccordionExpanded(!accordionExpanded);
  };

  const addTravelerHandler = async(data: any) => {
    setAddedTraveler([...addedTraveler, data]);
    await addTravelerApiHandler(data);
  };

  return (
    <>
      {addTraveller && (
        <form onSubmit={()=>handleSubmit(addTravelerHandler)} noValidate>
          <div className={styles.traveller_details_row}>
            <div className={styles.traveller_details_heading}>
              <ArrowBackIosIcon style={{ marginRight: '4px' }} onClick={backToSavedTraveler} color="primary" />
              Add New Traveler
            </div>
          </div>
          <div className={styles.add_traveler_panel}>
            <div>
              <GenderSelectionPanel
                selectedGender={selectedGender}
                handlerGenderClick={handlerGenderClick}
                showCertInCertified={false}
              />
            </div>
            <div className={styles.flex_container}>
              <div className={styles.flex_2}>
                <TextField
                  id="outlined-basic"
                  label="First and Middle Name"
                  variant="outlined"
                  className={styles.add_traveller_inp}
                  {...register('firstAndMiddleName', {
                    required: 'This is required field',
                  })}
                  placeholder="First and Middle Name"
                  fullWidth
                />
                <p className={styles.error_message}>{errors.firstAndMiddleName?.message}</p>
              </div>
              <div className={styles.flex_2}>
                <TextField
                  id="outlined-basic2"
                  label="Last Name"
                  variant="outlined"
                  className={styles.add_traveller_inp}
                  {...register('lastname', {
                    required: 'This is required field',
                  })}
                  placeholder="Last Name"
                  fullWidth
                />
                <p className={styles.error_message}>{errors.lastname?.message}</p>
              </div>
              <div className={styles.flex_1}>
                <TextField
                  id="outlined-basic3"
                  label="Age"
                  variant="outlined"
                  className={styles.add_traveller_inp}
                  {...register('age', {
                    required: 'This is required field',
                  })}
                  placeholder="Age"
                  fullWidth
                />
                <p className={styles.error_message}>{errors.age?.message}</p>
              </div>
            </div>
          </div>
          <div className={styles.add_traveller_buttons_row}>
            {/* <div className={styles.flex_1}></div> */}
            <div className={styles.flex_2}>
              <Button
                type="button"
                // onClick={cancelHandler}
                className={styles.cancel_btn}
                fullWidth>
                Cancel
              </Button>
            </div>
            <div className={styles.flex_2}>
              <Button type="submit" className={styles.add_traveller_btn} fullWidth>
                Add Traveler
              </Button>
            </div>
            {/* <div className={styles.flex_1}></div> */}
          </div>
        </form>
      )}
      {!addTraveller && (
        <>
          <div className={styles.traveller_details_row}>
            <div className={styles.traveller_details_heading}>Manage Travelers</div>
            <div className={styles.add_new_traveller_row}>
              <div className={styles.add_new_traveller} onClick={addTravellerToggleHandler}>
                <AddIcon sx={classes.icon} />
                <div className={styles.add_new_traveller_text}>Add New Traveler</div>
              </div>
            </div>
          </div>

          <Accordion className={styles.traveller_details} expanded={accordionExpanded}>
            <AccordionDetails className={styles.traveller_details_accordion_details}>
              <div>
                <div className={styles.saved_travellers_box}>
                  <div className={styles.saved_travellers_heading}>Saved Travelers</div>
                  <div className={styles.saved_travellers_list_container}>
                    {savedTraveler?.map((data: any, index) => (
                      <UcProfileSavedTravelerCard
                        key={`${data?.travellerId}`}
                        savedTraveler={data}
                        addedTravelerCallback={addedTravelerHandler}
                        modifyTravelerDataHandler={() => setIsTravellerDataModified(!isTravellerDataModified)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </>
  );
}

export default UcProfileManageTravelers;
