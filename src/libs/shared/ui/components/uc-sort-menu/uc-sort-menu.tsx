import { Button, FormControl, FormControlLabel, FormLabel, Menu, MenuItem, Radio, RadioGroup } from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';
import { SortMenuConfig } from '@uc/libs/flights/search-results/models';
import { DropdownMenuArrow } from '@uc/assets/images';
import styles from './uc-sort-menu.module.scss';

/* eslint-disable-next-line */
export interface UcSortMenuProps {
  sortOptions: Array<SortMenuConfig>;
  onSort: (sort: any) => void;
}

export function UcSortMenu({ sortOptions, onSort }: UcSortMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = useState<string>('');

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setInitialSortValue = () => {
    let currentSort = '';
    sortOptions.every(section => {
      const selectedOption = section.options.find(option => option.selected === true);
      currentSort = `${section.heading}_${selectedOption?.label}`;
      return !selectedOption;
    });
    setValue(currentSort);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    sortOptions.forEach(section => {
      section.options.forEach(option => {
        const optionKey = `${section.heading}_${option.label}`;
        option.selected = value === optionKey;
      });
    });
    setValue(event.target.value);
    setAnchorEl(null);
    onSort(sortOptions);
  };

  useEffect(setInitialSortValue, []);

  const currentSortBy = value.split('_')[1];
  return (
    <div className={styles.container}>
      <span>
        <span className={styles.sort_label}>Sort by </span>{' '}
        <Button className={styles.current_sort} disableRipple onClick={handleClick} endIcon={<DropdownMenuArrow />}>
          {currentSortBy}
        </Button>
      </span>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {sortOptions.map(section => (
          <MenuItem key={section.heading} disableRipple>
            <FormControl>
              <FormLabel className={styles.section_label} id={section.heading}>
                {section.heading}
              </FormLabel>
              <RadioGroup
                aria-labelledby={section.heading}
                name={section.heading}
                value={value}
                onChange={handleChange}>
                {section.options.map(option => (
                  <FormControlLabel
                    className={styles.option_label}
                    key={option.label}
                    value={`${section.heading}_${option.label}`}
                    control={<Radio disableRipple />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default UcSortMenu;
