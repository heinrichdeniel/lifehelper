import React, {Component} from "react";
import css from "./style.scss";
import moment from "moment";
import {browserHistory} from "react-router";

class Map extends Component{
  constructor(props) {
    super(props);

    this.markers = [];
    this.createNewMap = this.createNewMap.bind(this);
    this.deleteMarkers = this.deleteMarkers.bind(this);
    this.createNewMarkers = this.createNewMarkers.bind(this);
    this.state = {
      map: null
    }
  }

  componentDidUpdate(nextProps){

    if( (this.props.tasks != nextProps.tasks && this.props.latitude) || (this.props.latitude != nextProps.latitude) || (this.state.map && (this.state.map.center.lat() != this.props.latitude))){
      this.createNewMap();
    }
    else {
      this.deleteMarkers();
      this.createNewMarkers();
    }
  }

  createNewMap(){
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: this.props.defaultZoom || 13,
      center: {lat: this.props.latitude, lng: this.props.longitude }
    });

    this.props.tasks.map((task,index) => {
      if (task.location){
        let marker = new google.maps.Marker({
          position: {
            lat: task.lat,
            lng: task.lng
          },
          title: task.location,
          icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green' + (index+1) + '.png',
          map: map
        });
        this.markers.push(marker);
        this.attachInfoWindow(marker, task);
      }
    });

    this.setState({
      map: map
    })
  }

  createNewMarkers(){
    this.props.tasks.map((task,index) => {
      if (task.location){
        let marker = new google.maps.Marker({
          position: {
            lat: task.lat,
            lng: task.lng
          },
          title: task.location,
          icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green' + (index+1) + '.png',
          map: this.state.map
        });
        this.attachInfoWindow(marker, task);
      }
    })
  }

  deleteMarkers(){
    this.markers.map((marker) => {
      marker.setMap(null);
      marker = null;
    })
  }

  attachInfoWindow(marker,task){
    let project = task.ProjectId ? `<div className=project><i className='fa fa-chain'/>`+task.Project.name+`</div>` : "";
    let date = moment(task.date).format(this.props.dateFormat);
    if (task.time){
      date += ", "+ moment(task.time,"hh:m").format(this.props.timeFormat)
    }
    let infowindow = new google.maps.InfoWindow({
      content: '<div className='+css.infoWindow+'>'+
      '<h1>'+task.name+'</h1>'+
        project+
        '<p className='+css.date+'><i className=fa fa-calendar/>'+date+'</p>'+
        '<p className='+css.location+'><i className="fa fa-map-marker"/>'+task.location+'</p>'+
      '</div>'
    });

    marker.addListener('click', function() {
      browserHistory.push(window.location.pathname.substring(0,3)+"/task/"+task.id);
    });
    marker.addListener('mouseover', function() {
      infowindow.open(marker.get('map'), marker);
    });
    marker.addListener('mouseout', function() {
      infowindow.close(marker.get('map'), marker);
    });
  }

  render(){
    return(
      <div className={css.base}>
        {!this.props.latitude ? null : <div id="map" className={css.map}/>}
      </div>
    )
  }
}

export default Map
