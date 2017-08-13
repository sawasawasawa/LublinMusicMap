import React from 'react';
import { Media } from '../../../api/media';
import 'react-table/react-table.css'
import EventDialog from './EventDialog';
import VideoDialog from './VideoDialog';
import TableDialog from '../common/TableDialog';

export default class AllMediaDialog extends React.Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.state.media = Media.find().fetch();
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  getPlaceName = (placeId) => {
    const places = this.props.places;
    const selectedPlace = places.find((place)=>{return place._id == placeId});
    return selectedPlace ? selectedPlace.name : undefined
  }

  getEvent = (eventId) => {
    return this.props.events && this.props.events.find((event)=>{
      return event._id == eventId});
  }

  render() {
    const data = this.props.media;
    const columns = [{
      Header: 'Typ',
        accessor: 'mediaType',
        Cell: (event, index) => (<img src='/img/youtube.svg'/>),
        maxWidth: 60
    },{
      Header: 'Tytuł',
        accessor: 'name',
        Cell: (media, index) => (media.original.name)
    },{
      Header: 'Nagranie',
        accessor: 'videoId',
        Cell: (video, index) => (<VideoDialog key={index} video={video.original}/>)
    },{
      Header: 'Miejsce',
        accessor: 'placeId',
        Cell: (place, index) => (<a key={index}>{this.getPlaceName(place.original.placeId)}</a>)
    },{
      Header: 'Wydarzenie',
        accessor: 'eventId',
        Cell: (event, index) => event.original.eventId ? (<a key={index}>
          <EventDialog key={index} eventObject={this.getEvent(event.original.eventId)}/>
        </a>) : null
    }];

    return (
      <TableDialog label={"Wszystkie Nagrania"} data={data} columns={columns} handleOpen={this.handleOpen} handleClose={this.handleClose}/>
    );
  }
}

