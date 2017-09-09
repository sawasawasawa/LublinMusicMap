/* global google */
import {
  default as React,
  Component
} from 'react'
import { Marker } from 'react-google-maps'

export default class PlaceMarker extends Component {
  getIcon (marker) {
    let url
    if (marker.mediaType) {
      url = this.getIconForMedia(marker)
    } else {
      url = this.getIconForPlace(marker)
    }
    return {
      url,
      scaledSize: new google.maps.Size(32, 32)
    }
  }

  getIconForMedia (record) {
    const iconMap = {
      youtubeVideo: '/img/youtube.svg',
      mp3: '/img/resize/record.png'
    }
    return iconMap[record.mediaType] || iconMap['mp3']
  }

  getIconForPlace (place) {
    // TODO move it somewhere else
    const iconMap = {
      club: '/img/disco-ball.svg',
      outdoorHall: '/img/outdoorHall.png',
      pub: '/img/cafe.png',
      tv: '/img/resize/tv.png',
      radio: '/img/resize/radio.png',
      culture: '/img/resize/culture.png'
    }
    return iconMap[place.type] || iconMap['culture']
  }

  render () {
    const marker = this.props.marker

    return (
      <Marker
        position={{ lat: marker.position.lat, lng: marker.position.lng }}
        key={marker.name}
        id={marker._id}
        icon={this.getIcon(marker)}
        title={marker.name}
        onClick={() => this.props.onMarkerClick(marker)}
        mediaAtPlace={this.props.mediaAtPlace}
        eventsAtPlace={this.props.eventsAtPlace}
      />
    )
  }
}
