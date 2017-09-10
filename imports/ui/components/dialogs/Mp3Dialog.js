import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export const Mp3Dialog = (props) => {
  const actions = [
    <FlatButton
      label='Zamknij'
      primary
      onTouchTap={() => props.handleClose()}
    />
  ]
  return <Dialog
    title={props.media.name}
    actions={actions}
    open={props.open}
    onRequestClose={props.handleClose}
    style={{zIndex: 10, paddingTop: '0px !important', top: '-156px'}}
    repositionOnUpdate={false}
    autoScrollBodyContent
  >
    <audio controls>
      <source src={`/images/tmp/${props.media.filename}`} type='audio/mp3' />
          Your browser does not support the audio element.
    </audio>

    <br />
    <br />

    <strong>Opis:&nbsp;</strong>
    <span>{props.media.description || 'brak'}</span>
  </Dialog>
}
