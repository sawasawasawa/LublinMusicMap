import React from 'react'
import {OverlayView} from 'react-google-maps'
import { Media } from '../../api/media'
import { Places } from '../../api/places'


export const ClusteredMarkerOverlay = (props) => {
  return <OverlayView 
    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    position={(props && props.position) || props.center}
  >
    <div
      className='overlay-list'
      style={{
        backgroundColor: '#FFF',
        display: props.open ? 'inline-block' : 'none'
      }}
    >
      <h2 onClick={ () => props.handleClusterClose()} >
        {props.markerType == 'media' && props.markers && getLocationName(props.markers[0]._id)}
        <span style={{float: 'right'}}>&times;</span>
      </h2>
      <ul>

        {props.markers && props.markers.map((marker, index) => {
          return <PlaceRow
            marker={marker}
            key={index}
            handleMarkerClick={props.handleMarkerClick}
          />
        })}
      </ul>
    </div>
  </OverlayView>
}

const PlaceRow = (props) => {
  return <li key={props.index} onClick={() => {
    props.handleMarkerClick(props.marker)
  }}>
    <img src={props.marker.icon.url} width='32px' />
    <h4>{props.marker.title}</h4>
  </li>
}

const getLocationName = function(mediaFileId) {
  const mediaRecord = Media.findOne({_id: mediaFileId})
  return Places.findOne({_id: mediaRecord.placeId}).name
}
