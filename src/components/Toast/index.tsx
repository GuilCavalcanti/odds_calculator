import React, { useState, useEffect } from 'react';
import { StylesProvider, Snackbar } from '@material-ui/core'

import { Container, AlertStyled, AlertTitleStyled } from './styles';

interface ToastProps {
  showToast: boolean;
  toastMessageIndex?: number;
  toastStyleIndex?: number;
}

const ToastMessage: React.FC<ToastProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [skipFirstRender, setSkipFirstRender] = useState(1);
  const toastMessage = ['This card has already been added!', 'The card has been removed.', 'Add a new card before deleting another.', 'Backend still in development.']
  const toastStyle = ["error", "info"];

  const toastAlertStyle = (style) => {
    switch(style) {
      case 0:
        return (
          <AlertStyled severity='error'>
            <AlertTitleStyled>{toastStyle[props.toastStyleIndex].charAt(0).toUpperCase() + toastStyle[props.toastStyleIndex].slice(1)}</AlertTitleStyled>
            <strong>{toastMessage[props.toastMessageIndex]}</strong>
          </AlertStyled>);
      case 1:
        return (
          <AlertStyled severity='info'>
            <AlertTitleStyled>{toastStyle[props.toastStyleIndex].charAt(0).toUpperCase() + toastStyle[props.toastStyleIndex].slice(1)}</AlertTitleStyled>
            <strong>{toastMessage[props.toastMessageIndex]}</strong>
          </AlertStyled>);
    }
  }

  useEffect(() => {

    skipFirstRender === 1 
    ? setSkipFirstRender(2)
    : setOpen(true);
    
  }, [props.showToast]);

  return (
    <StylesProvider injectFirst>
      <Container>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={3500} onClose={() => setOpen(false)}>
          {toastAlertStyle(props.toastStyleIndex)}
        </Snackbar>
      </Container>
    </StylesProvider>
  );
}

export default ToastMessage; 