import React, {Component} from 'react'
import LegendElement from './LegendElement'
import {getLegendElements} from '../../../helpers'

export class Legend extends Component {
  prepareLegendElements = () => {
    const legendElements = getLegendElements(this.props.markerType)
    const legendElementComponents = legendElements.map((legendElement) => {
      return <LegendElement key={legendElement.name} image={legendElement.icon} name={legendElement.name} />
    })
    return insertBreaks(legendElementComponents)
  }

  render () {
    return (
      <div id='legend'>
        <div id='legend-content'>
          {this.prepareLegendElements()}
          <h5 className='legend-title'>Legenda</h5>
        </div>
      </div>
    )
  }
}

function insertBreaks (legendElements) {
  if (legendElements.length < 3) {
    return legendElements
  }
  let elementsWithBreaks = []
  const breakLines = [0, 2, 5]
  legendElements.forEach((element, index) => {
    elementsWithBreaks.push(element)
    if (breakLines.includes(index)) {
      elementsWithBreaks.push(<div style={{width: '100%', height: '0px', margin: '0px'}} key={Math.round(Math.random()*1000)}/>)
    }
  })
  return elementsWithBreaks
}

export default Legend
