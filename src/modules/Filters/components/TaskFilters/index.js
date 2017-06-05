import React, { Component } from 'react'
import css from './style.scss'
import {browserHistory} from 'react-router'

class TaskFilters extends Component {
  constructor(props){
    super(props);

    this.changeVisibility = this.changeVisibility.bind(this);
    this.goToTasks = this.goToTasks.bind(this);
    this.goToProjects = this.goToProjects.bind(this);
    this.goToArchive = this.goToArchive.bind(this);
    this.goToMap = this.goToMap.bind(this);

    this.state = {
      style: css.hideFilters,
      arrow: "right",
      active: "tasks"
    }
  }


  componentWillMount(){
    let pathname = window.location.pathname;
    if (pathname.substring(pathname.length - 8) == "projects"){
      this.setState({
        ...this.state,
        active: "projects"
      })
    }
    else if (pathname.substring(pathname.length - 7) == "archive"){
      this.setState({
        ...this.state,
        active: "archive"
      })
    }
    else if (pathname.substring(pathname.length - 3) == "map"){
      this.setState({
        ...this.state,
        active: "map"
      })
    }
  }

  componentWillReceiveProps(){
    let pathname = window.location.pathname;

    if (pathname.substring(pathname.length - 8) == "projects" ){
      if (this.state.active!="projects"){
        this.setState({
          ...this.state,
          active: "projects",
          style: css.hideFilters,
          arrow: "right"
        })
      }
    }
    else if (pathname.substring(pathname.length - 7) == "archive") {
      if (this.state.active!="archive"){
        this.setState({
          ...this.state,
          active: "archive",
          style: css.hideFilters,
          arrow: "right"
        })
      }
    }
    else if (pathname.substring(pathname.length - 3) == "map"){
      this.setState({
        ...this.state,
        active: "map",
        style: css.hideFilters,
        arrow: "right"
      })
    }
    else if (this.state.active!="tasks") {
      this.setState({
        ...this.state,
        active: "tasks",
        style: css.hideFilters,
        arrow: "right"
      })
    }
  }

  changeVisibility(){
    if (this.state.arrow == "right"){   //show filters
      this.setState({
        style: css.showFilters,
        arrow: "left"
      })
    }
    else{           //hide filters
      this.setState({
        style: css.hideFilters,
        arrow: "right"
      })
    }
  }

  goToTasks(){
    this.setState({
      ...this.state,
      active: "tasks"
    });
    browserHistory.push(window.location.pathname.substring(0,3) + '/tasks');
  }

  goToProjects(){
    this.setState({
      ...this.state,
      active: "projects"
    });
    browserHistory.push(window.location.pathname.substring(0,3) + '/projects');
  }

  goToArchive(){
    this.setState({
      ...this.state,
      active: "archive"
    });
    browserHistory.push(window.location.pathname.substring(0,3) + '/archive');
  }

  goToMap(){
    this.setState({
      ...this.state,
      active: "map"
    });
    browserHistory.push(window.location.pathname.substring(0,3) + '/map');
  }

  render() {
    return(
      <div className={css.base +" "+ this.state.style}>
        <i className={"fa fa-angle-double-"+this.state.arrow +" " + css.arrow} onClick={this.changeVisibility} />
        <div className={css.shadow} onClick={this.changeVisibility}/>
        <div className={css.filters}>
          <div>
            <p className={css.filter + ((this.state.active=="tasks") ? " "+css.active : "")} onClick={this.goToTasks}>{this.props.content.goToTasks}<i className="fa fa-tasks" aria-hidden="true"/></p>
          </div>
          <div>
            <p className={css.filter + ((this.state.active=="projects") ? " "+css.active : "")} onClick={this.goToProjects}>{this.props.content.goToProjects}<i className={"fa fa-chain " + css.chain} aria-hidden="true"/></p>
          </div>
          <div>
            <p className={css.filter + ((this.state.active=="archive") ? " "+css.active : "")} onClick={this.goToArchive}>{this.props.content.goToArchive}<i className="fa fa-archive" aria-hidden="true"/></p>
          </div>
          <div>
            <p className={css.filter + " " + css.map +  ((this.state.active=="map") ? " "+css.active : "")} onClick={this.goToMap}>{this.props.content.goToMap}<i className="fa fa-map-marker" aria-hidden="true"/></p>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskFilters
