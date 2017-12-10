import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export const BandcampDialog = (props) => {
  const createMarkup = () => ({__html: props.media.bandcampIframe})
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
    style={{zIndex: 10, paddingTop: '0px !important'}}
    repositionOnUpdate={false}
    autoScrollBodyContent
  >
    <div dangerouslySetInnerHTML={createMarkup()} />
  </Dialog>
}

