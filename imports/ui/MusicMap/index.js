/* global google */
import {
  default as React,
  Component,
} from "react";
import MusicMapGoogleMap from './MusicMapGoogleMap'

const searchBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(51.197568, 22.733813),
  new google.maps.LatLng(51.288109, 22.4356302)
);

export default class MusicMap extends Component {

  state = {
    bounds: searchBounds,
    markers: this.props.markers,
    markerType: this.props.markerType,
    center: this.props.center || {lat: 51.244323, lng: 22.560004}
  };

  handleMapMounted = this.handleMapMounted.bind(this);
  handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  handlePlacesChanged = this.handlePlacesChanged.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleClusterClick = this.handleClusterClick.bind(this);
  handleCloseClick = this.handleCloseClick.bind(this);

  componentWillReceiveProps(nextProps) {
    const changeMarkerView = nextProps.markerType !== this.state.markerType;
    if (changeMarkerView) {
      this.setState({
        markers: this.prepareMarkers(nextProps.markerType),
        markerType: nextProps.markerType
      })
    }
  }

  prepareMarkers(markerType) {
    if (markerType == 'media') {
      return this.props.media.map(this.addPosition)
    } else {
      return this.props.places
    }
  }

  addPosition = (mediaFile) => {
      return {
        ...mediaFile,
        position: this.props.places.find((place) => {
          return mediaFile.placeId == place._id
        }).position
      }
  }

  handleMapMounted(map) {
    this._map = map;
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      center: this.getNewCenter(targetMarker.position),
      overlay: undefined,
      markers: this.state.markers.map(marker => {
        return {
          ...marker,
          showInfo: marker._id === targetMarker._id,
        };
      }),
    });
  }

  hideMarkers() {
    this.setState({
      markers: this.state.markers.map(marker => {
        return {
          ...marker,
          showInfo: false,
        };
      }),
    });
  }

  handleClusterClick(cluster) {
    this.hideMarkers()
    const position = {
      lat: cluster.markers_[0].position.lat(),
      lng: cluster.markers_[0].position.lng()
    }
    this.setState({
      overlay: {
        position,
        open: true,
        markers: cluster.markers_
      }
    });
  }

  getNewCenter(position) {
    return {
      lat: position.lat - 0.9,
      lng: position.lng
    };
  }

  handleCloseClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();
    const place = places[0]

    const placeObject = {
      name: place.name || 'NONAME',
      position: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
    }
    Meteor.call('addPlace', placeObject)
  }

  toggleMarkersForPlaces = () => {
    this.props.toggleMarkersFor('places')
  }

  toggleMarkersForMedia = () => {
    this.props.toggleMarkersFor('media')
  }

  render() {
    return (
      <MusicMapGoogleMap id={"musicMap"} className={"musicMap"}
                         containerElement={
                           <div id='map--container' style={{height: `100%`}}/>
                         }
                         mapElement={
                           <div id='map--element' style={{height: `100%`}}>

                           </div>
                         }
                         {...this.props}
                         toggleMarkersForPlaces={this.toggleMarkersForPlaces}
                         toggleMarkersForMedia={this.toggleMarkersForMedia}
                         center={this.state.center}
                         onMapMounted={this.handleMapMounted}
                         onSearchBoxMounted={this.handleSearchBoxMounted}
                         bounds={this.state.bounds}
                         onPlacesChanged={this.handlePlacesChanged}
                         markers={this.state.markers}
                         overlay={this.state.overlay}
                         onMarkerClick={this.handleMarkerClick}
                         handleClusterClick={this.handleClusterClick}
                         onCloseClick={this.handleCloseClick}
                         onMove={this.handleMove}
      />
    );
  }
}
