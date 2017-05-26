import React, { Component } from 'react';
import css from './style.scss';

import Header from 'modules/Header/containers/HeaderContainer'
import Footer from 'modules/Footer/containers/FooterContainer'
import Map from './Map'
import RightPanel from './RightPanel'

class MapPage extends Component{
  constructor(props) {
    super(props);

    this.selectMarker = this.selectMarker.bind(this);
    this.state = {
      markers: [],
      tasks: [],
      latitude: 0,
      longitude: 0
    };
  }

  componentWillMount(){
    this.props.getTaskList();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        this.setState({
          ...this.state,
          latitude: latitude,
          longitude: longitude
        });
      }
    );
  }

  componentDidUpdate(){
    let found = false;

    if (this.state.latitude == 0){
      this.props.task.list.map((task,index) => {
        if (task.location){
          if (!found){
            found = true;
            this.setState({
              ...this.state,
              latitude: task.lat,
              longitude:  task.lng
            })
          }
        }
      });


    }
  }

  selectMarker(latitude, longitude){
    this.setState({
      ...this.state,
      longitude: longitude,
      latitude: latitude
    })
  }

  render(){
    return (
      <div >
        <Header/>
        <div className={css.base} >
          <RightPanel tasks={this.props.task.list}
                      content={this.props.content}
                      onClick={this.selectMarker}
                      changeTaskOrder={this.props.changeTaskOrder}/>
          <Map setLocation={this.changeLocation}
               style={css.map}
               tasks={this.props.task.list}
               latitude={this.state.latitude}
               longitude={this.state.longitude}
               dateFormat={this.props.dateFormat}
               timeFormat={this.props.timeFormat}/>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default MapPage
