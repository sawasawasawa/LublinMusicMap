import {
  default as React,
  Component,
} from "react";
import { Marker, InfoWindow } from "react-google-maps";
import EventDialog from '../dialogs/EventDialog';

export default class PlaceMarker extends Component {
  getIcon(placeType) {
    //TODO move it somewhere else
    const iconMap = {
      club: "/img/disco-ball.svg",
      outdoorHall: "/img/outdoorHall.png",
      pub: "/img/pint.svg",
    };
    return iconMap[placeType];
  }

  render() {
    const marker = this.props.marker;
    const index =  this.props.index;
    const onClick = () => this.props.onMarkerClick(marker);
    const onCloseClick = () => this.props.onCloseClick(marker);

    return (
      <Marker
        position={{ lat: marker.position.lat, lng: marker.position.lng }}
        key={index}
        icon = {this.getIcon(marker.type)}
        title={marker.name}
        onClick={onClick}
      >
        {marker.showInfo && (
          <InfoWindow onCloseClick={onCloseClick}
                      key={marker.name}
          >
            <div>
              <h4 className="infowindow-title">{marker.name}</h4>
              <h5 className="infowindow-subtitle">Wydarzenia:</h5>
              { this.props.eventsAtPlace.length > 0 ?
                  this.props.eventsAtPlace.map((eventObject, index) => {
                    return <EventDialog key={index} eventObject={eventObject}/>
                  })
                : <span>W tym miejscu nie dodano jeszcze żadnych wydarzeń</span>}
            </div>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}
