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
    browserHistory.push("/task/"+this.props.task.id);
  }
  render() {

    return(
      <div className={css.base} onClick={this.onClick}>
          <h2>{this.props.task.name}</h2>
          <p className={css.description}>{this.props.task.description}</p>
          <p className={css.date}>{moment(this.props.task.date).format("MMM DD")}, {moment(this.props.task.time,"hh:m").format("HH:mm")}</p>
      </div>
    );
  }
}

export default TaskItem
