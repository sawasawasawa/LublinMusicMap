import React, {Component} from 'react'
import LegendElement from './LegendElement'
import {getLegendElements} from "../../../helpers";

export class Legend extends Component {
  render () {
    const legendElements = getLegendElements(this.props.markerType).map((legendElement)=>{
      return <LegendElement image={legendElement.icon} name={legendElement.name} />
    })
    const elementsToDisplay =insertBreaks(legendElements)
    return (
      <div id='legend' onMouseEnter={() => { $('#openMenuButton').click() }} onMouseLeave={() => {}}>
        <div id='legend-content'>
          {elementsToDisplay}
          <h5 className='legend-title'>Legenda</h5>
        </div>

      </div>
    )
  }
}

function insertBreaks (legendElements) {
  let elementsWithBreaks = []
  const breakLines = [ 0, 3, 7 ]
  legendElements.forEach((element, index)=> {
    elementsWithBreaks.push(element)
    if (breakLines.includes(index)) {
      elementsWithBreaks.push(<div style={{width: '100%', height: '0px', margin: '0px'}} />)
    }
  })
  return elementsWithBreaks
}

export default Legend
