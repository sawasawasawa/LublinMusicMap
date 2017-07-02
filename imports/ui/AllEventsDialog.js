import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, blue500} from 'material-ui/styles/colors';
import { Media } from '../api/media';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import EventModal from './eventModal';

const styles = {
  floatingLabelStyle: {
    color: orange500,
    marginRight:'24px'
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};


export default class AllEventsDialog extends React.Component {
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

  getEventName = (eventId) => {
    const events = this.props.events;
    const selectedEvent = events.find((event)=>{return event._id == eventId});
    return selectedEvent ? selectedEvent.name : undefined
  }

  render() {
    const data = this.props.events;

    const columns = [{
      Header: 'Typ',
      accessor: 'type',
      Cell: (event, index) => (<a key={index}>{event.original.type}</a>),
      maxWidth: 60
    },{
      Header: 'Nazwa wydarzenia',
      accessor: 'name',
      Cell: (event, index) => (<a key={index}>{event.original.name}</a>),
    },{
      Header: 'Miejsce',
      accessor: 'placeId',
      Cell: (place, index) => (<a key={index}>{this.getPlaceName(place.original.placeId)}</a>)
    },{
      Header: 'Data',
      accessor: 'date',
    },{
      Header: 'Tagi',
      accessor: 'tags',
    }];

    const actions = [
      <FlatButton
        label="Zamknij"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <div>
        <RaisedButton label="Wszystkie wydarzenia" onTouchTap={this.handleOpen} />
        <Dialog
          title="Wszystkie wydarzenia"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{zIndex: 10}}
          autoScrollBodyContent={true}
          contentStyle={{width: '100%', maxWidth: '1000px'}}
        >
          <div className='table-wrap'>
            <ReactTable
              className='-striped -highlight'
              data={data}
              columns={columns}
              defaultPageSize={10}
              showPagination
              showPaginationBottom
            />
          </div>
          <div style={{textAlign: 'center'}}>
            <br />
            <em>Tip: Hold shift when sorting to multi-sort!</em>
          </div>
        </Dialog>
      </div>
    );
  }
}

