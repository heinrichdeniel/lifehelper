import React, { Component } from 'react';
import css from './style.scss';
import TaskItem from '../TaskList/TaskItem';

class Archive extends Component {
  constructor(props){
    super(props);

    this.renderTask = this.renderTask.bind(this);
  }

  componentWillMount() {
    this.props.getArchive();
  }

  renderTask(task){
    if (task && !task.deleted && (task.completed || task.archived)){         //if the task was not deleted
      return (
        <TaskItem
          key={task.id}
          task={task}
          content={this.props.content}
          dateFormat={this.props.user.dateFormat}
          timeFormat={this.props.user.timeFormat}
          deleteTask={this.props.deleteTask}
          updateTask={this.props.updateTask}/>
      )
    }
    return  null;
  }

  render() {
    if (this.props.task.pending) {    /* while dont get response from server */
      return(
        <div className={css.base}>
          <h1>{this.props.content.page.archive.title}</h1>
          <div className={css.spinner}>
            <i className={"fa fa-spinner fa-spin"} />
          </div>
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
