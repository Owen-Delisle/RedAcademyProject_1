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
import { Form, Field, FormSpy } from 'react-final-form';
import {
  updateNewItem,
  resetNewItem,
  resetNewItemImage
} from '../../redux/modules/ShareItemPreview.js';
import { connect } from 'react-redux';

class ShareForm extends Component {
  constructor() {
    super();
    this.fileInput = React.createRef();
    this.state = {
      fileSelected: '',
      done: false,
      selectedTags: []
    };
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  dispatchUpdate(values, tags, updateNewItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        console.log(imageurl);
        updateNewItem({
          imageurl
        });
      });
    }
    updateNewItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  handleSelectTag(event) {
    this.setState({ selectedTags: event.target.value });
  }

  handleSelectFile(event) {
    this.setState({ fileSelected: this.fileInput.current.files[0] });
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  render() {
    const { classes, tags, updateNewItem } = this.props;
    return (
      <Form
        onSubmit={(e, form) => this.submitTheForm(e, form)}
        render={({ handleSubmit, pristine, invalid }) => (
          <form className={classes.shareItemForm}>
            <FormSpy
              subscription={{ values: true }}
              component={({ values }) => {
                if (values) {
                  this.dispatchUpdate(values, tags, updateNewItem);
                }
                return '';
              }}
            />
            <Typography variant="display3">Share. Borrow. Prosper.</Typography>
            <Field
              // inputProps={{ ...input }}
              name="imageurl"
              render={({ input, meta }) => (
                <React.Fragment>
                  {!this.state.fileSelected ? (
                    <Button
                      onClick={() => {
                        this.fileInput.current.click();
                      }}
                    >
                      <Typography>Select Image</Typography>
                    </Button>
                  ) : (
                    <Button onClick={() => this.resetFileInput()}>
                      <Typography>Reset Image</Typography>
                    </Button>
                  )}
                  <input
                    type="file"
                    ref={this.fileInput}
                    accept="image/*"
                    hidden
                    onChange={event => this.handleSelectFile(event)}
                  />
                </React.Fragment>
              )}
            />
            <FormControl fullWidth className={classes.formControl}>
              {/* @TODO: Wrap in a Final Form <Field /> */}
              <Field
                name="title"
                render={({ input, meta }) => (
                  <TextField
                    id="filled-multiline-flexible"
                    rowsMax="4"
                    inputProps={{ ...input }}
                    className={classes.textField}
                    margin="normal"
                  />
                )}
              />
              {/* @TODO: Close Final Form <Field /> */}
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              {/* @TODO: Wrap in a Final Form <Field /> */}
              <Field
                name="description"
                render={({ input, meta }) => (
                  <TextField
                    id="filled-multiline-flexible"
                    rowsMax="4"
                    inputProps={{ ...input }}
                    className={classes.textField}
                    margin="normal"
                  />
                )}
              />

              {/* @TODO: Close Final Form <Field /> */}
              <Field name="tags">
                {({ input, meta }) => (
                  <Select
                    className={classes.multiline}
                    multiple
                    renderValue={selectedTags => {
                      return this.generateTagsText(tags, selectedTags);
                    }}
                    value={this.state.selectedTags}
                    onChange={event => this.handleSelectTag(event)}
                  >
                    {tags.map(tag => (
                      <MenuItem key={tag.id} value={tag.id}>
                        <Checkbox
                          checked={this.state.selectedTags.indexOf(tag.id) > -1}
                        />
                        {tag.title}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </Field>
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
        )}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateNewItem(item) {
    dispatch(updateNewItem(item));
  },
  resetNewItem() {
    dispatch(resetNewItem());
  },
  resetNewItemImage() {
    dispatch(resetNewItemImage());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareForm));
