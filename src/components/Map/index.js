import React, { Component } from 'react'
import css from './style.scss'

import { withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
import Geosuggest from 'react-geosuggest';

class Map extends Component{
  constructor(props){
    super(props);

    this.onSuggestSelect=this.onSuggestSelect.bind(this);
    this.state = {
      latitude: 0,
      longitude: 0
    }
  }

  componentWillMount(){
    //get current position from navigator
    if (this.props.location){
      this.setState({
        latitude: this.props.lat,
        longitude: this.props.lng
      });
    }
    else{
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          this.setState({
            latitude: latitude,
            longitude: longitude
          });
        }
      )
    }
  }

  onSuggestSelect(suggest) {
    this.props.setLocation(suggest);
    this.setState({
      latitude: suggest.location.lat,
      longitude: suggest.location.lng
    });
  }

  render(){
    let GoogleMapHoc = withGoogleMap(props => {
      return !this.state.latitude ? null :(
        <GoogleMap
          options={props.options}
          defaultZoom={props.defaultZoom || 13}
          defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}>
          {
            this.props.location
            ? <Marker position={new google.maps.LatLng(this.props.lat, this.props.lng)} title={this.props.location}/>
            :null
          }
        </GoogleMap>
      );
    });

    let suggest = this.props.location? this.props.location : "";
    return(
      <div className={css.base}>
        <GoogleMapHoc
          containerElement={<div className={css.map + " " +this.props.style}/>}
          mapElement={<div style={{height: "100%", width: "100%", position: "absolute"}}/>}
          {...this.props}/>
        <span className="fa fa-map-marker"/>
        <Geosuggest
          onSuggestSelect={this.onSuggestSelect}
          location={new google.maps.LatLng(this.state.latitude, this.state.latitude)}
          inputClassName={css.input}
          initialValue={suggest}
          disabled={this.props.suggestEnabled}
          label={suggest}
          suggestItemActiveClassName={css.activeItem}
          radius="20"/>
      </div>
    )
  }
}

export default Map
