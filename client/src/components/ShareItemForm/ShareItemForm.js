import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles.js';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Checkbox, ListItemText } from '@material-ui/core';

class ShareForm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { tags } = this.props;
    console.log('tags', tags[0].title);
    return (
      <form className={classes.shareItemForm}>
        <Typography variant="display3">Share. Borrow. Prosper.</Typography>
        <Button
          type="submit"
          className={classes.formButton}
          variant="contained"
          size="large"
          color="secondary"
          disabled={
            false // @TODO: This prop should depend on pristine or valid state of form
          }
        >
          SELECT AN IMAGE
        </Button>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="fullname">Title</InputLabel>
          {/* @TODO: Wrap in a Final Form <Field /> */}
          <Input
            id="fullname"
            type="text"
            inputProps={{
              autoComplete: 'off'
            }}
            value={''}
          />
          {/* @TODO: Close Final Form <Field /> */}
        </FormControl>
        <FormControl fullWidth className={classes.formControl}>
          {/* @TODO: Wrap in a Final Form <Field /> */}
          <TextField
            id="filled-multiline-flexible"
            label="Description"
            multiline
            rowsMax="4"
            value={this.state.multiline}
            onChange={this.handleChange('multiline')}
            className={classes.textField}
            margin="normal"
            variant="filled"
          />
          {/* @TODO: Close Final Form <Field /> */}
          <Select
            className={classes.multiline}
            value={this.state.age}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
          >
            {tags.map(tag => (
              <MenuItem key={tag.id} value={tag.title}>
                <Checkbox />
                {tag.title}
              </MenuItem>
            ))}
          </Select>
          <Button
            type="submit"
            className={classes.formButton}
            variant="contained"
            size="large"
            color="secondary"
            disabled={
              false // @TODO: This prop should depend on pristine or valid state of form
            }
          >
            SHARE
          </Button>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(ShareForm);
