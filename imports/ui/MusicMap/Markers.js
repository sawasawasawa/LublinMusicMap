import React from 'react'
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer'
import PlaceMarker from '../components/common/PlaceMarker'

export const Markers = (props) => {
  const getMediaAtPlace = (marker) => {
    return getDocsAtPlace('media', marker)
  }

  const getEventsAtPlace = (marker) => {
    return getDocsAtPlace('events', marker)
  }

  const getDocsAtPlace = (doctype, marker) => {
    let mediaAtPlace = []
    if (props.media) {
      mediaAtPlace = props[doctype].filter((e) => {
        return marker._id._str
          ? e.placeId._str === marker._id._str
          : e.placeId === marker._id
      })
    }
    return mediaAtPlace
  }

  return (<div>
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={10}
      zoomOnClick={false}
      imagePath='/img/cluster'
      styles={[{
        textColor: '#313131',
        url: '/img/cluster1.png',
        height: 50,
        width: 50
      }]}
      onClick={(cluster) => {
        props.handleClusterClick(cluster)
      }}
    >
      {/*TODO get rid of filter(m=>!!m)*/}
      {props.markers ? props.markers.filter(m=>!!m).map((marker, index) => {
        return <PlaceMarker key={index}
          marker={marker}
          onMarkerClick={() => props.onMarkerClick(marker)}
          onCloseClick={() => props.onCloseClick(marker)}
          mediaAtPlace={getMediaAtPlace(marker)}
          eventsAtPlace={getEventsAtPlace(marker)}
        />
      })
        : null}
    </MarkerClusterer>
  </div>
  )
}
