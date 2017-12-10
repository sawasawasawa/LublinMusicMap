import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

export default class AboutDialog extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  };

  render () {
    const actions = [
      <FlatButton
        label='Anuluj'
        primary
        onTouchTap={this.handleClose}
      />
    ]

    return (
      <div>
        <RaisedButton label={'O projekcie'} onTouchTap={this.handleOpen} />
        <Dialog
          title='O projekcie'
          modal
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{zIndex: 10}}
          autoScrollBodyContent
        >
          <p>Muzyczna mapa Lublina to:
            <ul>
              <li>wirtualna, społecznościowa i interaktywna mapa naszego miasta, pokazująca jego muzyczne
            oblicze</li>
              <li>specyficzny i nowoczesny przewodnik po Lublinie</li>
              <li>miejsce gromadzące muzyczne wspomnienia mieszkańców miasta</li>
              <li>możliwość promocji muzycznych miejsc, wydarzeń i artystów
          Muzyczna mapa Lublina jest projektem Warsztatów Kultury w Lublinie. Powstała w ramach działań
                Warsztatu Medialabowego.</li>
            </ul>
          </p>
          <iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=1724267669/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=1631376752/transparent=true/" seamless><a href="http://warsztatmedialabowy.bandcamp.com/album/field-recording">Field recording by Warsztaty Kultury w Lublinie</a></iframe>
          <div style = {{display: 'flex', justifyContent: 'space-between'}}>
            <Image src={'img/about/WM_Logo1.jpg'} />
            <Image src={'img/about/700pitek.jpg'} />
            <Image src={'img/about/logo.B.jpg'} />
          </div>
        </Dialog>
      </div>
    )
  }
}

const Image = props => <img src={props.src} style={{maxHeight: '50px', maxWidth: '500px', margin: '20px auto', display: 'flex', justifyContent: 'space-between'}} />