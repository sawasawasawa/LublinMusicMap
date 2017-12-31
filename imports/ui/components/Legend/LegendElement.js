import React, {Component} from 'react'
import Paper from 'material-ui/Paper'

export class LegendElement extends Component {
  render () {
    const style = {
      opacity: this.props.dim ? 0.6 : 1,
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
        onMouseOver={() => { this.setState({hover: true}) }}
        onMouseLeave={() => { this.setState({hover: false}) }}
       onClick={()=>{
         this.props.setMarkerFilter(this.props.type)
       }}
      >
        <Paper style={style} zDepth={5} circle ><img src={this.props.icon} width='24px' /></Paper>
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
