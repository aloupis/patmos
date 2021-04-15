import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  link: {
    color: '#007ac2',
    textDecoration: 'none',
    fontWeight: 400,
  },
}));

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
// eslint-disable-next-line react/display-name
const Link1 = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RouterLink innerRef={ref} {...props} />
));

const RouteLink = ({ to, children }) => {
  const classes = useStyles();
  return (
    <Link underline="none" className={classes.link} component={Link1} to={to}>
      {children}
    </Link>
  );
};

RouteLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default RouteLink;
