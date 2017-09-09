import React from 'react'
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer'
import PlaceMarker from '../components/common/PlaceMarker'

export const Markers = (props) => {
  return (<div>
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={10}
      zoomOnClick={false}
      imagePath='img/resize/cluster'
      styles={[{
        textColor: '#313131',
        url: 'img/resize/cluster1.png',
        height: 50,
        width: 50
      }]}
      onClick={(cluster) => {
        props.handleClusterClick(cluster)
      }}
    >
      {props.markers ? props.markers.map((marker, index) => {
        return <PlaceMarker key={index}
          marker={marker}
          onMarkerClick={() => props.onMarkerClick(marker)}
          onCloseClick={() => props.onCloseClick(marker)}
          mediaAtPlace={props.media ? props.media.filter((e) => { return e.placeId === marker._id }) : []}
          eventsAtPlace={props.events ? props.events.filter((e) => { return e.placeId === marker._id }) : []}
        />
      })
        : null}
    </MarkerClusterer>
  </div>
  )
}
