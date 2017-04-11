import React, { Component } from 'react';
import css from './style.scss';
import Button from 'components/Button';
import moment from 'moment';
import Spinner from 'components/Spinner';

class TaskNotifications extends Component{
  constructor(props) {
    super(props);

    this.renderNotification = this.renderNotification.bind(this);
    this.renderSharedTask = this.renderSharedTask.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.showTaskDetails = this.showTaskDetails.bind(this);
    this.hideTaskDetails = this.hideTaskDetails.bind(this);

    this.state = {
      showTaskDetails: false,
      task: {}
    }
  }

  onAccept(taskId){     //if the user accepted the share request
    this.props.acceptTaskShare(taskId);
    this.setState({
      ...this.state,
      hideTask: taskId
    })
  }

  onDecline(taskId){     //if the user declined the share request
    this.props.declineTaskShare(taskId)
    this.setState({
      ...this.state,
      hideTask: taskId
    })
  }

  onConfirm(taskId){
    this.props.deleteTask(taskId)
    this.setState({
      ...this.state,
      hideTask: taskId
    })
  }

  showTaskDetails(task){
    this.setState({
      showTaskDetails: true,
      task: task
    })
  }

  hideTaskDetails(){
    this.setState({
      showTaskDetails: false,
      task: {}
    })
  }

  renderTaskDetails(task){ //render if the user moved the mouse over the task name
    let date = null;
    let project = null;
    let location = null;

    if (task.date){
      date = <p className={css.date}><i className={css.detailIcon + " fa fa-calendar"}/>{moment(task.date).format(this.props.dateFormat)}</p>
    }
    if (task.Project){
      project = <p className={css.project}><i className={css.detailIcon + " fa fa-chain"}/>{task.Project.name}</p>
    }
    if (task.location){
      location = <p className={css.location}><i className={css.detailIcon + " fa fa-map-marker"}/>{task.location}</p>
    }

    let style = null;
    if (this.state.showTaskDetails && this.state.task.id == task.id){
      style = {opacity: 1};
    }
    return (
      <div className={css.taskDetails} style={style}>
        <i className={css.caret + " fa fa-caret-up"}/>
        <p className={css.name}><i className={css.detailIcon + " fa fa-tasks"}/>{task.name}</p>
        {project}
        {location}
        {date}
      </div>
    )
  }

  renderNotification(task){
    if (task.UserTasks[0].shareStatus == "pending"){              //if the have a share request
      return this.renderSharedTask(task);
    }
    else{                                            //if the share was deleted
      return this.renderDeletedShare(task);
    }
  }

  renderDeletedShare(task){
    let sharedBy = task.UserTasks[0].sharedUser;
    let icon = sharedBy.photo_url ? <img className={css.userIcon} src={sharedBy.photo_url}/> : <i className={css.userIcon + " fa fa-user"}/>;

    let content = this.props.content;
    let style = this.state.hideTask==task.id ? {opacity: 0} : null;
    return (
      <div className={css.task} key={task.id} style={style}>
        {icon}
        <span className={css.nameSpan}>{sharedBy.username}</span>
        <span>{content.deletedTaskAccess}</span>
        <div  className={css.taskSpan}>
          <span onMouseOver={this.showTaskDetails.bind(this,task)} onMouseOut={this.hideTaskDetails}>
            <i className={css.taskIcon + " fa fa-tasks"}/>
            {task.name}
          </span>
          {this.renderTaskDetails(task)}
        </div>
        <div className={css.buttons}>
          <Button text={content.confirm} style={css.confirm} onClick={this.onConfirm.bind(this,task.id)}/>
        </div>
      </div>
    )
  }

  renderSharedTask(task){
    let sharedBy = task.UserTasks[0].sharedUser;
    let icon = sharedBy.photo_url ? <img className={css.userIcon} src={sharedBy.photo_url}/> : <i className={css.userIcon + " fa fa-user"}/>;

    let content = this.props.content;
    let style = this.state.hideTask==task.id ? {opacity: 0} : null;
    return (
      <div className={css.task} key={task.id} style={style}>
        {icon}
        <span className={css.nameSpan}>{sharedBy.username}</span>
        <span>{content.shareTaskMessage}</span>
        <div  className={css.taskSpan}>
          <span onMouseOver={this.showTaskDetails.bind(this,task)} onMouseOut={this.hideTaskDetails}>
            <i className={css.taskIcon + " fa fa-tasks"}/>
            {task.name}
          </span>
          {this.renderTaskDetails(task)}
        </div>

        <div className={css.buttons}>
          <Button text={content.decline} style={css.decline} onClick={this.onDecline.bind(this,task.id)}/>
          <Button text={content.accept} style={css.accept} onClick={this.onAccept.bind(this,task.id)}/>
        </div>
      </div>
    )
  }

  render(){

    return (
      <div className={css.base  + " container"} >
        <div className={css.sharedTasks}>
          {this.props.tasks.map(this.renderNotification)}
        </div>
      </div>

    )
  }
}

export default TaskNotifications
