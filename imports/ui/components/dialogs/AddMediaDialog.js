import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {orange500} from 'material-ui/styles/colors'
import SelectField from 'material-ui/SelectField'
import Select from '../common/Select'
import MenuItem from 'material-ui/MenuItem'
import {Events} from '../../../api/events.js'
import TextInput from '../common/TextInput'
import PlaceSelect from '../common/PlaceSelect'
import { normalizeStringToURLPath } from '../../../helpers'

export default class AddMediaDialog extends React.Component {
  state = {
    open: false,
    placeId: null,
    mediaType: 'youtubeVideo',
    eventId: null,
    videoLink: null
  }

  handleOpen = () => {
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  };

  addMedia = () => {
    const mediaObject = {
      name: this.state.name,
      placeId: this.state.placeId,
      eventId: this.state.eventId,
      mediaType: this.state.mediaType,
      description: this.state.description
    }

    if (this.state.mediaType === 'youtubeVideo') {
      mediaObject.videoLink = this.state.videoLink
      mediaObject.youtubeId = this.state.videoLink.replace(/http.*watch.*=/gi, '')
    }

    if (this.state.mediaType === 'mp3' && this.state.mp3 && this.state.uploadedFile) {
      const normalizedFileName = normalizeStringToURLPath(this.state.mp3.name)
      mediaObject.filename = normalizedFileName
      Meteor.call('uploadMp3File', normalizedFileName, this.state.uploadedFile)
    }

    if (this.state.mediaType === 'bandcamp') {
      mediaObject.bandcampIframe = this.state.bandcamp
    }

    Meteor.call('addMedia', mediaObject)
    this.handleClose()
    // TODO get rid of this reload by utilizing createContainer properly
    // location.reload()
  }

  handlePlaceChange = (event, index, selectedPlace) => {
    this.setState({placeId: selectedPlace, placeEvents: Events.find({placeId: selectedPlace})})
  }

  handleEventChange = (event, index, eventId) => {
    this.setState({eventId})
  }

  handleMediaTypeChange = (event, index, mediaType) => {
    this.setState({mediaType})
  }

  onInputChange = (e) => {
    const field = e.target.getAttribute('id').replace('_input', '')
    const newStateElements = {}
    newStateElements[field] = e.target.value
    // console.log('¯\_(ツ)_/¯: this.state', this.state);
    this.setState(newStateElements)
    // console.log('¯\_(ツ)_/¯: this.state', this.state);
  }

  render () {
    const events = Events.find({placeId: this.state.placeId}).fetch().map((event, index) => {
      return <MenuItem key={event._id} value={event._id} primaryText={event.name} />
    })

    const mediaTypes = [
      <MenuItem key={1} value={'youtubeVideo'} primaryText={'Youtube - link do video'} />,
      <MenuItem key={2} value={'mp3'} primaryText={'Prześlij mp3'} />,
      <MenuItem key={3} value={'picture'} primaryText={'Prześlij zdjęcie'} disabled />,
      <MenuItem key={4} value={'bandcamp'} primaryText={'Embed bandcamp iframe'} />
    ]

    const actions = [
      <FlatButton
        label='Anuluj'
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='Dodaj media'
        primary
        disabled={!(this.state.placeId && (this.state.videoLink || this.state.mp3 || this.state.bandcamp))}
        onTouchTap={this.addMedia}
      />
    ]
    return (
      <div>
        <RaisedButton label='Dodaj media' onTouchTap={this.handleOpen} />
        <Dialog
          title='Dodaj media'
          actions={actions}
          modal
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{zIndex: 10}}
          autoScrollBodyContent
        >
          <PlaceSelect
            selectedPlace={this.state.placeId}
            handlePlaceChange={this.handlePlaceChange}
            places={this.props.places}
          />
          <br />
          <Select
            value={this.state.eventId}
            handleOptionChange={this.handleEventChange}
            floatingLabelText='Wydarzenie'
            disabled={!this.state.placeId}
            selectOptions={this.state.placeEvents || []}
          >
            {events}
          </Select>
          <br />
          <SelectField
            value={this.state.mediaType}
            onChange={this.handleMediaTypeChange}
            floatingLabelText='Rodzaj pliku'
            floatingLabelStyle={{color: orange500}}
            maxHeight={400}
            style={{width: '100%'}}
            disabled={false}
          >
            {mediaTypes}
          </SelectField>
          <br />
          {
            this.state.mediaType === 'mp3'
              ? <div>
                <RaisedButton
                  containerElement='label'
                  label='Prześlij plik mp3'>
                  <input
                    ref={(input) => {
                      this.mp3Input = input
                    }}
                    type='file'
                    style={{display: 'none'}}
                    onChange={(event, template) => {
                      var file = event.currentTarget.files[0]
                      var reader = new FileReader()
                      reader.onload = (fileLoadEvent) => {
                        this.setState({mp3: file, uploadedFile: reader.result})
                      }
                      reader.readAsBinaryString(file)
                    }}
                  />
                </RaisedButton>
              </div>
              : null
          }
          {
            this.state.mediaType === 'youtubeVideo'
              ? <TextInput inputId='videoLink_input'
                inputLabel='YouTube video link'
                onInputChange={this.onInputChange}
                disabled={!this.state.placeId}
              />
              : null
          }
          {
            this.state.mediaType === 'bandcamp'
              ? <TextInput inputId='bandcamp_input'
                inputLabel='Bandcamp iframe'
                onInputChange={this.onInputChange}
                disabled={!this.state.placeId}
              />
              : null
          }
          <br />
          <TextInput inputId='name_input'
            inputLabel='Nazwa pliku'
            onInputChange={this.onInputChange}
            disabled={!this.state.placeId}
          />
          <TextInput inputId='description_input'
            inputLabel='Opis'
            onInputChange={this.onInputChange}
            disabled={!this.state.placeId}
            multiLine
          />
        </Dialog>
      </div>
    )
  }
}
