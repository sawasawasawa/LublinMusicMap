import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  openMenu = () => {
    $('#header-background').css({
      transition: '0.15s all linear',
    '-webkit-clip-path': 'polygon( 0% 0%, 0% 100%, 0% 100%, 0% 100%, 100% 0%)' })
    //TODO make it better
    setTimeout(()=>{
      $('#header-background').css({ '-webkit-clip-path': 'polygon( 0% 0%, 0% 100%, 0% 100%, 100% 100%, 100% 0%)' })
      setTimeout(()=>{
        this.setState({open: !this.state.open});
      }, 50)
    },100)
  }

  hideMenu = () => {
    this.setState({open: !this.state.open});
    $('#header-background').css({ '-webkit-clip-path': 'polygon( 0% 0%, 0% 100%, 0% 100%, 100% 100%, 100% 0%)' })
    //TODO make it better
    setTimeout(()=>{
      $('#header-background').css({
        transition: '0.2s all ease',
        '-webkit-clip-path': 'polygon( 0% 0%, 0% 350px, 0% 350px, 0% 350px, 100% 0%)'
      })
    },100)
  }

  render() {
    return (
      <div id="menu" className={'bottomButton'}>
        <RaisedButton
          label="Menu"
          onTouchTap={this.openMenu}
        />
        <Drawer open={this.state.open}>
          <div id="menu--items">
            <MenuItem>Dodaj miejsce</MenuItem>
            <MenuItem>Dodaj medium</MenuItem>
            <MenuItem>Nadchodzące</MenuItem>
            <MenuItem>Archiwalne</MenuItem>
          </div>
          <RaisedButton className={'bottomButton'}
                        label="Ukryj"
                        onTouchTap={this.hideMenu}
          />
        </Drawer>
      </div>
    );
  }
}