import React, { Component } from 'react';
import css from './style.scss';
import TaskItem from './TaskItem';
import moment from 'moment';
import AddTask from 'modules/Tasks/containers/AddTaskContainer'

class TaskList extends Component {
  constructor(props){
    super(props);

    this.applyDateFilter = this.applyDateFilter.bind(this);
    this.renderTask = this.renderTask.bind(this);
  }
  componentWillMount(){
    this.props.getTaskList();
    this.props.reset();
  }

  applyDateFilter(task){
    console.log(task)
    let date = moment(task.date);
    return (date.isBetween(this.props.dateFrom,this.props.dateTo,'days', '[]'));
  }

  renderTask(task){
    let selectedProject = this.props.project.selected;
    if (task && !task.deleted){         //if the task was not deleted
      if (!selectedProject || (selectedProject.id == task.ProjectId)){ //if a project filter was selected then the task project must be the same
        return <TaskItem key={task.id} task={task}/>
      }
    }
    return  null;
  }

  render() {
    let tasks = this.props.task.list.filter(this.applyDateFilter);
    return(
        <div className={css.base}>
          <h1>Your tasks</h1>
          <AddTask
            buttonText="Add new task"
            buttonStyle={css.addTask}
            sendButtonText="Create task"/>
          {
            tasks.map( (task) =>
             this.renderTask(task)
            )
          }
        </div>
    );
  }
}

export default TaskList
