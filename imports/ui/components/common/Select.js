import React from 'react'
import {orange500, blue500} from 'material-ui/styles/colors'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class Select extends React.Component {
  state = {
    selectedOption: this.props.selectedOption
  };

  handleOptionChange = (event, index, selectedOption) => {
    this.props.handleOptionChange(event, index, selectedOption)
    this.setState({selectedOption})
  }

  render () {
    const options = this.props.selectOptions.map((option, index) => {
      return <MenuItem key={option._id || index} value={option._id} primaryText={option.name} />
    })
    return (
      <SelectField
        value={this.state.selectedOption}
        floatingLabelText={this.props.floatingLabelText}
        onChange={this.handleOptionChange}
        floatingLabelStyle={{color:
orange500,
        width: '500px'}}
        maxHeight={400}
        style={{width: '100%'}}
      >
        { options }
      </SelectField>

    )
  }
}
