import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Autocomplete from 'react-google-autocomplete';
import TextInput from '../common/TextInput';
import {orange500, blue500} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const searchBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(51.197568, 22.733813),
  new google.maps.LatLng(51.288109, 22.4356302)
);

export default class AddNewPlaceModal extends React.Component {
  state = {
    open: false,
  };

  handleVenueTypeChange = (event, index, placeId) => {
    this.setState({placeId});
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  addPlace = () => {
    const placeObject = {
      name: this.state.name,
      description: this.state.description,
      type: this.state.type,
      position: this.state.position,
      www: this.state.www,
      insta: this.state.insta,
      fb: this.state.fb,
    }
    this.handleClose();
    Meteor.call('addPlace', placeObject);
    //TODO get rid of this reload by utilizing createContainer properly
    location.reload();
  }

  render() {
    const venueTypes = [
      <MenuItem key={1} value={'Klub'} primaryText={'Video - Youtube'} />,
      <MenuItem key={2} value={'Pub'} primaryText={'MP3 - SoundCloud'} disabled={true}/>,
      <MenuItem key={3} value={'Sala koncertowa'} primaryText={'Zdjęcie'} disabled={true}/>,
      <MenuItem key={4} value={'Inne'} primaryText={'Inne'} disabled={true}/>,
    ];
    const actions = [
      <FlatButton label="Anuluj" primary={true} onTouchTap={this.handleClose}/>,
      <FlatButton label="Dodaj miejsce" primary={true} onTouchTap={this.addPlace}
                  disabled={!((this.state.address || this.state.position) && this.state.name)}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Dodaj miejsce" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dodaj miejsce"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{zIndex: 10}}
          autoScrollBodyContent={true}
        >
          <Autocomplete
            style={{width: '100%'}}
            onPlaceSelected={(place) => {
              if (Object.keys(place).length == 1 && place.name) {
                console.log('!!! TODO: Implement saving place by address')
              } else {
                this.setState({ place,position: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                } })
              }
            }}
            types={['establishment']} //TODO needed?
            componentRestrictions={{country: "pl"}}
            bounds={searchBounds}
          />
          <TextInput inputId="name_input" inputLabel="Nazwa" onChange={this.onInputChange}/><br />
          <SelectField
            value={this.state.type}
            onChange={this.handleVenueTypeChange}
            floatingLabelText="Rodzaj lokalu"
            floatingLabelStyle={{color: orange500}}
            maxHeight={400}
            disabled={!(this.state.position && this.state.name)}
          >
            { venueTypes }
          </SelectField>
          <br />
          <TextInput inputId="description_input" inputLabel="Nazwa" onChange={this.onInputChange}/><br />
          <TextInput inputId="www_input" inputLabel="WWW" onChange={this.onInputChange}/><br />
          <TextInput inputId="fb_input" inputLabel="Facebook" onChange={this.onInputChange}/><br />
          <TextInput inputId="instagram_input" inputLabel="Instagram" onChange={this.onInputChange}/>
        </Dialog>
      </div>
    );
  }
}