/* global google */
import {
  default as React,
  Component,
} from "react";

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import mapStyles from "../../client/mapStyles.json"

const MusicMapGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 51.249, lng: 22.567 }}
    defaultOptions={{
      styles: mapStyles,
      mapTypeControl: false,
      zoomControl: true,
    }}
  />
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class MusicMap extends Component {
  render() {
    return (
      <MusicMapGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
      />
    );
  }
}