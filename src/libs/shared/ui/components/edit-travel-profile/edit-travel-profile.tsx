import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import styles from './edit-travel-profile.module.scss';

export interface EditTravelProfileProps {
  profileResponse: any;
  register: any;
  watch: any;
}

export function EditTravelProfile({ profileResponse, register, watch }: EditTravelProfileProps) {
  return (
    <div className={styles.edit_travel_preferences}>
      <div className={styles.heading_4}>Travel Preferences</div>
      <div className={styles.travel_profile_container}>
        <div>
          <div className={styles.travel_profile_fields_container}>
            <div className={styles.travel_select}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Flight Timing</InputLabel>
                <Select
                  className={styles.travel_select_element}
                  label="Flight Timing"
                  value={watch('flightTiming')}
                  {...register('flightTiming')}>
                  {profileResponse?.data?.response?.flightTimingOptions?.map((option: string) => (
                    <MenuItem value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={styles.travel_select}>
              <TextField
                id="outlined-basic"
                label="Home Airport"
                variant="outlined"
                className={styles.add_traveller_inp}
                placeholder="Home Airport"
                {...register('homeAirport')}
                fullWidth
              />
            </div>
            <div className={styles.travel_select}>
              <TextField
                id="outlined-basic"
                label="Work Location"
                variant="outlined"
                className={styles.add_traveller_inp}
                placeholder="Work Location"
                {...register('workLocation')}
                fullWidth
              />
            </div>
            <div className={styles.travel_select}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Hotel Type</InputLabel>
                <Select
                  className={styles.travel_select_element}
                  label="Hotel Type"
                  value={watch('hotelType')}
                  {...register('hotelType')}>
                  {profileResponse?.data?.response?.hotelTypeOptions?.map((option: string) => (
                    <MenuItem value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTravelProfile;
