import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, blue500} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Media } from '../../../api/media.js';
import { Places } from '../../../api/places.js';
import { Events } from '../../../api/events.js';
import TextField from 'material-ui/TextField';
import PlaceSelect from '../common/PlaceSelect';
const styles = {
  floatingLabelStyle: {
    color: orange500,
    marginRight:'24px'
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

export default class AddMediaDialog extends React.Component {
  state = {
    open: false,
    placeId: null,
    mediaType: 'youtubeVideo',
    eventId: null,
    videoLink: null,
  }

  handleOpen = () => {
    let mediaSub = Meteor.subscribe('media');
    //console.log('¯\_(ツ)_/¯: mediaSub', mediaSub);
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  addMedia = () => {
    const mediaObject = {
      name: this.state.name,
      mediaType: this.state.mediaType,
      videoLink: this.state.videoLink,
      videoId: this.state.videoLink.replace(/http.*watch.*=/gi, ''),
      placeId: this.state.placeId,
      eventId: this.state.eventId,
      description: this.state.description,
    }
    this.handleClose();
    Meteor.call('addMedia', mediaObject);
    //TODO get rid of this reload by utilizing createContainer properly
    location.reload();
  }

  handlePlaceChange = (event, index, selectedPlace) => {
    this.setState({placeId: selectedPlace});
  }

  handleEventChange = (event, index, eventId) => {
    this.setState({eventId});
  }

  handleMediaTypeChange = (event, index, mediaType) => {
    this.setState({mediaType});
  }

  onInputChange = (e) => {
    const field = e.target.getAttribute('id').replace('_input', '');
    const newStateElements = {};
    newStateElements[field] = e.target.value;
    //console.log('¯\_(ツ)_/¯: this.state', this.state);
    this.setState(newStateElements)
    //console.log('¯\_(ツ)_/¯: this.state', this.state);
  }

  render() {
    const events = Events.find({placeId: this.state.placeId}).fetch().map((event, index)=>{
      return <MenuItem key={event._id} value={event._id} primaryText={event.name} />
    });

    const mediaTypes = [
      <MenuItem key={1} value={'youtubeVideo'} primaryText={'Video - Youtube'} />,
      <MenuItem key={2} value={'soundCloudMp3'} primaryText={'MP3 - SoundCloud'} disabled={true}/>,
      <MenuItem key={3} value={'picture'} primaryText={'Zdjęcie'} disabled={true}/>,
    ];

    const actions = [
      <FlatButton
        label="Anuluj"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Dodaj media"
        primary={true}
        disabled={!(this.state.placeId && this.state.videoLink)}
        onTouchTap={this.addMedia}
      />,
    ];
    return (
      <div>
        <RaisedButton label="Dodaj media" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dodaj media"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{zIndex: 10}}
          autoScrollBodyContent={true}
        >
          <PlaceSelect
            selectedPlace={this.state.selectedPlace}
            handlePlaceChange={this.handlePlaceChange}
            places={this.props.places}
          />
          <br />
          <SelectField
            value={this.state.eventId}
            onChange={this.handleEventChange}
            floatingLabelText="Wydarzenie"
            floatingLabelStyle={{color: orange500}}
            maxHeight={400}
            disabled={!this.state.placeId}
          >
            { events }
          </SelectField>
          <br />
          <SelectField
            value={this.state.mediaType}
            onChange={this.handleMediaTypeChange}
            floatingLabelText="Rodzaj pliku"
            floatingLabelStyle={{color: orange500}}
            maxHeight={400}
            disabled={!this.state.placeId}
          >
            { mediaTypes }
          </SelectField>
          <br />
          <TextField id="name_input"
                     floatingLabelText="Nazwa pliku"
                     floatingLabelStyle={styles.floatingLabelStyle}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     onChange={this.onInputChange}
                     disabled={!this.state.placeId}
          />
          <br />
          <TextField id="videoLink_input"
                     floatingLabelText="YouTube video link"
                     floatingLabelStyle={styles.floatingLabelStyle}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     onChange={this.onInputChange}
                     disabled={!this.state.placeId}
          />
          <br />
          <TextField id="description_input"
                     floatingLabelText="Opis"
                     floatingLabelStyle={styles.floatingLabelStyle}
                     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                     onChange={this.onInputChange}
                     disabled={!this.state.placeId}
                     multiLine={true}
          />

        </Dialog>
      </div>
    );
  }
}
