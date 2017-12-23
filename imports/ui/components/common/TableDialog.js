import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Media } from '../../../api/media'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class TableDialog extends React.Component {
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

  render () {
    const actions = [
      <FlatButton
        label='Zamknij'
        primary
        onTouchTap={this.handleClose}
      />
    ]
    return (
      <div style={{padding: '0 !important'}}>
        <RaisedButton label={this.props.label} onTouchTap={this.handleOpen} />
        <Dialog
          title={this.props.label}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{zIndex: 10}}
          autoScrollBodyContent
          contentStyle={{width: '100%', maxWidth: '1000px'}}
        >
          <div className='table-wrap'>
            <ReactTable
              className='-striped -highlight'
              data={this.props.data}
              columns={this.props.columns}
              defaultPageSize={10}
              showPagination
              showPaginationBottom
            />
          </div>
        </Dialog>
      </div>
    )
  }
}
