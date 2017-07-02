import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Places } from '../api/places.js';
import { Events } from '../api/events.js';
import DatePicker from 'material-ui/DatePicker';

const styles = {
  floatingLabelStyle: {
    color: orange500,
    marginRight:'24px',
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

export default class AddNewEventModal extends React.Component {
  state = {
    open: false,
    selectedPlace: null,
  };

  handlePlaceChange = (event, index, selectedPlace) => {
    //console.log('¯\_(ツ)_/¯: event, index, selectedPlace', event, index, selectedPlace);
    this.setState({selectedPlace});
  }

  handleDateChange = (justNull, selectedDate) => {
    //console.log('¯\_(ツ)_/¯: event, index, selectedDate', selectedDate);
    this.setState({selectedDate});
  }

  handleOpen = () => {
    this.setState({open: true});
    //console.log(Places.find().fetch())
  };

  handleClose = () => {
    this.setState({open: false});
  };

  addEvent = (e) => {
    //console.log('¯\_(ツ)_/¯: e', e);
    const eventObject = {
      name: this.state.name,
      placeId: this.state.selectedPlace,
    }
    Meteor.call('addEvent', eventObject)
    this.handleClose();
  }

  onInputChange = (e) => {
    const field = e.target.getAttribute('id').replace('_input', '');
    const newStateElements = {};
    newStateElements[field] = e.target.value;
    this.setState(newStateElements)
  }

  render() {
    //console.log('¯\_(ツ)_/¯: this.state', this.state);
    const actions = [
      <FlatButton
        label="Anuluj"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Dodaj wydarzenia"
        primary={true}
        disabled={!(this.state.selectedPlace && this.state.name)}
        onTouchTap={this.addEvent}
      />,
    ];
    const places = Places.find().fetch().map((place, index)=>{
      return <MenuItem key={place._id} value={place._id} primaryText={place.name} />
    });

    return (
      <div>
        <RaisedButton label="Dodaj wydarzenie" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dodaj wydarzenie"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{zIndex: 10}}
          autoScrollBodyContent={true}
        >
          <TextField id="name_input"
                     floatingLabelText="Nazwa"
                     floatingLabelStyle={{...styles.floatingLabelStyle, multiLine: true}}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     onChange={this.onInputChange}
          />
          <br />
          <SelectField
            value={this.state.selectedPlace}
            onChange={this.handlePlaceChange}
            floatingLabelText="Lokalizacja"
            floatingLabelStyle={{color: orange500}}
            maxHeight={400}
          >
            { places }
          </SelectField>
          <br />
          <DatePicker hintText="Data" onChange={this.handleDateChange}
                      textFieldStyle={{...styles.floatingLabelStyle}}
          />
          <TextField id="fb_event_link_input"
                     floatingLabelText="Link do wydarzenia na Facebook"
                     floatingLabelStyle={{...styles.floatingLabelStyle, multiLine: true}}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     onChange={this.onInputChange}
          />
          <br />
          <TextField id="description_input"
                     floatingLabelText="Opis"
                     floatingLabelStyle={{...styles.floatingLabelStyle, multiLine: true}}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     onChange={this.onInputChange}
                     multiLine={true}
          />
        </Dialog>
      </div>
    );
  }
}