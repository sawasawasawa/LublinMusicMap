import React, {Component} from 'react';
import Map from './Map';
import Menu from './Menu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {

  elo = () => {
    console.log('elo')
    const bg = $('#header-background')
    bg.hasClass('triangle') ? bg.removeClass('triangle').addClass('rectangle') : bg.addClass('triangle').removeClass('rectangle');
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <h1 className={"title"}>Muzyczna <br/>
            Mapa<br/>
            Lublina</h1>
          <header onClick={this.elo}>
            <div id={"header-background"} ></div>
            {/*<div  className={"header--background"}></div>*/}
          </header>
          <Menu />
          <Map />

        </div>
      </MuiThemeProvider>
    );
  }
}