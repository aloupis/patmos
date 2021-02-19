import React from "react";
import PropTypes from "prop-types";
import { Fab, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link, withRouter } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(() => ({
  fabBtn: {
    float: "right",
    height: "42px",
  },
  backBtn: {
    float: "left",
    marginRight: "10px",
    padding: "10px",
  },
  container: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

const PageWrapper = (props) => {
  const { title, children, newPath, goBackBtn, history, maxWidth } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {title && (
        <Grid item xs={6}>
          {goBackBtn && (
            <Tooltip title={"Move to list"} aria-label={"Move to list"}>
              <IconButton
                color="primary"
                className={classes.backBtn}
                aria-label={"Move to list"}
                onClick={() => history.push(goBackBtn)}
              >
                <KeyboardBackspaceIcon />
              </IconButton>
            </Tooltip>
          )}
          <Typography component="h1" variant="h4">
            {title}
          </Typography>
        </Grid>
      )}
      {newPath && (
        <Grid item xs={6}>
          <Fab
            variant="extended"
            color="secondary"
            aria-label="Add"
            component={Link}
            to={newPath}
            className={classes.fabBtn}
          >
            <AddIcon /> New
          </Fab>
        </Grid>
      )}

      <Grid item xs={12}>
        {children && (
          <Container className={classes.container} maxWidth={maxWidth || false}>
            {children}
          </Container>
        )}
      </Grid>
    </Grid>
  );
};

PageWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  newPath: PropTypes.string,
  goBackBtn: PropTypes.string,
  history: PropTypes.object,
  maxWidth: PropTypes.string,
  onImport: PropTypes.func,
};

export default withRouter(PageWrapper);
