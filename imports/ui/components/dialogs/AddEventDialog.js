import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {orange500, blue500} from 'material-ui/styles/colors'
import DatePicker from 'material-ui/DatePicker'
import PlaceSelect from '../common/PlaceSelect'
import TextInput from '../common/TextInput'

const styles = {
  floatingLabelStyle: {
    color: orange500,
    marginRight: '24px'
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
}

export default class AddNewEventDialog extends React.Component {
  state = {
    open: false,
    selectedPlace: null
  };

  handlePlaceChange = (event, index, selectedPlace) => {
    this.setState({selectedPlace})
  }

  handleDateChange = () => (justNull, selectedDate) => {
    this.setState({selectedDate})
  }

  handleOpen = () => {
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  };

  addEvent = (e) => {
    const eventObject = {
      name: this.state.name,
      placeId: this.state.selectedPlace
    }
    Meteor.call('addEvent', eventObject)
    this.handleClose()
  }

  onInputChange = (e) => {
    e.preventDefault()
    const field = e.target.getAttribute('id').replace('_input', '')
    const newStateElements = {}
    newStateElements[field] = e.target.value
    this.setState(newStateElements)
  }

  render () {
    // console.log('¯\_(ツ)_/¯: this.state', this.state);
    const actions = [
      <FlatButton
        label='Anuluj'
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='Dodaj wydarzenia'
        primary
        disabled={!(this.state.selectedPlace && this.state.name)}
        onTouchTap={this.addEvent}
      />
    ]

    return (
      <div>
        <RaisedButton label='Dodaj wydarzenie' onTouchTap={this.handleOpen} />
        <Dialog
          title='Dodaj wydarzenie'
          actions={actions}
          modal
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{zIndex: 10}}
          autoScrollBodyContent
        >
          <TextInput inputId='name_input' inputLabel='Nazwa' onInputChange={this.onInputChange} /><br />
          <PlaceSelect
            selectedPlace={this.state.selectedPlace}
            handlePlaceChange={this.handlePlaceChange}
            places={this.props.places}
          /><br />
          <DatePicker hintText='Data' onChange={this.handleDateChange}
            textFieldStyle={{...styles.floatingLabelStyle}}
          />
          <TextInput inputId='fb_event_link_input' inputLabel='Link do wydarzenia na Facebook' onInputChange={this.onInputChange} /><br />
          <TextInput inputId='description_input' inputLabel='Opis' onInputChange={this.onInputChange} />
        </Dialog>
      </div>
    )
  }
}
