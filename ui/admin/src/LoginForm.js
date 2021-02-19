import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "70vh",
    fontFamily: "Inter var",
    fontSize: "16px",
  },
  card: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
    boxShadow:
      "0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03)",
    "& .MuiCardHeader-title": {
      color: "#637084",
      fontWeight: 600,
      fontSize: "20px",
    },
  },
  blueAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#007ac2",
  },
  inputContainer: {
    marginBottom: "20px",
  },
}));

const url = "http://localhost:7000/login";

const LoginForm = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (event) => {
    event.preventDefault();

    const options = {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      credentials: "include",
      body: `email=${email}&password=${password}`,
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            alert("Email not found, please retry");
          }
          if (response.status === 401) {
            alert("Email and password do not match, please retry");
          }
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.cookie = "isAuthenticated=true";
          localStorage.setItem("isAuthenticated", true);
          authContext.login();
          history.push("/");
        }
      });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.wrapper}
    >
      <Card className={classes.card}>
        <CardHeader
          // avatar={
          //   <Avatar
          //     aria-label="ComPASS Premium Portal"
          //     src={logo}
          //     className={classes.blueAvatar}
          //   />
          // }
          title="Patmos Watersports Admin"
          // subheader={t("ACCEPT_TERMS.SUBHEADER")}
        />
        <CardContent>
          <form onSubmit={submitForm}>
            <div className={classes.inputContainer}>
              <TextField
                required
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className={classes.inputContainer}>
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default LoginForm;
