import React, { Component } from 'react';
import css from './style.scss';
import TaskItem from '../TaskList/TaskItem';
import Spinner from 'components/Spinner';

class Archive extends Component {
  constructor(props){
    super(props);

    this.renderTask = this.renderTask.bind(this);
  }

  componentWillMount() {
    this.props.getArchive();
  }

  renderTask(task){
    if (task && (task.status == "completed" || task.status == "archived")){         //if the task was not deleted
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
          shareTask={this.props.shareTask}/>
      )
    }
    return  null;
  }

  render() {
    if (this.props.task.pending) {    /* while dont get response from server */
      return(
        <div className={css.base}>
          <h1>{this.props.content.page.archive.title}</h1>
          <Spinner/>
        </div>
      )
    }
    else{
      let tasks = this.props.task.list;
      return(
        <div className={css.base}>
          <h1>{this.props.content.page.archive.title}</h1>
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

export default Archive
