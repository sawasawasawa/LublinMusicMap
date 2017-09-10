import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

export default class AboutDialog extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  };

  render () {
    const actions = [
      <FlatButton
        label='Anuluj'
        primary
        onTouchTap={this.handleClose}
      />
    ]

    return (
      <div>
        <RaisedButton label={'O projekcie'} onTouchTap={this.handleOpen} />
        <Dialog
          title='O projekcie'
          modal
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{zIndex: 10}}
          autoScrollBodyContent
        >
          <h1>OŻEH, CZEKAM</h1>
        </Dialog>
      </div>
    )
  }
}
