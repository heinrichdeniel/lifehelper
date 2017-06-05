import React, {Component} from "react";
import {browserHistory} from "react-router";
import css from "./style.scss";
import moment from "moment";
import reactDom from "react-dom";
import Modal from "react-bootstrap/lib/Modal";
import Button from "components/Button";
import AddTask from "modules/Tasks/containers/AddTaskContainer";
import MultiSelect from "components/MultiSelect";
import ConfirmationBox from "components/ConfirmationBox";
import TaskShare from "modules/Shares/containers/TaskShareContainer";

class TaskItem extends Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.showHideDeleteModal = this.showHideDeleteModal.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.archiveTask = this.archiveTask.bind(this);
    this.restoreTask = this.restoreTask.bind(this);
    this.shareTask = this.shareTask.bind(this);
    this.selectUsers = this.selectUsers.bind(this);
    this.sendShare = this.sendShare.bind(this);
    this.openCommentBox = this.openCommentBox.bind(this);
    this.renderShareModal = this.renderShareModal.bind(this);
    this.renderDeleteModal = this.renderDeleteModal.bind(this);


    this.state= {
      showOptions: false,
      showDeleteModal: false,
      showShareModal: false,
      selectedUsers: [],
      shareSent: false
    }
  }

  componentDidMount() {
    if (this.props.task.UserTasks && this.props.task.UserTasks[0].newComment) {
      this.setState({
        ...this.state,
        commentStyle:  {color: "#d30000"}
      });
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

  handleDocumentClick(e) {      //if the user clicked somewhere need to close the dropdown
    if (this.refs['settings'] && !reactDom.findDOMNode(this.refs['settings']).contains(e.target)) {
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
    let task = Object.assign({},this.props.task,{status: "completed"});
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
    let task = Object.assign({},this.props.task,{status: "archived"});
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
    let task = Object.assign({},this.props.task,{status: "pending", date: moment()});
    this.props.updateTask(task);
    this.setState({
      ...this.state,
      style: {
        'opacity': '0',
        'transition': 'opacity 0.2s linear'
      }
    })
  }

  shareTask(e){     //opening or hiding the share modal
    if (e){
      e.stopPropagation();
    }

    document.removeEventListener('click', this.handleDocumentClick, false);

    this.setState({
      ...this.state,
      showOptions: false,
      showShareModal: !this.state.showShareModal
    })
  }

  openCommentBox(e){
    if (e){
      e.stopPropagation();
    }
    this.setState({
      ...this.state,
      commentStyle: null
    });
    if (this.props.task.UserTasks[0].newComment) {
      this.props.clearNewComment({task: this.props.task});
    }
    this.props.selectTask(this.props.task.id);
  }

  selectUsers(selected){
    this.setState({
      ...this.state,
      selectedUsers: selected
    })
  }

  sendShare(){      //sending the share request to the server
    if (this.state.selectedUsers.length > 0){
      this.props.shareTask({users: this.state.selectedUsers, task: this.props.task});
    }

    this.setState({
      ...this.state,
      shareSent: true,
      showShareModal: false,
      selectedUsers: []
    })
  }

  renderDeleteModal(){
    let content = this.props.content.page.tasks.deleteTask;
    return (
      <Modal show={this.state.showDeleteModal}  dialogClassName={css.modal} onHide={this.showHideDeleteModal}>
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
    if (this.props.task.status == "pending"){     //if the task does not in archive
      archive = <p className={css.option} onClick={this.archiveTask}>{content.archive.archive}<i className="fa fa-archive"/></p>
    }
    else{     //if the task is in the archive
      restore = <p className={css.option} onClick={this.restoreTask}>{content.archive.restore}<i className="fa fa-undo"/></p>
    }
    if (this.state.showOptions){
      return (
        <div className={css.options} ref="settings">
          <i className={css.caretUp + " fa fa-caret-up"} aria-hidden="true"/>
          <p className={css.option} onClick={this.editTask}>{content.tasks.editTask.name}<i className="fa fa-pencil"/></p>
          <p className={css.option} onClick={this.shareTask}>{content.tasks.share.shareTask}<i className="fa fa-share-alt"/></p>
          {archive}
          {restore}
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
    if (this.props.task.status == "completed" || this.props.task.status == "archived")  {
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

  renderShareModal(){
    let content = this.props.content.page.tasks.share;
    return (
      <Modal show={this.state.showShareModal}   dialogClassName={css.modal} onHide={this.shareTask}>
        <div  className={css.container}>
          <i className={`fa fa-close ${css.close}`} onClick={this.shareTask} />
          <h1>{content.name}</h1>
          <MultiSelect options={this.props.users}
                       getUsersByFilter={this.props.getUsersByFilter}
                       placeholder={content.search}
                       noResultsText={content.noResultsText}
                       typeToSearch={content.typeToSearch}
                       selected={this.state.selectedUsers}
                       selectValue={this.selectUsers}
                       taskId={this.props.task.id}/>
          <Button type="button" onClick={this.sendShare} text={content.shareTask} style={css.share}/>
          <Button type="button" onClick={this.shareTask} text={content.cancel} style={css.cancelRed}/>

        </div>
      </Modal>
    )
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
    let overdue = null;
    if (this.props.task.time){
      date += ", "+moment(this.props.task.time,"hh:m").format(this.props.timeFormat)
    }

    if (this.props.task.status == "archived" || this.props.task.status == "completed"){     //if the task was moved to archive
      date = (
        <span>
          <i className="fa fa-check" aria-hidden="true"/>
          {moment(this.props.task.completedAt).format(this.props.dateFormat+", "+this.props.timeFormat)}
        </span>
      )
    }
    else if (moment(this.props.task.date).isBefore(moment())){
      overdue=<i className={css.overdue + " fa fa-exclamation-triangle"}/>;
    }

    return(
      <div className={css.base + " " + this.props.style} style={this.state.style} onClick={this.onClick}>
        <div className={css.task}>
          <h2>{this.props.task.name}</h2>
          {project}
          <p className={css.date}>{overdue}{date}</p>
          {this.renderCircleBeforeTitle()}
          <i className={css.commentIcon + " fa fa-commenting"} style={this.state.commentStyle} onClick={this.openCommentBox}/>
          <TaskShare task={this.props.task}/>    {/* share modal */}
          <i className={css.dots + " fa fa-ellipsis-h"} onClick={this.showOptions} aria-hidden="true"/>
        </div>
        {this.renderOptions()}      {/*dropdown with the task options*/}
        {this.renderDeleteModal()}    {/*modal for deleting a task*/}
        {this.renderEditTask()}      {/*modal for editing the new task*/}
        {this.renderShareModal()}      {/*modal for sharing the task*/}
        {this.state.shareSent ? <ConfirmationBox content={this.props.content.page.tasks.share.confirmation}/> : null}      {/*confirmation after sending share*/}
      </div>
    );
  }
}

export default TaskItem
