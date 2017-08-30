import {
  default as React,
  Component,
} from "react";
import {OverlayView} from "react-google-maps";

export const ClusteredMarkerOverlay = (props) => {
  console.log("_______ props.markers", props.markers);
  return <OverlayView
    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    position={(props && props.position) || props.center}
  >
    <div
      className="overlay-list"
      style={{
        backgroundColor: '#FFF',
        display: props.open ? 'inline-block' : 'none',
      }}
    >
      <ul>
        {props.markers && props.markers.map((marker, index) => {
          return <PlaceRow
            index = {index}
            icon = {marker.icon.url}
            name = {marker.title}
          />
        })}
      </ul>
    </div>
  </OverlayView>
}

const PlaceRow = (props) => {
  return  <li key={props.index} onClick={()=>{console.log('_____ implement opening clicked place card', props.name)}}>
    <img src={props.icon} width="32px" />
    <h4>{props.name}</h4>
  </li>
}

