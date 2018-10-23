import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ShareItemCard from '../../components/ShareItemCard';
import Grid from '@material-ui/core/Grid';

import styles from './styles';

const Items = ({ classes, data }) => {
  return (
    <Grid container className={classes.flexContainer} spacing={24}>
      {data.items.map(item => {
        return (
          <Grid item xs={4}>
            <ShareItemCard item={item} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default withStyles(styles)(Items);
