import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import css from './style.scss'
import moment from 'moment'

class TaskItem extends Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    browserHistory.push(window.location.pathname.substring(0,3)+"/task/"+this.props.task.id);
  }
  render() {
    let project = null;
    if (this.props.task.Project) {  //if a task was selected
      project =  (
        <p className={css.project}>
          <i className={" fa fa-chain"}/>
          {this.props.task.Project.name}
        </p>
      )
    }
    return(
      <div className={css.base} onClick={this.onClick}>
        <h2>{this.props.task.name}</h2>
        <p className={css.description}>{this.props.task.description}</p>
        <p className={css.date}>{moment(this.props.task.date).format("MMM DD")}, {moment(this.props.task.time,"hh:m").format("HH:mm")}</p>
        {project}
      </div>
    );
  }
}

export default TaskItem
