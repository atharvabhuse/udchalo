import { styled } from '@mui/material';
import styles from './uc-card.module.scss';

/* eslint-disable-next-line */
export interface UcCardProps {}

export const UcCard = styled('div')({
  borderRadius: '16px',
  border: '1px solid #EAF0F6',
  background: '#FFF',
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.10)',
  padding: '12px',
});

export default UcCard;
