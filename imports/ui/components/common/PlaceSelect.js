import React from 'react';
import {orange500, blue500} from 'material-ui/styles/colors';
import Select from './Select';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  floatingLabelStyle: {
    color: orange500,
    marginRight:'24px',
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

export default class PlaceSelect extends React.Component {
  state = {
    selectedPlace: this.props.selectedPlace,
  };

  handlePlaceChange = (event, index, selectedPlace) => {
    this.props.handlePlaceChange(event, index, selectedPlace);
    this.setState({selectedPlace});
  }

  render() {
    const places = this.props.places.map((place, index)=>{
      return <MenuItem key={place._id} value={place._id} primaryText={place.name} />
    });
    return (
          <Select
            selectedOption={this.state.selectedPlace}
            handleOptionChange={this.handlePlaceChange}
            floatingLabelText="Lokalizacja"
            selectOptions={this.props.places}
          />
    );
  }
}