import React from 'react'
import { MapVideoDialog } from './MapVideoDialog'
import { Mp3Dialog } from './Mp3Dialog'

export const RecordDialog = (props) => {
  console.log('_______ props', props)
  if (props.mediaType === 'youtubeVideo') {
    return <MapVideoDialog
      open={props.open}
      video={{...props}}
      handleClose={props.handleClose}
    />
  } else {
    return <Mp3Dialog
      open={props.open}
      media={{...props}}
      handleClose={props.handleClose}
    />
  }
}
