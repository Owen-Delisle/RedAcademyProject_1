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
  console.log('Item', item);
  return (
    <Card className={classes.card}>
      {/* <CardActionArea> */}
      <CardMedia
        component="img"
        className={classes.media}
        src={item.imageurl}
      />
      <CardContent>
        <Grid container className={classes.avatarContainer} spacing={24}>
          <Grid item xs={2}>
            <Avatar
              alt="Remy Sharp"
              src="http://www.carderator.com/assets/avatar_placeholder_small.png"
              className={classes.avatar}
            />
          </Grid>
          <Grid item xs={5}>
            Owen Delisle
          </Grid>
        </Grid>
        <Typography>{item.title}</Typography>
        <Typography component="p">{item.description}</Typography>
        <Grid item xs={5}>
          <div className={classes.tagsGrid}>
            {item.tags.map(tag => tag.title).join(', ')}
          </div>
        </Grid>
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Button size="small" color="primary" className={classes.borrowButton}>
          Borrow
        </Button>
      </CardActions>
    </Card>
  );
}

ShareItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShareItemCard);
