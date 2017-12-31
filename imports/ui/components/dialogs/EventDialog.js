import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import YouTube from 'react-youtube'

const opts = {
  width: '100%',
  playerVars: { // https://developers.google.com/youtube/player_parameters
  }
}

export default class EventDialog extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  };

  render () {
    const actions = [
      <FlatButton
        label='Zamknij'
        primary
        onTouchTap={this.handleClose}
      />
    ]
    const videos = this.props.eventMedia || []

    return (
      <div ref='siema'>
        <h5 label={`${this.props.eventObject.date} ${this.props.eventObject.name}`} onTouchTap={this.handleOpen}>{this.props.eventObject.name }</h5>
        <Dialog
          title={this.props.eventObject.name}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{zIndex: 11111, paddingTop: '0px !important'}}
          repositionOnUpdate={false}
          autoScrollBodyContent
        >
          {videos.map((video, index) => {
            return <div key={index} ref={video._id}>
              <h1>{video.name}</h1>
              <YouTube key={video._id} videoId={video.youtubeId} opts={opts} />
            </div>
          })}
        </Dialog>
      </div>
    )
  }
}
