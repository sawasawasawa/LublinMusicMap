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

export const MapVideoDialog = (props) => {
  const actions = [
    <FlatButton
      label='Zamknij'
      primary
      onTouchTap={() => props.handleClose()}
    />
  ]

  const video = props.video
  return video.name ? (
    <Dialog
      title={video.name}
      actions={actions}
      open={props.open}
      titleStyle={{display: 'none'}}
      onRequestClose={props.handleClose}
      style={{zIndex: 10, paddingTop: '0px !important', height: '550px'}}
      repositionOnUpdate={true}
      autoScrollBodyContent
    >
      <div style={{height: '420px', marginLeft: '10px'}}>
        <h4 className='infowindow-title'>{video.name}</h4>
        {video.youtubeId
          ? <YouTube key={video._id} videoId={video.youtubeId} opts={opts}/>
          : 'Coś poszło nie tak...'
        }
      </div>
    </Dialog>
) : null
}
