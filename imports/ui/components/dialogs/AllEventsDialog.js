import React from 'react'
import { Media } from '../../../api/media'
import TableDialog from '../common/TableDialog'
import EventDialog from './EventDialog'

export default class AllEventsDialog extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.state.media = Media.find().fetch()
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  };

  getPlaceName = (placeId) => {
    const places = this.props.places
    const selectedPlace = places.find((place) => { return place._id == placeId })
    return selectedPlace ? selectedPlace.name : undefined
  }

  render () {
    const data = this.props.events
    const columns = [{
      Header: 'Typ',
      accessor: 'type',
      Cell: (event, index) => (<a key={index}>{event.original.type}</a>),
      maxWidth: 60
    }, {
      Header: 'Nazwa wydarzenia',
      accessor: 'name',
      Cell: (event, index) => <EventDialog key={index} eventObject={event.original} eventMedia={this.props.media.filter((media) => { return media.eventId == event._id })} />
    }, {
      Header: 'Miejsce',
      accessor: 'placeId',
      Cell: (place, index) => (<a key={index}>{this.getPlaceName(place.original.placeId)}</a>)
    }, {
      Header: 'Data',
      accessor: 'date'
    }, {
      Header: 'Tagi',
      accessor: 'tags'
    }]
    return (
      <TableDialog label={'Wszystkie Wydarzenia'} data={data} columns={columns} handleOpen={this.handleOpen} handleClose={this.handleClose} />
    )
  }
}
