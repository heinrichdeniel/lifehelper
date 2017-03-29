import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import css from './style.scss'
import moment from 'moment'
import reactDom from 'react-dom';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'components/Button';
import AddTask from 'modules/Tasks/containers/AddTaskContainer'

class TaskItem extends Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.renderDeleteModal = this.renderDeleteModal.bind(this);
    this.showHideDeleteModal = this.showHideDeleteModal.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.archiveTask = this.archiveTask.bind(this);
    this.restoreTask = this.restoreTask.bind(this);

    this.state={
      showOptions: false,
      showDeleteModal: false
    }
  }

  onClick(){
    browserHistory.push(window.location.pathname.substring(0,3)+"/task/"+this.props.task.id);
  }

  showOptions(e){
    if (e){
      e.stopPropagation();
    }
    if (!this.state.showOptions){
      document.addEventListener('click', this.handleDocumentClick, false);
    }
    else{
      document.removeEventListener('click', this.handleDocumentClick, false);
    }
    this.setState({
      ...this.state,
      showOptions: !this.state.showOptions
    })
  }

  showHideDeleteModal(e){
    if (e){
      e.stopPropagation();
    }
    document.removeEventListener('click', this.handleDocumentClick, false);

    this.setState({
      ...this.state,
      showOptions: false,
      showDeleteModal: !this.state.showDeleteModal
    })
  }

  handleDocumentClick() {      //if the user clicked somewhere need to close the dropdown
    if (this.refs['settings'] && !reactDom.findDOMNode(this.refs['settings']).contains(event.target)) {
      this.showOptions();
    }
  }

  deleteTask(){       //sending request for deleting the task
    this.props.deleteTask(this.props.task.id);
  }

  editTask(e){        //updating the task details
    if (e){
      e.stopPropagation();
    }
    document.removeEventListener('click', this.handleDocumentClick, false);
    this.setState({
      ...this.state,
      showOptions: false,
      editTask: !this.state.editTask
    })
  }

  completeTask(e){   //sending request for updating the complete attribute of the task
    e.stopPropagation();
    let task = Object.assign({},this.props.task,{completed: true});
    this.props.updateTask(task);
    this.setState({
      ...this.state,
      style: {
        'opacity': '0',
        'transition': 'opacity 0.2s linear'
      }
    })
  }

  archiveTask(e){   //sending request for updating the archive attribute of the task
    e.stopPropagation();
    let task = Object.assign({},this.props.task,{archived: true});
    this.props.updateTask(task);
    this.setState({
      ...this.state,
      style: {
        'opacity': '0',
        'transition': 'opacity 0.2s linear'
      }
    })
  }

  restoreTask(e){   //sending request for updating the archived attribute of the task
    e.stopPropagation();
    let task = Object.assign({},this.props.task,{archived: false, completed: false, date: moment()});
    this.props.updateTask(task);
    this.setState({
      ...this.state,
      style: {
        'opacity': '0',
        'transition': 'opacity 0.2s linear'
      }
    })
  }

  renderDeleteModal(){
    let content = this.props.content.page.tasks.deleteTask;
    return (
      <Modal show={this.state.showDeleteModal}  dialogClassName={css.deleteModal} onHide={this.showHideDeleteModal}>
        <div  className={css.container}>
          <i className={`fa fa-close ${css.close}`} onClick={this.showHideDeleteModal} />
          <h1>{this.props.task.name}</h1>
          <p>{content.question}</p>
          <Button type="button" onClick={this.deleteTask} text={content.delete} style={css.confirm}/>
          <Button type="button" onClick={this.showHideDeleteModal} text={content.cancel} style={css.cancel}/>
        </div>
      </Modal>
    )
  }

  renderOptions(){
    let content = this.props.content.page;

    let archive = null;
    let restore = null;
    if (!this.props.task.archived && !this.props.task.completed){     //if the task does not in archive
      archive = <p className={css.option} onClick={this.archiveTask}>{content.archive.archive}<i className="fa fa-archive"/></p>
    }
    else{     //if the task is in the archive
      restore = <p className={css.option} onClick={this.restoreTask}>{content.archive.restore}<i className="fa fa-undo"/></p>
    }
    if (this.state.showOptions){
      return (
        <div className={css.options} ref="settings">
          <i className={css.caretUp + " fa fa-caret-up"} aria-hidden="true"/>
          {archive}
          {restore}
          <p className={css.option} onClick={this.editTask}>{content.tasks.editTask.name}<i className="fa fa-pencil"/></p>
          <p className={css.option + " " + css.delete} onClick={this.showHideDeleteModal}>{content.tasks.deleteTask.name}<i className="fa fa-trash"/></p>
        </div>
      )
    }
  }

  renderEditTask(){
    if (this.state.editTask){      //if the user want to add a new task to this project
      return (
        <AddTask
          buttonText={this.props.content.page.tasks.editTask.name}
          sendButtonText={this.props.content.page.tasks.editTask.update}
          showModal={true}
          taskToUpdate={this.props.task}
          onHide={this.editTask}/>
      )
    }
  }

  renderCircleBeforeTitle(){      //icon to show if the task is completed or uncompleted
    if (this.props.task.completed)  {
      return (
        <div className={css.restoreTask} onClick={this.restoreTask}>
          <i className="fa fa-check" aria-hidden="true"/>
        </div>
      )
    }
    else if (this.props.task.archived)  {
      return (
        <div className={css.restoreTask} onClick={this.restoreTask}>
          <i className="fa fa-check" aria-hidden="true"/>
        </div>
      )
    }
    else{
      return (
        <div className={css.finishTask} onClick={this.completeTask}>
          <i className="fa fa-check" aria-hidden="true"/>
        </div>
      )
    }
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

    let date = moment(this.props.task.date).format(this.props.dateFormat);
    if (this.props.task.archived || this.props.task.completed){
      date = <div>
        <i className="fa fa-check" aria-hidden="true"/>
        {moment(this.props.task.completedAt).format(this.props.dateFormat+", "+this.props.timeFormat)}
      </div>
    }
    else if (this.props.task.time){
      date += ", "+moment(this.props.task.time,"hh:m").format(this.props.timeFormat)
    }
    return(
      <div className={css.base + " "} style={this.state.style} onClick={this.onClick}>
        <div className={css.task}>
          <h2>{this.props.task.name}</h2>
          {project}
          <p className={css.date}>{date}</p>
          {this.renderCircleBeforeTitle()}
          <i className={css.dots + " fa fa-ellipsis-h"} onClick={this.showOptions} aria-hidden="true"/>

        </div>
        {this.renderOptions()}      {/*dropdown with the task options*/}
        {this.renderDeleteModal()}    {/*modal for deleting a task*/}
        {this.renderEditTask()}      {/*modal for editing the new task*/}
      </div>
    );
  }
}

export default TaskItem
