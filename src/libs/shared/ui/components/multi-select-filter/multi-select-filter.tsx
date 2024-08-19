import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import styles from './multi-select-filter.module.scss';

export interface MultiSelectSelectionChangeEvent {
  all: any[];
  selected: any[];
}

export interface MultiSelectFilterProps {
  config: {
    label: string;
    options: Array<{
      label: string;
      selected: boolean;
      value: string;
      iconUrl?: string;
    }>;
  };
  selectionChange: (event: MultiSelectSelectionChangeEvent) => void;
}

export function MultiSelectFilter({ config, selectionChange }: MultiSelectFilterProps) {
  const { label, options } = config;
  const [list, setList] = useState(options);

  useEffect(() => {
    setList(config.options);
  }, [config.options]);

  const handleToggle = (value: any) => () => {
    let newList = [...list];
    if (value.value === -1) {
      // When value is -1 we select/deselect all
      newList.forEach(item => item.selected = !value.selected);
    } else {
      value.selected = !value.selected;
      // In case any value other than -1 is select/deselected, we update 'All' option as per it.
      if (!value.selected) {
        newList[newList.length -1].selected = false;
      }
    }
    const selected = list.filter(item => item.selected);
    selectionChange({ all: newList, selected });
    setList(newList);
  };

  const classes = {
    list: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    listItem: {
      width: '50%',
      whiteSpace: 'nowrap',
    },
    listWeb: {
      padding: 0,
    },
  };

  return (
    <div>
      <div className={styles.heading}>{label}</div>
      <List sx={window.innerWidth < 600 ? classes.list : classes.listWeb}>
        {list.map((option: any, index: number) => {
          const labelId = `checkbox-list-label-${index}`;
          const IconSVG = option.iconSVG;
          const uniqueKey = `${index}_${option.label}`;
          return (
            <ListItem key={uniqueKey} sx={window.innerWidth < 600 ? classes.list : classes.listWeb} dense disablePadding>
              <ListItemButton
                role={undefined}
                className={styles.list_item_button_root}
                onClick={handleToggle(option)}
                disableGutters
                disableRipple>
                <ListItemIcon sx={{ minWidth: 'unset' }}>
                  <Checkbox
                    sx={{
                      color: '#D2D2D2',
                      '&.Mui-checked': { color: '#32996A' },
                      '& .MuiSvgIcon-root': { fontSize: 20 },
                    }}
                    edge="start"
                    checked={option.selected}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                {option.iconSVG && <IconSVG width={20} height={20} style={{ marginRight: '8px' }} />}
                {option.iconUrl && (
                  <img src={option.iconUrl} width={20} height={20} style={{ marginRight: '8px' }} alt="" />
                )}
                <ListItemText id={labelId} primary={option.label} className={styles.option_label} disableTypography />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default MultiSelectFilter;
