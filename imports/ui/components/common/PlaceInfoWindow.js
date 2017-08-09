import {
  default as React,
  Component,
} from "react";
import { InfoWindow } from "react-google-maps";
import EventDialog from '../dialogs/EventDialog';

export default class PlaceMarker extends Component {

  render() {
    console.log('¯\_(ツ)_/¯ eeeelo');
    console.log('¯\_(ツ)_/¯: process.env.FB_APP_ID', process.env.FB_APP_ID);
    const marker = this.props.marker;
    console.log('¯\_(ツ)_/¯: marker', marker);
    const onCloseClick = () => this.props.onCloseClick(marker);

    return (
      <InfoWindow onCloseClick={onCloseClick} key={marker.name}>
        <div>
          <h4 className="infowindow-title">{marker.name}</h4>
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
