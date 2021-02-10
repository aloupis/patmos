import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const logoutHandler = () => {
    authContext.logout();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Admin
          </Typography>
          <Button color="inherit" onClick={logoutHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
