import React, { Component } from 'react';
import css from './style.scss';
import TaskItem from './TaskItem';
import moment from 'moment';

class TaskList extends Component {
  constructor(props){
    super(props);

    this.applyDateFilter = this.applyDateFilter.bind(this);
  }
  componentWillMount(){
    this.props.getTaskList();
    this.props.reset();
  }

  applyDateFilter(task){
    let date = moment(task.date);
    return (date >= this.props.dateFrom && date <= this.props.dateTo);
  }
  render() {
    let tasks = this.props.task.list.filter(this.applyDateFilter);
    return(
        <div className={css.base}>
          {
            tasks.map( (task) =>
             (task && !task.deleted) ? <TaskItem key={task.id} task={task}/> : null //if deleted then return null else return the task
            )
          }
        </div>
    );
  }
}

export default TaskList
