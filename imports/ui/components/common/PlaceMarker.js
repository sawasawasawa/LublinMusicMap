import {
  default as React,
  Component,
} from "react";
import { Marker } from "react-google-maps";
import PlaceInfoWindow from '../common/PlaceInfoWindow';

export default class PlaceMarker extends Component {
  getIcon(placeType) {
    //TODO move it somewhere else
    const iconMap = {
      club: "/img/disco-ball.svg",
      outdoorHall: "/img/outdoorHall.png",
      pub: "/img/pint.svg",
    };
    return iconMap[placeType] || iconMap['club'];
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
        {marker.showInfo && <PlaceInfoWindow {...this.props}/>}
      </Marker>
    )
  }
}
