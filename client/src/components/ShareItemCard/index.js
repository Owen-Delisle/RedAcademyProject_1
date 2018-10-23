import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// // import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import styles from './styles.js';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

function ShareItemCard(props) {
  const { classes } = props;
  const { item } = props;

  function setItemTitle(url) {
    if (url === '/items') {
      return item.title;
    } else {
      return 'Item Title';
    }
  }

  function setItemDescription(url) {
    if (url === '/items') {
      return item.description;
    } else {
      return 'Item Description';
    }
  }

  return (
    <Card className={classes.card}>
      {/* <CardActionArea> */}
      <CardMedia
        className={classes.media}
        image="https://picsum.photos/200/300/?random"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Grid container className={classes.avatarContainer} spacing={24}>
          <Grid item xs={2}>
            <Avatar
              alt="Remy Sharp"
              src="https://pbs.twimg.com/profile_images/821849411991044096/lQFa_Vly_400x400.jpg"
              className={classes.avatar}
            />
          </Grid>
          <Grid item xs={5}>
            <p>Owen Delisle</p>
          </Grid>
        </Grid>
        <Typography gutterBottom variant="h5" component="h2">
          {setItemTitle(props.location.pathname)}
        </Typography>
        <Typography component="p">
          {setItemDescription(props.location.pathname)}
        </Typography>
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Button size="small" color="primary">
          Borrow
        </Button>
      </CardActions>
    </Card>
  );
}

ShareItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ShareItemCard));
