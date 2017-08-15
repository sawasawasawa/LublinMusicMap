/* global google */
import {
  default as React,
  Component,
} from "react";
import {withGoogleMap, GoogleMap} from "react-google-maps";
import mapStylesMagenta from "../../client/map/mapStyles-magenta.json"
import SearchBox from "react-google-maps/lib/places/SearchBox"; //TODO needed?
import {Events} from '../api/events.js';
import PlaceMarker from './components/common/PlaceMarker';

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  opacity: 0
};


const searchBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(51.197568, 22.733813),
  new google.maps.LatLng(51.288109, 22.4356302)
);

const MusicMapGoogleMap = withGoogleMap(props => {
    return (
      <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        center={{lat: 51.244323, lng: 22.560004}}
        defaultOptions={{
          styles: mapStylesMagenta,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.TOP_RIGHT
          }
        }}

      >
        <SearchBox id={"searchBox"} idName={"searchBox"}
                   ref={props.onSearchBoxMounted}
                   bounds={searchBounds}
                   controlPosition={google.maps.ControlPosition.TOP_RIGHT}
                   onPlacesChanged={props.onPlacesChanged}
                   inputPlaceholder="Podaj dokładny adres"
                   inputStyle={INPUT_STYLE}
                   inputClassName={'searchBox'}
        />

        {props.markers ? props.markers.map((marker, index) => {
          return <PlaceMarker key={index}
                              marker={marker}
                              onMarkerClick={() => props.onMarkerClick(marker)}
                              onCloseClick={() => props.onCloseClick(marker)}
                              mediaAtPlace={ props.media ? props.media.filter((e)=>{return e.placeId == marker._id}) : [] }
                              eventsAtPlace={ props.events ? props.events.filter((e)=>{return e.placeId == marker._id}) : [] }
          />
        })
          : null}
      </GoogleMap>
    )
  }
);

export default class MusicMap extends Component {

  state = {
    bounds: searchBounds,
    markers: this.props.markers,
    markerType: this.props.markerType,
  };

  handleMapMounted = this.handleMapMounted.bind(this);
  handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  handlePlacesChanged = this.handlePlacesChanged.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);
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
      markers: this.state.markers.map(marker => {
        return {
          ...marker,
          showInfo: marker._id === targetMarker._id,
        };
      }),
    });
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
                         onMapMounted={this.handleMapMounted}
                         onSearchBoxMounted={this.handleSearchBoxMounted}
                         bounds={this.state.bounds}
                         onPlacesChanged={this.handlePlacesChanged}
                         markers={this.state.markers}
                         onMarkerClick={this.handleMarkerClick}
                         onCloseClick={this.handleCloseClick}
      />
    );
  }
}
