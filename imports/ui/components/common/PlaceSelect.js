import React from 'react'
import Select from './Select'

export default class PlaceSelect extends React.Component {
  state = {
    selectedPlace: this.props.selectedPlace
  };

  handlePlaceChange = (event, index, selectedPlace) => {
    this.props.handlePlaceChange(event, index, selectedPlace)
    this.setState({selectedPlace})
  }

  render () {
    return (
      <Select
        selectedOption={this.state.selectedPlace}
        handleOptionChange={this.handlePlaceChange}
        floatingLabelText='Lokalizacja'
        selectOptions={this.props.places}
      />
    )
  }
}
