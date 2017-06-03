import React, { Component } from 'react';
import css from './style.scss';

import Header from 'modules/Header/containers/HeaderContainer'
import Footer from 'modules/Footer/containers/FooterContainer'
import Map from './Map'
import RightPanel from './RightPanel'
import LeftPanel from './LeftPanel'
import moment from 'moment'

class MapPage extends Component{
  constructor(props) {
    super(props);

    this.selectMarker = this.selectMarker.bind(this);
    this.selectProject = this.selectProject.bind(this);
    this.unselectProject = this.unselectProject.bind(this);
    this.selectAllTasks = this.selectAllTasks.bind(this);
    this.selectTasksToShowOnMap = this.selectTasksToShowOnMap.bind(this);
    this.selectInterval = this.selectInterval.bind(this);

    this.state = {
      selectedProjects: [],
      markers: [],
      tasks: [],
      latitude: 0,
      longitude: 0,
      allTaskSelected: true,
      selectedInterval: 0
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

  selectProject(project){
    this.setState({
      ...this.state,
      selectedProjects: [
        ...this.state.selectedProjects,
        project.id
      ],
      allTaskSelected: false
    })
  }

  unselectProject(project){
    this.setState({
      ...this.state,
      selectedProjects: this.state.selectedProjects.filter((id) => project.id != id)
    })
  }

  selectAllTasks(){
    this.setState({
      ...this.state,
      selectedProjects: [],
      allTaskSelected: true
    })
  }

  selectTasksToShowOnMap(){
    let selectedTasks = [];

    if (this.state.selectedInterval == 0){      //az összes feladat van kiválasztva az időnél
      selectedTasks = this.props.task.list;
    }
    else if (this.state.selectedInterval == 1){      //a mai feladatok vannak kiválasztva
      selectedTasks = this.props.task.list.filter((task) => moment().isSame(moment(task.date), 'day'));
    }
    else if (this.state.selectedInterval == 2){      //a heti feladatok vannak kiválasztva
      selectedTasks = this.props.task.list.filter((task) => moment(task.date).isBetween(moment(), moment().add(7, 'days'),'days', '[]'));
    }
    else if (this.state.selectedInterval == 3){      //a havi feladatok vannak kiválasztva
      selectedTasks = this.props.task.list.filter((task) => moment(task.date).isBetween(moment(), moment().add(1, 'months'), 'days', '[]'));
    }

    if (this.state.allTaskSelected){  //ha az összes feladat van kiválasztva a projekteknél
      return selectedTasks;
    }
    else{
      return this.props.task.list.filter((task) =>
        (this.state.selectedProjects.indexOf(task.ProjectId) >= 0)
      );
    }
  }

  selectInterval(interval){
    this.setState({
      ...this.state,
      selectedInterval: interval
    })
  }

  render(){
    let selectedTasks = this.selectTasksToShowOnMap();

    return (
      <div >
        <Header/>
        <div className={css.base} >
          <LeftPanel content={this.props.content}
                     projects={this.props.project.list}
                     selectProject={this.selectProject}
                     unselectProject={this.unselectProject}
                     selectAllTasks={this.selectAllTasks}
                     selectedProjects={this.state.selectedProjects}
                     allTaskSelected={this.state.allTaskSelected}
                     selectInterval={this.selectInterval}
                     selectedInterval={this.state.selectedInterval}/>

          <RightPanel tasks={selectedTasks}
                      content={this.props.content}
                      onClick={this.selectMarker}
                      changeTaskOrder={this.props.changeTaskOrder}/>

          <Map setLocation={this.changeLocation}
               style={css.map}
               tasks={selectedTasks}
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
