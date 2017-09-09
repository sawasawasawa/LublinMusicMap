import React from 'react';
import { MapVideoDialog } from './MapVideoDialog'

export const RecordDialog = (props) => {
  return <MapVideoDialog
    open={props.open}
    video = {{...props}}
    handleClose={props.handleClose}
  />
}
