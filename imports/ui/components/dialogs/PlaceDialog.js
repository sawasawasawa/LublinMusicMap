import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import EventDialog from '../dialogs/EventDialog'

export const PlaceDialog = (props) => {
  const actions = [
    <FlatButton
      label='Zamknij'
      primary
      onTouchTap={() => props.handleClose()}
    />
  ]
  return <Dialog
    title={props.name}
    actions={actions}
    open={props.open}
    onRequestClose={() => props.handleClose()}
    style={{zIndex: 10, paddingTop: '0px !important', top: '-126px'}}
    repositionOnUpdate={false}
    autoScrollBodyContent
  >

    <div style={{maxHeight: '550px', marginLeft: '10px'}}>
      <h4 className='infowindow-title'>{props.name}</h4>
      <img src={props.photo} style={{maxHeight: '300px', maxWidth: '500px', margin: '20px auto', display: 'block'}} />
      <div style={{width: '100%', textAlign: 'right'}}>
        <SocialIcons place={{...props}} />
      </div>
      <p>{props.description}</p>
      <h5 className='infowindow-subtitle'>Wydarzenia:</h5>
      {props.eventsAtPlace.length > 0
        ? props.eventsAtPlace.map((eventObject, index) => {
          return <EventDialog key={index}
            eventObject={eventObject}
            eventMedia={props.mediaAtPlace}
          />
        })
        : <span>W tym miejscu nie dodano jeszcze żadnych wydarzeń</span>}
    </div>

  </Dialog>
}

const SocialIcons = (props) => {
  const media = ['insta', 'www', 'fb', 'youtube']
  const iconsToDisplay = media.filter((media) => {
    return !!props.place[media]
  })
  if (iconsToDisplay.length > 0) {
    return <div>
      {iconsToDisplay.map((icon, index) => {
        return (
          <PlaceIcon href={props.place[icon]} key={index} icon={icon} />
        )
      })}
    </div>
  }

  return null
}

const PlaceIcon = (props) => {
  return <a href={props.href} target='_blank' style={{marginLeft: 10}}>
    <img src={`/img/resize/${props.icon}.png`} width='32px' />
  </a>
}
