import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SnackbarContext = React.createContext();

const AUTO_DISMISS = 5000;

const SnackbarProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [open, setOpen] = React.useState(false);

  const showMessage = (msg) => {
    setOpen(true);
    setMessage(msg);
  };

  const showGenericErrorMessage = () => {
    setOpen(true);
    setMessage('An error occured!');
  };

  const handleClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider value={{ showMessage, showGenericErrorMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={AUTO_DISMISS}
        onClose={handleClose}
        message={message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.object,
};

export { SnackbarContext, SnackbarProvider };
