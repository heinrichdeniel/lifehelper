import React, { Component } from 'react';
import css from './style.scss';
import TaskItem from './TaskItem';
import moment from 'moment';
import AddTask from '../../containers/AddTaskContainer'
import Spinner from 'components/Spinner';

class TaskList extends Component {
  constructor(props){
    super(props);

    this.applyDateFilter = this.applyDateFilter.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  componentWillMount() {
    this.props.getTaskList();
  }

  applyDateFilter(task){
    let date = moment(task.date);
    return (date.isBetween(this.props.dateFrom,this.props.dateTo,'days', '[]'));
  }

  changeName(e){
    this.setState({
      ...this.state,
      project:{
        ...this.state.project,
        name: e.target.value
      }
    })
  }

  renderTitle(){
    let content = this.props.content.page;

    return (
      <div className={css.projectTitle}>
        <h1>{content.tasks.yourTasks}</h1>
        <AddTask
          buttonText={content.tasks.addTask.addTask}
          buttonStyle={css.addTask}
          sendButtonText={content.tasks.addTask.name}
          update={false}
          iconStyle={css.addIcon}/>
      </div>
    );
  }

  renderTask(task){
    if (task && !task.deleted){         //if the task was not deleted
      return (
        <TaskItem
          key={task.id}
          task={task}
          content={this.props.content}
          dateFormat={this.props.user.current.dateFormat}
          timeFormat={this.props.user.current.timeFormat}
          deleteTask={this.props.deleteTask}
          updateTask={this.props.updateTask}
          users={this.props.user.list}
          getUsersByFilter={this.props.getUsersByFilter}
          shareTask={this.props.shareTask}
          selectTask={this.props.selectTask}/>
      )
    }
    return  null;
  }

  render() {
    if (this.props.task.pending) {    /* while dont get response from server */
      return(
        <div className={css.base}>
          {this.renderTitle()}
          <Spinner/>
        </div>
      )
    }
    else{

      let tasks = this.props.task.filteringByDate ? this.props.task.list.filter(this.applyDateFilter) : this.props.task.list;
      return(
        <div className={css.base}>
          {this.renderTitle()}
          <div className={css.tasks}>
            {
              tasks.map( (task) =>
                this.renderTask(task)
              )
            }
          </div>
        </div>
      );
    }
  }
}

export default TaskList
