import React, {Component} from 'react'
import MusicMap from './MusicMap'
import Menu from './Menu'
import Header from './Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Places } from '../api/places.js'
import { Events } from '../api/events.js'
import { Media } from '../api/media.js'
import { createContainer } from 'meteor/react-meteor-data'
import CircularProgress from 'material-ui/CircularProgress'

export class AppContent extends Component {
  constructor (props) {
    super(props)
    this.state = {markers: this.props.places, markerType: 'places'}
  }

  componentWillReceiveProps (nextProps) {
    this.setState({places: nextProps.places, media: nextProps.media, events: nextProps.events, markers: nextProps.places, markerFilter: nextProps.markerFilter})
  }

  getMediaMarkerPosition (marker) {
    /* TODO fixit*/
    if (marker.placeId) {
      const placeOfRecording = this.props.places.find((place) => {
        if (marker.placeId._str) {
          return place._id._str === marker.placeId._str
        }
        return place._id === marker.placeId })
      return placeOfRecording ? placeOfRecording.position : undefined
    } else {
      console.log('_____ no place id for ', marker);
    }
  }

  toggleMarkersFor = (markerType) => {
    if (markerType === 'media') {
      const newMarkers = this.props[markerType].map((marker) => {
        return {
          ...marker,
          position: this.getMediaMarkerPosition(marker)
        }
      })
      this.setState({markers: newMarkers, markerType: 'media'})
    } else {
      this.setState({markers: this.state.markers, markerType: 'places', markerFilter: null})
    }
  }

  setMarkerFilter = (placeType) => {
    console.log('_____ qwe');
    this.setState({markerFilter: placeType })
  }

  render () {
    return <MuiThemeProvider>
      {this.props.dataReady ? (
        <div className='container'>
          <Header
            markerType={this.state.markerType}
            setMarkerFilter={this.setMarkerFilter}
            markerFilter={this.state.markerFilter}
          />
          <Menu {...this.props} markerType={this.state.markerType} />
          <MusicMap {...this.props}
            markers={this.state.markers}
            markerType={this.state.markerType}
            toggleMarkersFor={this.toggleMarkersFor}
            markerFilter={this.state.markerFilter}
          />
        </div>
      ) : (
        <div style={{marginTop: '20%', textAlign: 'center'}}>
          <CircularProgress size={200} thickness={35} />
          <h1>L O A D I N G . . .</h1>
        </div>)}
    </MuiThemeProvider>
  }
}

const App = createContainer(() => {
  let placesSub = Meteor.subscribe('places')
  let eventsSub = Meteor.subscribe('events')
  let mediaSub = Meteor.subscribe('media')
  let subsReady = (placesSub.ready() && eventsSub.ready() && mediaSub.ready())
  return {
    places: Places.find().fetch(),
    events: Events.find().fetch(),
    media: Media.find().fetch(),
    dataReady: subsReady
  }
}, AppContent)

export default App
