import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import { DeleteBtn } from './DeleteBtn';
import { CancelBtn } from './CancelBtn';

const DeleteConfirmationButton = (props) => {
  const { size, onConfirm } = props;
  const [isOpen, setIsOpen] = useState(false);

  const renderDeleteButton = () => (
    <DeleteBtn size={size} onClick={() => setIsOpen(true)}>
      <DeleteIcon />
    </DeleteBtn>
  );

  return (
    <>
      <Tooltip title="Delete" aria-label="Delete" placement="top">
        {renderDeleteButton()}
      </Tooltip>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete entry</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete the entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelBtn onClick={() => setIsOpen(false)} color="primary" autoFocus>
            CANCEL
          </CancelBtn>
          <Button
            onClick={() => {
              onConfirm();
              setIsOpen(false);
            }}
            color="primary"
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteConfirmationButton.propTypes = {
  size: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmationButton;
