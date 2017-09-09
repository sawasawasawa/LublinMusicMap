import React from 'react';
import { PlaceDialog } from './PlaceDialog'
import { RecordDialog } from './RecordDialog'

export const MapDialog = (props) => {
  if (!props.modalContent) {
    return
  }
  const dialogProps = {
    ...props.modalContent,
    open: !!props.modalContent,
    handleClose: props.handleMapModalClose
  }
  switch (props.markerType) {
    case 'places':
      return <PlaceDialog {...dialogProps} />
    case 'media':
      return <RecordDialog {...dialogProps} />
    default:
      return null
  }
}
