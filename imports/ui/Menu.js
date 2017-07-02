import React, { Component } from 'react';
import { render } from 'react-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewPlaceDialog from './components/dialogs/AddPlaceDialog'
import AddNewEventDialog from './components/dialogs/AddEventDialog'
import AddMediaDialog from './components/dialogs/AddMediaDialog'
import AllMediaDialog from './components/dialogs/AllMediaDialog'
import AllEventsDialog from './components/dialogs/AllEventsDialog'
import CreditsDialog from './components/dialogs/CreditsDialog'
// import AddNewPlace from './AddNewPlace'

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  openMenu = () => {
    $('#header-background').css({ transform: 'rotateZ(7deg)' });
    $('#legend-paper').css({ transform: 'rotateZ(7deg)' });
    setTimeout(()=>{
      this.setState({open: !this.state.open});
    },100)
  }

  hideMenu = () => {
    this.setState({open: !this.state.open});
    $('#header-background').css({ transform: 'rotateZ(45deg)' })
    $('#legend-paper').css({ transform: 'rotateZ(45deg)' });
  }

  addNewPlace = () => {
    $('.searchBox').css('right', '-100%')
      .css('opacity', 1)
      .animate({'right': '0%'})
      .focus()
    this.hideMenu();
  }

  toggleMarkersForPlaces = () => {
    this.props.toggleMarkersFor('places')
  }

  toggleMarkersForMedia = () => {
    this.props.toggleMarkersFor('media')
  }

  render() {
    return (
      <div id="menu" className={'bottomButton'}>
        <RaisedButton
          id="openMenuButton"
          label="Menu"
          onTouchTap={this.openMenu}
          secondary={true}
          backgroundColor={"#EE3858"}
        />
        <Drawer open={this.state.open} className={'menu--drawer'}
                containerStyle={{
                  background: 'transparent',
                  boxShadow: 0
                }}>
          <div id="menu--items">
            <RaisedButton label="Miejsca" onClick={this.toggleMarkersForPlaces}/><br />
            <RaisedButton label="Nagrania" onClick={this.toggleMarkersForMedia}/><br />
            <RaisedButton label="Filtruj..."/><br />
            <RaisedButton label="O projekcie"/>
            <AllEventsDialog {...this.props}/>
            <AllMediaDialog {...this.props}/>
            <br />
            <AddMediaDialog places={this.props.places}/>
            <AddNewPlaceDialog places={this.props.places}/>
            <AddNewEventDialog places={this.props.places}/>
            <br />
            <br />
            <CreditsDialog />
          </div>
          <RaisedButton className={'bottomButton'}
                        label="Ukryj"
                        onTouchTap={this.hideMenu}
                        secondary={true}
                        backgroundColor={"#EE3858"}
          />
        </Drawer>
      </div>
    );
  }
}