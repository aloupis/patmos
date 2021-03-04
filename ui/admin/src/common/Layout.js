import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LayoutStyles from './LayoutStyles';
import TopBar from './TopBar';
import SideNav from './SideNav';

const useStyles = makeStyles(LayoutStyles);

const Layout = ({ children }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar drawerIsOpen={open} openDrawer={handleDrawerOpen} />
      <SideNav drawerIsOpen={open} closeDrawer={handleDrawerClose} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
