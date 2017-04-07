import React, { Component } from 'react'
import css from './style.scss'
import {browserHistory} from 'react-router'

import DateFilters from './containers/DateFiltersContainer'

class Filters extends Component {
  constructor(props){
    super(props);

    this.changeVisibility = this.changeVisibility.bind(this);
    this.goToTasks = this.goToTasks.bind(this);
    this.goToProjects = this.goToProjects.bind(this);
    this.goToArchive = this.goToArchive.bind(this);

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
  }

  componentWillReceiveProps(){
    let pathname = window.location.pathname;

    if (pathname.substring(pathname.length - 8) == "projects" ){
      if (this.state.active!="projects"){
        this.setState({
          ...this.state,
          active: "projects"
        })
      }
    }
    else if (pathname.substring(pathname.length - 7) == "archive") {
      if (this.state.active!="archive"){
        this.setState({
          ...this.state,
          active: "archive"
        })
      }
    }
    else if (this.state.active!="tasks") {
      this.setState({
        ...this.state,
        active: "tasks"
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


  render() {
    return(
      <div className={css.base +" "+ this.state.style+" col-xs-1 col-sm-5 col-lg-5"}>
        <i className={"fa fa-angle-double-"+this.state.arrow +" " + css.arrow} onClick={this.changeVisibility} />
        <div className={css.shadow} onClick={this.changeVisibility}/>
        <div className={css.filters}>
          <p className={css.filter + ((this.state.active=="tasks") ? " "+css.active : "")} onClick={this.goToTasks}>{this.props.content.goToTasks}<i className="fa fa-tasks" aria-hidden="true"/></p>
          <p className={css.filter + ((this.state.active=="projects") ? " "+css.active : "")} onClick={this.goToProjects}>{this.props.content.goToProjects}<i className="fa fa-chain" aria-hidden="true"/></p>
          <p className={css.filter + ((this.state.active=="archive") ? " "+css.active : "")} onClick={this.goToArchive}>{this.props.content.goToArchive}<i className="fa fa-archive" aria-hidden="true"/></p>
          <DateFilters/>
        </div>
      </div>
    )
  }
}

export default Filters
