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

  handleVenueTypeChange = (event, index, type) => {
    this.setState({type});
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

  onInputChange = (e) => {
    const field = e.target.getAttribute('id').replace('_input', '');
    const newStateElements = {};
    newStateElements[field] = e.target.value;
    this.setState(newStateElements)
  }

  render() {
    const venueTypes = [
      <MenuItem key={1} value={'Klub'} primaryText={'Klub'}/>,
      <MenuItem key={2} value={'Pub'} primaryText={'Pub'}/>,
      <MenuItem key={3} value={'Sala koncertowa'} primaryText={'Sala koncertowa'}/>,
      <MenuItem key={4} value={'Inne'} primaryText={'Inne'}/>,
      <MenuItem key={5} value={'Dom kultury'} primaryText={'Dom kultury'}/>,
      <MenuItem key={6} value={'Centrum kultury'} primaryText={'Centrum kultury'}/>,
      <MenuItem key={7} value={'Filharmonia'} primaryText={'Filharmonia'}/>,
      <MenuItem key={8} value={'Radio'} primaryText={'Radio'}/>,
      <MenuItem key={9} value={'Telewizja'} primaryText={'Telewizja'}/>,
    ];
    const actions = [
      <FlatButton label="Anuluj" primary={true} onTouchTap={this.handleClose}/>,
      <FlatButton label="Dodaj miejsce" primary={true} onTouchTap={this.addPlace}
                  disabled={!((this.state.address || this.state.position) && this.state.name)}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Dodaj miejsce" onTouchTap={this.handleOpen}/>
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
              this.setState({
                place, position: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }
              })
            }}
            types={['address']} //TODO needed?
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
            disabled={!(this.state.position)}
          >
            { venueTypes }
          </SelectField>
          <br />
          <TextInput inputId="description_input" inputLabel="Opis" onChange={this.onInputChange} multiLine={true}/>
          <TextInput inputId="www_input" inputLabel="WWW" onChange={this.onInputChange}/>
          <TextInput inputId="fb_input" inputLabel="Facebook" onChange={this.onInputChange}/>
          <TextInput inputId="instagram_input" inputLabel="Instagram" onChange={this.onInputChange}/>
        </Dialog>
      </div>
    );
  }
}