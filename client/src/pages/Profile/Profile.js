import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProfileCard from '../../components/ProfileCard';

import styles from './styles';

const Profile = ({ classes, user }) => {
  console.log('viewer', user);
  return (
    <Grid container className={classes.flexContainer} spacing={24}>
      <ProfileCard />
    </Grid>
  );
};

export default withStyles(styles)(Profile);
