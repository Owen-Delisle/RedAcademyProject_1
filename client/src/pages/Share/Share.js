import { withStyles } from '@material-ui/core/styles';
import ShareItemCard from '../../components/ShareItemCard';
import ShareItemForm from '../../components/ShareItemForm';
import Grid from '@material-ui/core/Grid';

import React from 'react';

import styles from './styles';

const Share = ({ classes, data }) => {
  console.log('data', data);
  return (
    <Grid container className={classes.flexContainer} spacing={24}>
      <Grid item xs={4}>
        <ShareItemCard />
      </Grid>
      <Grid item xs={4}>
        <ShareItemForm tags={data.tags} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Share);
