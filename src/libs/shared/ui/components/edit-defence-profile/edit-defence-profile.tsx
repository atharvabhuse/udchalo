import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';
import { UffVerificationIcon, WarnExclamationIcon } from '@uc/libs/shared/ui';
import styles from './edit-defence-profile.module.scss';
import { MyProfileConstants } from '../my-profile/my-profile.constants';

export interface EditDefenceProfileProps {
  isDefenceSelected: boolean;
  register: any;
  watch: any;
  errors: any;
  isDependentSelected: boolean;
}

export function EditDefenceProfile({
  isDefenceSelected,
  register,
  watch,
  errors,
  isDependentSelected,
}: EditDefenceProfileProps) {
  return (
    <div className={styles.edit_defence_profile}>
      <div className={styles.heading_4}>Defence Profile</div>
      <div className={styles.defence_profile_container}>
        <div className={styles.defence_config_container}>
          <div className={styles.edit_profile_form_container_q}>
            <div className={styles.armed_force_selection}>
              <FormControlLabel
                control={<Checkbox checked={isDefenceSelected} {...register('isDefence')} />}
                label="I am from armed forces"
                style={{ color: '#FFFFFF' }}
              />
            </div>
          </div>
          <div>
            {isDefenceSelected && (
              <div className={styles.defence_profile_fields_container}>
                <div className={styles.defence_select}>
                  <FormControl variant="outlined" style={{ width: '98%' }}>
                    <InputLabel id="demo-simple-select-helper-label">Select Defence Service</InputLabel>
                    <Select
                      className={styles.defence_select_element}
                      value={watch('userCategory')}
                      label="Select Defence Service"
                      {...register('userCategory')}>
                      {MyProfileConstants.DEFENCE_SERVICES.map(service => (
                        <MenuItem value={service}>{service}</MenuItem>
                      ))}
                    </Select>
                    {errors.userCategory && <p style={{ color: 'red' }}>{errors.userCategory.message}</p>}
                  </FormControl>
                </div>
                <div className={styles.defence_select}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">Select Category</InputLabel>
                    <Select
                      className={styles.defence_select_element}
                      label="Select Category"
                      value={watch('relationToArmedForces')}
                      {...register('relationToArmedForces')}>
                      {MyProfileConstants.SERVICE_CATEGORY_TYPES.map(category => (
                        <MenuItem value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                    {errors.relationToArmedForces && (
                      <p style={{ color: 'red' }}>{errors.relationToArmedForces.message}</p>
                    )}
                  </FormControl>
                </div>
                <div className={styles.defence_select}>
                  {isDependentSelected && (
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="demo-simple-select-helper-label">Select Relation</InputLabel>
                      <Select
                        className={styles.defence_select_element}
                        label="Select Relation"
                        value={watch('relation')}
                        {...register('relation')}>
                        {MyProfileConstants.DEPENDENT_TYPES.map(dependentType => (
                          <MenuItem value={dependentType}>{dependentType}</MenuItem>
                        ))}
                      </Select>
                      {errors.relation && <p style={{ color: 'red' }}>{errors.relation.message}</p>}
                    </FormControl>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.uff_verification_container}>
          <div className={styles.uff_verification_text_container}>
            <UffVerificationIcon />
            <span className={styles.text}>UFF Verification is pending</span>
            <WarnExclamationIcon />
          </div>
          <Button className={styles.verify_now_button} variant="contained">
            Verify Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditDefenceProfile;
