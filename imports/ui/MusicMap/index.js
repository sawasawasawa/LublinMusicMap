/* global google */
import {
  default as React,
  Component
} from 'react'
import MusicMapGoogleMap from './MusicMapGoogleMap'

const searchBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(51.197568, 22.733813),
  new google.maps.LatLng(51.288109, 22.4356302)
)

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
  handleMapModalClose = this.handleMapModalClose.bind(this);

  componentWillReceiveProps (nextProps) {
    const changeMarkerView = nextProps.markerType !== this.state.markerType
    if (changeMarkerView) {
      this.setState({
        markers: this.prepareMarkers(nextProps.markerType),
        markerType: nextProps.markerType
      })
    }
  }

  prepareMarkers (markerType) {
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

  handleMapMounted (map) {
    this._map = map
  }

  getModalData (targetMarker) {
    const modalData = this.state.markers.find(marker => {
      return marker._id === targetMarker._id
    })
    modalData.eventsAtPlace = this.props.events
      ? this.props.events.filter((e) => { return e.placeId == targetMarker._id })
      : []
    modalData.mediaAtPlace = this.props.media
      ? this.props.media.filter((e) => { return e.placeId == targetMarker._id })
      : []
    return modalData
  }

  handleMarkerClick (targetMarker) {
    const center = this.getNewCenter(targetMarker.position)
    this.setState({
      center,
      overlay: undefined,
      modalContent: this.getModalData(targetMarker),
      markers: this.state.markers.map(marker => {
        return {
          ...marker,
          showInfo: marker._id === targetMarker._id
        }
      })
    })
  }

  handleMapModalClose () {
    this.hideMarkers()
  }

  hideMarkers () {
    this.setState({
      modalContent: undefined,
      markers: this.state.markers.map(marker => {
        return {
          ...marker,
          showInfo: false
        }
      })
    })
  }

  handleClusterClick (cluster) {
    this.hideMarkers()
    const position = {
      lat: cluster.markers_[0].position.lat(),
      lng: cluster.markers_[0].position.lng()
    }
    this.setState({
      overlay: {
        position,
        open: true,
        markers: this.addIdsToClusterMarkers(cluster.markers_)
      }
    })
  }

  addIdsToClusterMarkers = (markers) => {
    return markers.map((marker) => {
      return {
        ...marker,
        _id: this.state.markers.find((m) => {
          return m.name == marker.title
        })._id
      }
    })
  }

  getNewCenter (position) {
    return {
      lat: ($.isFunction(position.lat) && position.lat()) || position.lat,
      lng: ($.isFunction(position.lng) && position.lng()) || position.lng
    }
  }

  handleCloseClick (targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false
          }
        }
        return marker
      })
    })
  }

  handleSearchBoxMounted (searchBox) {
    this._searchBox = searchBox
  }

  handlePlacesChanged () {
    const places = this._searchBox.getPlaces()
    const place = places[0]

    const placeObject = {
      name: place.name || 'NONAME',
      position: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
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

  render () {
    return (
      <MusicMapGoogleMap id={'musicMap'} className={'musicMap'}
        containerElement={
          <div id='map--container' style={{height: `100%`}} />
        }
        mapElement={
          <div id='map--element' style={{height: `100%`}} />
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
        handleMapModalClose={this.handleMapModalClose}
        modalContent={this.state.modalContent}
      />
    )
  }
}
