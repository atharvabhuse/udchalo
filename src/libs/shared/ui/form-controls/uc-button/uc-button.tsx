import { styled } from '@mui/material';
import Button from '@mui/material/Button';

/* eslint-disable-next-line */
export interface UcButtonProps {}

export const UcButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
});

export default UcButton;
