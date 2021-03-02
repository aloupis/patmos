import { Box, withStyles } from '@material-ui/core';

export const ActionFormButtons = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& a:hover, & a:focus': {
      textDecoration: 'none',
    },
    '& svg': {
      marginRight: '8px',
    },
  },
}))(Box);
