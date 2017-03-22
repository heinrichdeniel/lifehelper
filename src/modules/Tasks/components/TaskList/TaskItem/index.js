import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import css from './style.scss'
import moment from 'moment'

class TaskItem extends Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
    this.getDescription = this.getDescription.bind(this);
  }

  onClick(){
    browserHistory.push(window.location.pathname.substring(0,3)+"/task/"+this.props.task.id);
  }

  getDescription(){
    let description = this.props.task.description;
    let lastSpace = 30;       //the maximum number of characters in description will be 30 chars

    if (description.length > 30){
      while (description[lastSpace] != " " && lastSpace>0){
        lastSpace--;
      }
      if (lastSpace == 0){
        lastSpace = 30;
      }
      description = description.substring(0,lastSpace) + "...";
    }
    return description;
  }

  render() {
    let project = null;
    let location = null;

    if (this.props.task.Project) {  //if a task was selected
      project =  (
        <p className={css.project}>
          <i className={" fa fa-chain"}/>
          {this.props.task.Project.name}
        </p>
      )
    }

    if (this.props.task.location) {  //if a task was selected
      location =  (
        <p className={css.location}>
          <i className={" fa fa-map-marker"}/>
          {this.props.task.location}
        </p>
      )
    }

    return(
      <div className={css.base} onClick={this.onClick}>
        <h2>{this.props.task.name}</h2>
        <p className={css.description}>{this.getDescription()}</p>
        {location}
        <p className={css.date}>{moment(this.props.task.date).format(this.props.dateFormat)}, {moment(this.props.task.time,"hh:m").format(this.props.timeFormat)}</p>
        {project}
      </div>
    );
  }
}

export default TaskItem
