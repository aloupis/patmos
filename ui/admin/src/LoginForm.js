import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import useAuth from './useAuth';
import useForm from './useForm';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: '75vh',
    fontFamily: 'Inter var',
    fontSize: '16px',
  },
  card: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
    boxShadow:
      '0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03)',
    '& .MuiCardHeader-title': {
      color: '#637084',
      fontWeight: 600,
      fontSize: '20px',
    },
  },
  blueAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#007ac2',
  },
  inputContainer: {
    marginBottom: '20px',
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const { loginUser, error } = useAuth();

  const { values, handleChange } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const submitForm = async (e) => {
    e.preventDefault();
    await loginUser(values);
    window.location.reload(); // TODO: fix this somehow
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
        <CardHeader title="Patmos Watersports Admin" />
        <CardContent>
          <form onSubmit={submitForm}>
            <div className={classes.inputContainer}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </div>
            <div className={classes.inputContainer}>
              <TextField
                id="password"
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={handleChange}
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
