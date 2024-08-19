import { styled } from '@mui/material/styles';
import React from 'react';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const InfoToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: '12px',
    maxWidth: '235px',
    marginTop: '0px !important',
    border: '1px solid #dadde9',
    borderRadius: '8px',
    background: '#FFF',
    boxShadow: '0px 0px 7px 0px rgba(0, 0, 0, 0.15)',
    color: '#494545',
    fontFamily: 'Open Sans',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
  },
}));

export default InfoToolTip;
