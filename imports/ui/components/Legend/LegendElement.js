import React, {Component} from 'react'
import Paper from 'material-ui/Paper'

export class LegendElement extends Component {
  render () {
    const style = {
      pointerEvents: 'all',
      height: 32,
      width: 32,
      padding: 2,
      textAlign: 'center',
      color: 'white',
      boxShadow: 'black 0px 0px 0px 1px,white 0px 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 19px 60px, rgba(0, 0, 0, 0.22) 0px 15px 20px'
    }

    return (
      <div className='legend-element'
           onMouseOver={()=>{this.setState({hover: true})}}
           onMouseLeave={()=>{this.setState({hover: false})}}
      >
        <Paper style={style} zDepth={5} circle ><img src={this.props.image} width='24px' /></Paper>
        <div className='legend-tooltip'>{
          this.state && this.state.hover
            ? this.props.name
            : null
        }</div>
      </div>
    )
  }
}

export default LegendElement
