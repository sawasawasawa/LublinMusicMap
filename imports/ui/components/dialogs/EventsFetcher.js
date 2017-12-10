import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Dialog from 'material-ui/Dialog'
import EventsFetcher from './EventsFetcher'
import FlatButton from 'material-ui/FlatButton'
import EventDialog from '../dialogs/EventDialog'

export class PlaceDialog extends Component {
  onImgLoaded = () => {
    setTimeout(() => {
      console.log('_____ eloo');
      // console.log("_______ this", this);
      // console.log("_______ this", ReactDOM.findDOMNode(this.dialog).getBoundingClientRect());
      // console.log("_______ this.forceUpdate", this.forceUpdate);
      // console.log("_______ this.forceUpdate()", this.forceUpdate());
      // this.forceUpdate()
    }, 1000)
  }

  render() {
// export const PlaceDialog = (props) => {
    const forceupdate = () => this.forceUpdate()
    const actions = [
      <FlatButton
        label='Zamknij'
        primary
        onTouchTap={() => this.props.handleClose()}
      />
    ]
    return <Dialog refs = {(dialog)=>this.dialog}
      title={this.props.name}
      actions={actions}
      open={this.props.open}
      onRequestClose={() => this.props.handleClose()}
      titleStyle={{display: 'none'}}
      repositionOnUpdate={true}
      autoScrollBodyContent={true}
    >

      <div style={{height: '550px', marginLeft: '10px'}}>
        <h4 className='infowindow-title'>{this.props.name}</h4>
        <img src={this.props.photo} style={{maxHeight: '300px', maxWidth: '500px', margin: '20px auto', display: 'block'}}
             onLoad={this.onImgLoaded}/>
        <div style={{width: '100%', textAlign: 'right'}}>
          <SocialIcons place={{...this.props}}/>
        </div>
        <p>{this.props.description}</p>
        <EventsFetcher {...this.props}>
        <h5 className='infowindow-subtitle'>Wydarzenia:</h5>
        {this.props.eventsAtPlace.length > 0
          ? this.props.eventsAtPlace.map((eventObject, index) => {
            return <EventDialog key={index}
                                eventObject={eventObject}
                                eventMedia={this.props.mediaAtPlace}
            />
          })
          : <span>W tym miejscu nie dodano jeszcze żadnych wydarzeń</span>}
      </div>

    </Dialog>
  }
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
    <img src={`/img/${props.icon}.png`} width='32px' />
  </a>
}
