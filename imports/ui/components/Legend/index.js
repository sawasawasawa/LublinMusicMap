import React, {Component} from 'react'
import LegendElement from './LegendElement'
import {getLegendElements} from '../../../helpers'

export class Legend extends Component {
  prepareLegendElements = () => {
    const legendElements = getLegendElements(this.props.markerType)
    const legendElementComponents = legendElements.map((legendElement) => {
      return <LegendElement
        {...legendElement}
        key={legendElement.name}
        dim={(this.props.markerFilter ? legendElement.type != this.props.markerFilter : false)}
        setMarkerFilter={this.props.setMarkerFilter}
      />
    })
    return insertBreaks(legendElementComponents)
  }

  render() {
    return (
      <div id='legend'>
        <div id='legend-content'>
          {this.prepareLegendElements()}
          <h5
            className='legend-title'
            style={{
              pointerEvents: 'all'
            }}
            onClick={() => {
              this.props.setMarkerFilter(null)
            }}
          >
            {this.props.markerFilter
              ? <img src='/img/back.png' width='14px' />
              : null
            }
            {this.props.markerFilter
              ? 'Wróć'
              : 'Legenda'
            }
          </h5>
        </div>
      </div>
    )
  }
}

function insertBreaks(legendElements) {
  if (legendElements.length < 3) {
    return legendElements
  }
  let elementsWithBreaks = []
  const breakLines = [0, 2, 5]
  legendElements.forEach((element, index) => {
    elementsWithBreaks.push(element)
    if (breakLines.includes(index)) {
      elementsWithBreaks.push(<div style={{width: '100%', height: '0px', margin: '0px'}}
                                   key={Math.round(Math.random() * 1000)}/>)
    }
  })
  return elementsWithBreaks
}

export default Legend
