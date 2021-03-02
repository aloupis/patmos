import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '75vh' }}
  >
    <Grid item xs={3}>
      <CircularProgress size={100} />
    </Grid>
  </Grid>
);

export default Loading;
