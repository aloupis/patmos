import { IconButton, Fab } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

export const DeleteBtn = withStyles((theme) => ({
  root: {
    '& svg': {
      margin: '0!important',
    },
    '&:hover': {
      backgroundColor: theme.palette.error.main,
      color: 'white',
    },
  },
}))(IconButton);
export const DeleteFabBtn = withStyles((theme) => ({
  root: {
    marginTop: '10px',
    '&:hover': {
      backgroundColor: theme.palette.error.main,
      color: 'white',
    },
  },
}))(Fab);
