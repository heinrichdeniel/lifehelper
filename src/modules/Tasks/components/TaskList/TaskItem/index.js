import React, { Component } from 'react'
import css from './style.scss'
import moment from 'moment'

class TaskItem extends Component {
  constructor(props){
    super(props);
  }

  render() {

    return(
      <div className={css.base}>
          <h2>{this.props.task.name}</h2>
          <p className={css.description}>{this.props.task.description}</p>
          <p className={css.date}>{moment(this.props.task.date).format("MMM DD")}, {this.props.task.time}</p>
      </div>
    );
  }
}

export default TaskItem
