import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import Paper from 'material-ui/Paper';

export class LegendElement extends Component {
  render() {
    const style = {
      height: 32,
      width: 32,
      padding: 2,
      textAlign: 'center',
      color: 'white',
      boxShadow: 'black 0px 0px 0px 1px,white 0px 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 19px 60px, rgba(0, 0, 0, 0.22) 0px 15px 20px'
    };

    return (
      <div style={{zIndex:2, color: 'white',marginRight: '5px'}}>
        <Paper style={style} zDepth={5} circle={true} ><img src={this.props.image} width='24px'/></Paper>
        <div style={{marginTop: '15px', marginRight: '8px', marginLeft: '5px'}}>{this.props.name}</div>
      </div>
  )
  }
}

export default LegendElement;



