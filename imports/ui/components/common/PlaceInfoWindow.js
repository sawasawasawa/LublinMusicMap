import {
  default as React,
  Component,
} from "react";
import { InfoWindow } from "react-google-maps";
import EventDialog from '../dialogs/EventDialog';

export default class PlaceMarker extends Component {
  socialIcons() {
    //TODO: refactor into component
    const media = ['insta', 'www', 'fb', 'youtube']
    const iconsToDisplay = media.filter((media)=>{
      return !!this.props.marker[media]
    })
    return iconsToDisplay.map((icon, index)=>{
      return(
        <a href={this.props.marker[icon]} target='_blank' style={{marginLeft: 10}}>
          <img key={index} src={`/img/resize/${icon}.png`} width="32px"/>
        </a>
      )
    })
  }

  render() {
    //TODO: get facebook events
    // console.log('¯\_(ツ)_/¯: process.env.FB_APP_ID', process.env.FB_APP_ID);
    const marker = this.props.marker;
    const onCloseClick = () => this.props.onCloseClick(marker);

    return (
      <InfoWindow onCloseClick={onCloseClick} key={marker.name} >
        <div style={{maxWidth: '450px', maxHeight: '550px', marginLeft: '10px'}}>
          <h4 className="infowindow-title">{marker.name}</h4>
          <img src={marker.photo} style={{maxHeight: '300px', maxWidth: '500px', margin: '20px auto', display: 'block'}}/>
          <div style={{width: '100%', textAlign: 'right'}}>
            {this.socialIcons()}
          </div>
          <p>{marker.description}</p>
          <h5 className="infowindow-subtitle">Wydarzenia:</h5>
          { this.props.eventsAtPlace.length > 0 ?
            this.props.eventsAtPlace.map((eventObject, index) => {
              return <EventDialog key={index}
                                  eventObject={eventObject}
                                  eventMedia={this.props.mediaAtPlace}
              />
            })
            : <span>W tym miejscu nie dodano jeszcze żadnych wydarzeń</span> }
        </div>
      </InfoWindow>
    )
  }
}
