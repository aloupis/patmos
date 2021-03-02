import { Button } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

export const CancelBtn = withStyles((theme) => ({
  root: {
    color: theme.palette.button ? theme.palette.button.main : null,
    marginLeft: '10px',
    marginRight: '10px',
    '&:hover': {
      backgroundColor: blueGrey[50],
      color: theme.palette.button ? theme.palette.button.dark : null,
    },
  },
}))(Button);
