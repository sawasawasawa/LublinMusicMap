import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Paper from 'material-ui/Paper';
import LegendElement from './components/common/LegendElement';

export class Header extends Component {
  render() {
    const legendPaperStyle = {
      width: '256px',
      height: '512px',
      position: 'absolute',
      backgroundColor: '#313131',
      top:'0px',
      left: '100%',
      transform: 'rotateZ(45deg)',
      transformOrigin: '0% 0%'
    };
    const footerBackgroundStyle = {
      width: '266px',
      height: '266px',
      position:'fixed',
      bottom:'14px',
      right:0,
      borderColor: 'transparent transparent #007bff transparent',
      overflow: 'hidden'
    };

    return (
      <header>
        <div id={"moving-sidebars"}>
          <h1 className={"title"}><span className="title-strong" >Lublin</span><br />Muzyczna<br/>Mapa<br/></h1>
          <div >
              <Paper id={"header-background"} zDepth={5} style={{ backgroundColor: '#313131' }}></Paper>
              <div id="footer-background" style={footerBackgroundStyle}>
                <Paper id='legend-paper' zDepth={2} style={legendPaperStyle}>
                  <div id="legend" style={{ backgroundColor: '#313131' }} onMouseEnter={()=>{$('#openMenuButton').click()}} onMouseLeave={()=>{}}>
                    <div id="legend-content">
                      <h5 className="legend-title">Legenda</h5>
                      <LegendElement image="/img/disco-ball.svg" name="Klub"/>
                      <LegendElement image="/img/pint.svg" name="Pub"/>
                      <br />
                      <LegendElement image="/img/outdoorHall.png" name="Świeże powietrze"/>
                    </div>
                  </div>
                </Paper>
              </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;



