import React from 'react'
import {OverlayView} from 'react-google-maps'

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
