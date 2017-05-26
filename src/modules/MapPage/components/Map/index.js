import React, {Component} from "react";
import css from "./style.scss";
import {withGoogleMap, GoogleMap} from "react-google-maps";
import Markers from "./Markers";

class Map extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    let GoogleMapHoc = withGoogleMap(props => {
      return !this.props.latitude ? null :(
          <GoogleMap
            options={props.options}
            defaultZoom={props.defaultZoom || 13}
            defaultCenter={{ lat: this.props.latitude, lng: this.props.longitude }}>
            <Markers tasks={this.props.tasks}
                     dateFormat={this.props.dateFormat}
                     timeFormat={this.props.timeFormat}/>

          </GoogleMap>
        )
    });

    return(
      <div className={css.base}>
        <GoogleMapHoc
          containerElement={<div className={css.map + " " +this.props.style}/>}
          mapElement={<div style={{height: "100%", width: "100%", position: "absolute"}}/>}
          {...this.props}/>

      </div>
    )
  }
}

export default Map
