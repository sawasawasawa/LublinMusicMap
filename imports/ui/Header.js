import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import Legend from './components/Legend'

export class Header extends Component {
  render () {
    const legendPaperStyle = {
      width: '256px',
      height: '512px',
      position: 'absolute',
      backgroundColor: '#313131',
      top: '0px',
      left: '100%',
      transform: 'rotateZ(45deg)',
      transformOrigin: '0% 0%'
    }
    const footerBackgroundStyle = {
      pointerEvents: 'none',
      width: '266px',
      height: '266px',
      position: 'fixed',
      bottom: '14px',
      right: 0,
      borderColor: 'transparent transparent #007bff transparent',
      overflow: 'hidden'
    }

    return (
      <header>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <div id={'moving-sidebars'}>
          <h1 className={'title'}><span className='title-strong' >Lublin</span><br />Muzyczna<br />Mapa<br /></h1>
          <div >
            <Paper id={'header-background'} zDepth={5} style={{ backgroundColor: '#313131' }} />
            <div id='footer-background' style={footerBackgroundStyle}>
              <Paper id='legend-paper' zDepth={2} style={legendPaperStyle} />
              <Legend
                markerType={this.props.markerType}
                markerFilter={this.props.markerFilter}
                setMarkerFilter={this.props.setMarkerFilter}
              />
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
