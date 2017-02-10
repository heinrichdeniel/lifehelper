import React, { Component } from 'react';
import moment from 'moment';
import css from './style.scss';

import AddTask from 'modules/Tasks/containers/AddTaskContainer'
import Button from 'components/Button'

class TaskPage extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    //get id from the url
    this.props.getTaskById(window.location.pathname.substring(6))
  }

  render() {
    let task = this.props.task.current;


    if (task.name){       //returning the task data
      return(
        <div className={css.base + " container"}>
          <h1>{task.name}</h1>
          <div className={css.details}>
            <p className={css.description}>{task.description}</p>
            <p className={css.date}>{moment(task.date).format("MMM DD")}, {task.time}</p>
          </div>
          <AddTask
            buttonText="Edit task"
            sendButtonText="Update task"/>
        </div>
      );
    }
    else return null;

  }
}

export default TaskPage
