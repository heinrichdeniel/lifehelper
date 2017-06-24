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
import ReactTooltip from 'react-tooltip'

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
    let props = this.props.item ? this.props.item : this.props;
    if (props.task.UserTasks && props.task.UserTasks[0].newComment) {
      this.setState({
        ...this.state,
        commentStyle:  {color: "#d30000"}
      });
    }
  }


  onClick(){
    let props = this.props.item ? this.props.item : this.props;
    browserHistory.push(window.location.pathname.substring(0,3)+"/task/"+props.task.id);
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
    let props = this.props.item ? this.props.item : this.props;
    props.deleteTask(props.task.id);
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
    });
  }

  completeTask(e){   //sending request for updating the complete attribute of the task
    e.stopPropagation();
    let props = this.props.item ? this.props.item : this.props;

    let task = Object.assign({},props.task,{status: "completed"});

    props.updateTask(task);
  }

  archiveTask(e){   //sending request for updating the archive attribute of the task
    e.stopPropagation();
    let props = this.props.item ? this.props.item : this.props;
    let task = Object.assign({},props.task,{status: "archived"});
    this.setState({
      ...this.state,
      style: {
        'opacity': '0',
        'transition': 'opacity 0.2s linear'
      }
    });
    props.updateTask(task);
  }

  restoreTask(e){   //sending request for updating the archived attribute of the task
    e.stopPropagation();
    let props = this.props.item ? this.props.item : this.props;
    let task = Object.assign({},props.task,{status: "pending", date: moment()});
    this.setState({
      ...this.state,
      style: {
        'opacity': '0',
        'transition': 'opacity 0.2s linear'
      }
    });
    props.updateTask(task);
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
    let props = this.props.item ? this.props.item : this.props;
    if (e){
      e.stopPropagation();
    }
    this.setState({
      ...this.state,
      commentStyle: null
    });
    if (props.task.UserTasks[0].newComment) {
      props.clearNewComment({task: props.task});
    }
    props.selectTask(props.task.id);
  }

  selectUsers(selected){
    this.setState({
      ...this.state,
      selectedUsers: selected
    })
  }

  sendShare(){      //sending the share request to the server
    let props = this.props.item ? this.props.item : this.props;
    if (this.state.selectedUsers.length > 0){
      props.shareTask({users: this.state.selectedUsers, task: props.task});
    }

    this.setState({
      ...this.state,
      shareSent: true,
      showShareModal: false,
      selectedUsers: []
    })
  }

  renderDeleteModal(){
    let props = this.props.item ? this.props.item : this.props;
    let content = props.content.page.tasks.deleteTask;
    return (
      <Modal show={this.state.showDeleteModal}  dialogClassName={css.modal} onHide={this.showHideDeleteModal}>
        <div  className={css.container}>
          <i className={`fa fa-close ${css.close}`} onClick={this.showHideDeleteModal} />
          <h1>{props.task.name}</h1>
          <p>{content.question}</p>
          <Button type="button" onClick={this.deleteTask} text={content.delete} style={css.confirm}/>
          <Button type="button" onClick={this.showHideDeleteModal} text={content.cancel} style={css.cancel}/>
        </div>
      </Modal>
    )
  }


  renderEditTask(){
    let props = this.props.item ? this.props.item : this.props;

    if (this.state.editTask){      //if the user want to add a new task to this project
      return (
        <AddTask
          buttonText={props.content.page.tasks.editTask.name}
          sendButtonText={props.content.page.tasks.editTask.update}
          showModal={true}
          taskToUpdate={props.task}
          onHide={this.editTask}/>
      )
    }
  }

  renderCircleBeforeTitle(){      //icon to show if the task is completed or uncompleted
    let props = this.props.item ? this.props.item : this.props;

    if (props.task.status == "completed" || props.task.status == "archived")  {
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
    let props = this.props.item ? this.props.item : this.props;

    let content = props.content.page.tasks.share;
    return (
      <Modal show={this.state.showShareModal}   dialogClassName={css.modal} onHide={this.shareTask}>
        <div  className={css.container}>
          <i className={`fa fa-close ${css.close}`} onClick={this.shareTask} />
          <h1>{content.name}</h1>
          <MultiSelect options={props.users}
                       getUsersByFilter={props.getUsersByFilter}
                       placeholder={content.search}
                       noResultsText={content.noResultsText}
                       typeToSearch={content.typeToSearch}
                       selected={this.state.selectedUsers}
                       selectValue={this.selectUsers}
                       taskId={props.task.id}/>
          <Button type="button" onClick={this.sendShare} text={content.shareTask} style={css.share}/>
          <Button type="button" onClick={this.shareTask} text={content.cancel} style={css.cancelRed}/>

        </div>
      </Modal>
    )
  }

  render() {
    let props = this.props.item ? this.props.item : this.props;
    let project = null;

    if (props.task.Project) {  //if a task was selected
      project =  (
        <p className={css.project}>
          <i className={" fa fa-chain"}/>
          {props.task.Project.name}
        </p>
      )
    }

    let date = moment(props.task.date).format(props.dateFormat);
    let overdue = null;
    if (props.task.time){
      date += ", "+moment(props.task.time,"hh:m").format(props.timeFormat)
    }

    let editIcon = <i className={css.editIcon + " fa fa-pencil"}  data-tip={props.content.page.tasks.editTask.name} onClick={this.editTask} />;
    let shareIcon = <TaskShare task={props.task}/>;
    let commentIcon = <i className={css.commentIcon + " fa fa-commenting"} data-tip={props.content.page.comments.newComment} style={this.state.commentStyle} onClick={this.openCommentBox}/>
    if (props.task.status == "archived" || props.task.status == "completed"){     //if the task was moved to archive
      date = (
        <span>
          <i className="fa fa-check" aria-hidden="true"/>
          {moment(props.task.completedAt).format(props.dateFormat+", "+props.timeFormat)}
        </span>
      )
      editIcon = null;
      shareIcon = null;
      commentIcon = null;
    }
    else if (moment(props.task.date).isBefore(moment(),'days')){
      overdue=<i className={css.overdue + " fa fa-exclamation-triangle"}/>;
    }
    else if (moment(props.task.date).isBefore(moment())){
      overdue=<i className={css.overdue + " fa fa-exclamation-triangle"} style={{color: 'orange'}}/>;
    }

    return(
      <div className={css.base + " " + props.style} style={this.state.style} onClick={this.onClick}>
        <div className={css.task}>
          <h2>{props.task.name}</h2>
          {project}
          <p className={css.date}>{overdue}{date}</p>
          {this.renderCircleBeforeTitle()}

          {commentIcon}
          {shareIcon}
          {editIcon}

          <i className={css.deleteIcon + " fa fa-trash"} data-tip={props.content.page.tasks.deleteTask.name} onClick={this.showHideDeleteModal} />

          <ReactTooltip />
        </div>
        {this.renderDeleteModal()}    {/*modal for deleting a task*/}
        {this.renderEditTask()}      {/*modal for editing the new task*/}
        {this.renderShareModal()}      {/*modal for sharing the task*/}
        {this.state.shareSent ? <ConfirmationBox content={props.content.page.tasks.share.confirmation}/> : null}      {/*confirmation after sending share*/}
      </div>
    );
  }
}

export default TaskItem
