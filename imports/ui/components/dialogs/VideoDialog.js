import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import YouTube from 'react-youtube'

const opts = {
  width: '100%',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
}

export default class VideoDialog extends React.Component {
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
    const video = this.props.video
    return video.name && video.youtubeId ? (
      <div>
        <h5 label={video.name} onTouchTap={this.handleOpen}>{ video.name }</h5>
        <Dialog
          title={video.name}
          titleStyle={{display: 'none'}}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{zIndex: 10, paddingTop: '0px !important'}}
          repositionOnUpdate={false}
          autoScrollBodyContent
        >
          <div style={{height: '420px', marginLeft: '10px'}}>
            <h4 className='infowindow-title'>{video.name}</h4>
            <YouTube key={video._id} videoId={video.youtubeId} opts={opts} />
          </div>
        </Dialog>
      </div>
    ) : null
  }
}
