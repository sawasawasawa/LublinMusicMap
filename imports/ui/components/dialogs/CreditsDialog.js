import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class CreditsDialog extends React.Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Zamknij"
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <div>
        <a onTouchTap={this.handleOpen} style={{color:'white', marginLeft:'100px', position: 'absolute', bottom: '5px'}} >Credits</a>
        <Dialog
          title="Credits"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{zIndex: 10}}
          autoScrollBodyContent={true}
          contentStyle={{width: '100%', maxWidth: '1000px'}}
        >
          <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
          <a href="https://icons8.com/icon/46379/Cafe">Free icons from here</a>

        </Dialog>
      </div>
    );
  }
}

