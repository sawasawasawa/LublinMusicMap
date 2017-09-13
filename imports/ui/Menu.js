import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton'
import AddNewPlaceDialog from './components/dialogs/AddPlaceDialog'
import AddNewEventDialog from './components/dialogs/AddEventDialog'
import AddMediaDialog from './components/dialogs/AddMediaDialog'
import AboutDialog from './components/dialogs/AboutDialog'
import AllMediaDialog from './components/dialogs/AllMediaDialog'
import AllEventsDialog from './components/dialogs/AllEventsDialog'
import CreditsDialog from './components/dialogs/CreditsDialog'

export default class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
  }

  openMenu = () => {
    $('#header-background').css({ transform: 'rotateZ(7deg)' })
    $('#legend-paper').css({ transform: 'rotateZ(7deg)' })
    setTimeout(() => {
      this.setState({open: !this.state.open})
    }, 100)
  }

  hideMenu = () => {
    const rotation = this.initialRotation()
    this.setState({open: !this.state.open})
    $('#header-background').css({ transform: `rotateZ(${rotation}deg)` })
    $('#legend-paper').css({ transform: `rotateZ(${rotation}deg)` })
  }

  initialRotation() {
    return window.innerWidth > 600 ? 45 : 60
  }

  showLegend = () => {
    return window.innerWidth < 600
  }

  render () {
    return (
      <div id='menu' className={'bottomButton'}>
        <RaisedButton
          id='openMenuButton'
          label='Menu'
          onTouchTap={this.openMenu}
          secondary
          backgroundColor={'#EE3858'}
        />
        <Drawer open={this.state.open} className={'menu--drawer'}
          containerStyle={{
            background: 'transparent',
            boxShadow: 0
          }}>
          <div id='menu--items'>
            {this.showLegend()
              ? <AllEventsDialog {...this.props} />
              : null
            }
            <br />
            <AllEventsDialog {...this.props} />
            <AllMediaDialog {...this.props} />
            <br />
            <AddMediaDialog places={this.props.places} />
            <AddNewPlaceDialog places={this.props.places} />
            <AddNewEventDialog places={this.props.places} />
            <br />
            <AboutDialog {...this.props} />
            <br />
            <br />
            <CreditsDialog />
          </div>
          <RaisedButton className={'bottomButton'}
            label='Ukryj'
            onTouchTap={this.hideMenu}
            secondary
            backgroundColor={'#EE3858'}
          />
        </Drawer>
      </div>
    )
  }
}
