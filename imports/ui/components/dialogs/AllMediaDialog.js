import React from 'react'
import { Media } from '../../../api/media'
import 'react-table/react-table.css'
import EventDialog from './EventDialog'
import RecordDialog from './RecordDialog'
import TableDialog from '../common/TableDialog'

export default class AllMediaDialog extends React.Component {
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
    const selectedPlace = places.find((place) => { return place._id === placeId })
    return selectedPlace ? selectedPlace.name : undefined
  }

  getEvent = (eventId) => {
    return this.props.events && this.props.events.find((event) => {
      return event._id === eventId
    })
  }

  render () {
    const data = this.props.media
    const columns = [{
      Header: 'Typ',
      accessor: 'mediaType',
      Cell: (record, index) => { return record.original.mediaType === 'youtubeVideo'
        ? <img src='/img/youtube.svg' />
        : <img src='/img/record.png' width={32} height={32}/>
      },
      maxWidth: 60
    }, {
      Header: 'Tytuł',
      accessor: 'name',
      Cell: (record, index) => (record.original.name)
    }, {
      Header: 'Miejsce',
      accessor: 'placeId',
      Cell: (place, index) => (<a key={index}>{this.getPlaceName(place.original.placeId)}</a>)
    }, {
      Header: 'Opis',
      accessor: 'eventId',
      Cell: (record, index) => record.original.description || '-'
    }]

    return (
      <TableDialog label={'Wszystkie Nagrania'} data={data} columns={columns} handleOpen={this.handleOpen} handleClose={this.handleClose} />
    )
  }
}
