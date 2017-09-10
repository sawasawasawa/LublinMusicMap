/* global google */
import React from 'react'
import {withGoogleMap, GoogleMap} from 'react-google-maps'
import mapStylesMagenta from '../../../client/map/mapStyles-magenta.json'
import SearchBox from 'react-google-maps/lib/places/SearchBox' // TODO needed?
import RaisedButton from 'material-ui/RaisedButton'
import { Markers } from './Markers'
import { ClusteredMarkerOverlay } from './ClusteredMarkerOverlay'
import { MapDialog } from '../components/dialogs/MapDialog'

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
}

const MusicMapGoogleMap = withGoogleMap(props => {
  const showPlaces = props.markerType === 'places'
  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={15}
      center={props.center}
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
      <div id='mapButtons'>
        <RaisedButton label='Miejsca' secondary={showPlaces} onClick={props.toggleMarkersForPlaces} />
        <RaisedButton label='Nagrania' secondary={!showPlaces} onClick={props.toggleMarkersForMedia} />
      </div>
      <SearchBox id={'searchBox'} idName={'searchBox'}
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_RIGHT}
        onPlacesChanged={props.onPlacesChanged}
        inputPlaceholder='Podaj dokładny adres'
        inputStyle={INPUT_STYLE}
        inputClassName={'searchBox'}
      />
      <Markers markers={props.markers}
        onCloseClick={props.onCloseClick}
        onMarkerClick={props.onMarkerClick}
        handleClusterClick={(cluster) => {
          props.handleClusterClick(cluster)
        }}
      />
      <ClusteredMarkerOverlay
        {...props.overlay}
        center={props.center}
        handleMarkerClick={(marker) => {
          props.onMarkerClick(marker)
        }}
      />
      { props.modalContent
        ? <MapDialog {...props} />
        : null
      }
    </GoogleMap>
  )
}
)

export default MusicMapGoogleMap
