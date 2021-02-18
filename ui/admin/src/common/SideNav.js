import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DescriptionIcon from "@material-ui/icons/Description";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import SettingsIcon from "@material-ui/icons/Settings";
import PhotoIcon from "@material-ui/icons/Photo";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TimelineIcon from "@material-ui/icons/Timeline";
import LayoutStyles from "./LayoutStyles";

const useStyles = makeStyles(LayoutStyles);

const SideNav = ({ drawerIsOpen, closeDrawer }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={drawerIsOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={closeDrawer}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button to="/" key="Dashboard" component={Link}>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button to="/posts" key="Posts" component={Link}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Posts" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button to="/services" key="Services" component={Link}>
          <ListItemIcon>
            <DirectionsBoatIcon />
          </ListItemIcon>
          <ListItemText primary="Services" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button to="/gallery" key="Gallery" component={Link}>
          <ListItemIcon>
            <PhotoIcon />
          </ListItemIcon>
          <ListItemText primary="Gallery" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button to="/settings" key="Settings" component={Link}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

SideNav.propTypes = {
  drawerIsOpen: PropTypes.bool,
  closeDrawer: PropTypes.func,
};

export default SideNav;
