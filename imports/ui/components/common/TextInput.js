import React from 'react';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';

const styles = {
  floatingLabelStyle: {
    color: orange500,
    marginRight:'24px',
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

export default class TextInput extends React.Component {
  onInputChange = (e) => {
    const field = e.target.getAttribute('id').replace('_input', '');
    const newStateElements = {};
    newStateElements[field] = e.target.value;
    this.setState(newStateElements)
  }

  render() {
    return (
      <TextField id={this.props.inputId}
                 floatingLabelText={this.props.inputLabel}
                 floatingLabelStyle={{...styles.floatingLabelStyle, multiLine: true}}
                 floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                 onChange={this.props.onInputChange}
      />
    );
  }
}