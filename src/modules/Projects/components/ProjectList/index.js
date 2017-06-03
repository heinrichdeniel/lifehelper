import React, { Component } from 'react';
import css from './style.scss';
import moment from 'moment';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import Modal from 'react-bootstrap/lib/Modal'
import TaskItem from 'modules/Tasks/components/TaskList/TaskItem'
import AddProject from './AddProject'
import AddTask from 'modules/Tasks/containers/AddTaskContainer'
import ProjectShare from 'modules/Shares/containers/ProjectShareContainer'
import reactDom from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import domCss from 'dom-css';

class ProjectList extends Component {
  constructor(props){
    super(props);

    this.changeDateFilter = this.changeDateFilter.bind(this);
    this.renderProject = this.renderProject.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.showProjectSettings = this.showProjectSettings.bind(this);
    this.hideProjectSettings = this.hideProjectSettings.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.editProject = this.editProject.bind(this);
    this.showHideDeleteModal = this.showHideDeleteModal.bind(this);
    this.renderDeleteModal = this.renderDeleteModal.bind(this);
    this.renderList = this.renderList.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.addTask = this.addTask.bind(this);
    this.completeProject = this.completeProject.bind(this);
    this.archiveProject = this.archiveProject.bind(this);
    this.restoreProject = this.restoreProject.bind(this);
    this.openCommentBox = this.openCommentBox.bind(this);
    this.handleScrollUpdate = this.handleScrollUpdate.bind(this);

    this.state = {
      updateProject: false,
      deleteProject: false,
      addTask: false,
      selectedProjects: [],
      projectSettings:{
        show: false
      },
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0
    }
  }
  componentWillMount(){
    if (!this.props.archived){
      this.props.getTaskList();
    }
  }

  handleScrollUpdate(values) {
    const { shadowTop, shadowBottom } = this.refs;
    const { scrollTop, scrollHeight, clientHeight } = values;
    const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    domCss(shadowTop, { opacity: shadowTopOpacity });
    domCss(shadowBottom, { opacity: shadowBottomOpacity });
  }

  changeDateFilter(task){
    let date = moment(task.date);
    return (date.isBetween(this.props.dateFrom,this.props.dateTo,'days', '[]'));
  }

  editProject(e){
    document.removeEventListener('click', this.handleDocumentClick, false);
    e.stopPropagation();
    this.setState({
      ...this.state,
      updateProject: true,
      deleteProject: false,
      error: false,
      projectSettings:{
        ...this.state.projectSettings,
        show: false
      }
    })
  }

  showHideDeleteModal(e){
    document.removeEventListener('click', this.handleDocumentClick, false);
    if (e){
      e.stopPropagation();
    }
    this.setState({
      ...this.state,
      updateProject: false,
      deleteProject: !this.state.deleteProject,
      projectSettings:{
        ...this.state.projectSettings,
        show: false
      }
    })
  }

  deleteProject(){
    this.props.deleteProject(this.state.projectSettings.project.id);     //sending request to the api
    this.setState({
      ...this.state,
      deleteProject: false
    })
  }

  selectProject(id){
    if (this.state.selectedProjects.indexOf(id) < 0){   //if the project was selected before, then replace with null else add the id
      this.setState({
        ...this.state,
        selectedProjects: [
          ...this.state.selectedProjects,
          id
        ]
      });
    }
    else{
      this.setState({
        ...this.state,
        selectedProjects: [
          ...this.state.selectedProjects.filter( (project) => project != id )
        ]
      });
    }
  }

  showProjectSettings( project, e){
    e.stopPropagation();

    let selectedProjects = this.state.selectedProjects;

    if (this.state.selectedProjects.indexOf(project.id) < 0){
      selectedProjects.push(project.id);
    }
    this.setState({
      ...this.state,
      projectSettings: {
        show: true,
        project: project
      },
      selectedProjects: selectedProjects
    });
    document.addEventListener('click', this.handleDocumentClick, false);
  }

  hideProjectSettings(){
    this.setState({
      ...this.state,
      projectSettings: {
        show: false,
        project: {}
      },
      updateProject: false,
      deleteProject: false
    });
    document.removeEventListener('click', this.handleDocumentClick, false);
  }

  handleDocumentClick(e) {      //if the user clicked somewhere need to close the dropdown
    if (this.refs['settings'] && !reactDom.findDOMNode(this.refs['settings']).contains(e.target)) {
      this.hideProjectSettings();
    }
  }

  addTask(e){
    if (e){
      e.stopPropagation();
    }
    document.removeEventListener('click', this.handleDocumentClick, false);
    this.setState({
      ...this.state,
      addTask: !this.state.addTask
    })
  }

  completeProject(project,e){   //sending request for updating the complete attribute of the project
    e.stopPropagation();
    let updatedProject = Object.assign({}, project, {status: "completed"});
    this.props.updateProject(updatedProject);
    this.setState({
      ...this.state,
      style: {
        'opacity': '0',
        'transition': 'opacity 0.2s linear'
      }
    })
  }

  archiveProject(project,e){   //sending request for updating the archive attribute of the project
    e.stopPropagation();
    let updatedProject = Object.assign({}, project, {status: "archived"});
    this.props.updateProject(updatedProject);
    this.setState({
      ...this.state,
      style: {
        'opacity': '0',
        'transition': 'opacity 0.2s linear'
      }
    })
  }

  openCommentBox(project, e){
    if (e){
      e.stopPropagation();
    }
    console.log(project)
    if (project.UserProjects[0].newComment){
      this.props.clearNewComment({project: this.props.project});
    }
    this.props.selectProject(project.id);
  }

  restoreProject(project,e){   //sending request for updating the archived attribute of the task
    e.stopPropagation();
    let updatedProject = Object.assign({},project,{status: "pending", date: moment()});
    this.props.updateProject(updatedProject);
    this.setState({
      ...this.state,
      style: {
        'opacity': '0',
        'transition': 'opacity 0.2s linear'
      }
    })
  }

  renderCircleBeforeName(project){      //icon to show if the task is completed or uncompleted
    if (project.status == "completed" || project.status == "archived")  {
      return (
        <div className={css.restoreProject} onClick={this.restoreProject.bind(this,project)}>
          <i className="fa fa-check" aria-hidden="true"/>
        </div>
      )
    }
    else{
      return (
        <div className={css.finishProject} onClick={this.completeProject.bind(this,project)}>
          <i className="fa fa-check" aria-hidden="true"/>
        </div>
      )
    }
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

  renderDeleteModal(){
    let content = this.props.content.page.project.delete;
    if (this.state.deleteProject){
      return (
        <Modal show={this.state.deleteProject} dialogClassName={css.deleteModal} onHide={this.showHideDeleteModal}>
          <div className={css.container}>
            <i className={`fa fa-close ${css.close}`} onClick={this.showHideDeleteModal} />
            <h1>{this.state.projectSettings.project.name}</h1>
            <p> {content.question}</p>
            <p className={css.warning}>
              {content.warning}</p>
            <Button type="button" onClick={this.deleteProject} text={content.delete} style={css.confirm}/>
            <Button type="button" onClick={this.showHideDeleteModal} text={content.cancel} style={css.cancel}/>
          </div>
        </Modal>
      )
    }
  }

  renderProject(project){     //if the project was selected showing the tasks else only the header
    let tasks = []
    if (this.props.archived){
      tasks = this.props.task.list.filter((task) => task.ProjectId == project.id && (task.status=="completed" || task.status=="archived"));

      if (tasks.length == 0 && project.status!="completed" && project.status!="archived"){
        return null;
      }
    }
    else{
      tasks = this.props.task.list.filter((task) => task.ProjectId == project.id && task.status == "pending");
      if (project.status=="completed" || project.status=="archived"){
        return null;
      }
    }

    let commentStyle = !project.UserProject? null : project.UserProjects[0].newComment ? {color: "#d90000"} : null
    if (this.state.selectedProjects.indexOf(project.id) < 0 && this.props.project.selected != project){
      return (
        <div key={project.id} onClick={this.selectProject.bind(this,project.id)} className={css.project}>
          <h3>
            {this.renderCircleBeforeName(project)}
            {project.name}
            <span> ({tasks.length}) </span>
            <i className={css.commentIcon + " fa fa-commenting"} style={commentStyle} onClick={this.openCommentBox.bind(this, project)}/>
            <ProjectShare project={project} />    {/* share modal */}
            <i className={css.projectSettings + " fa fa-cog"} onClick={this.showProjectSettings.bind(this,project)} aria-hidden="true"/>
          </h3>
          {this.renderProjectSettings(project)}
        </div>
      )
    }
    else{
      return (
        <div key={project.id} onClick={this.selectProject.bind(this,project.id)} className={css.project +" "+css.activeProject}>
          <h3>
            {this.renderCircleBeforeName(project)}
            {project.name}
            <span> ({tasks.length})</span>
            <i className={css.commentIcon + " fa fa-commenting"} style={commentStyle} onClick={this.openCommentBox.bind(this, project)}/>
            <ProjectShare project={project} />    {/* share modal */}
            <i className={css.projectSettings + " fa fa-cog"} onClick={this.showProjectSettings.bind(this,project)} aria-hidden="true"/>
          </h3>
          {this.renderProjectSettings(project)}
          <div className={css.tasks}>
            {
              tasks.map( (task) =>
                this.renderTask(task)
              )
            }
          </div>
        </div>
      )
    }
  }

  renderProjectSettings(project){           //a dropdown with edit and delete buttons
    let content = this.props.content.page.project;
    if (this.state.projectSettings.show && this.state.projectSettings.project == project ){
      return(
        <div className={css.projectOptions} ref="settings">
          <i className={css.caretUp + " fa fa-caret-up"} aria-hidden="true"/>
          <p className={css.option + " " + css.addTask} onClick={this.addTask}>{this.props.content.page.tasks.addTask.addTask}<i className="fa fa-plus"/></p>
          <p className={css.option} onClick={this.editProject}>{content.editProject}<i className="fa fa-pencil"/></p>
          <p className={css.option + " " + css.delete} onClick={this.showHideDeleteModal}>{content.deleteProject}<i className="fa fa-trash"/></p>
        </div>
      )
    }
  }

  renderEditProject(){
    if (this.state.updateProject){
      return (
        <AddProject content={this.props.content.page.project}
                    buttonText={this.props.content.page.project.editProject}
                    sendButtonText={this.props.content.page.project.updateProject}
                    update={true}
                    project={this.state.projectSettings.project}
                    onHide={this.props.hideProjectSettings}
                    sendProject={this.props.sendProject}/>
      );
    }
  }

  renderAddTask(){
    if (this.state.addTask){      //if the user want to add a new task to this project
      return (
        <AddTask
          buttonText={this.props.content.page.tasks.addTask.addTask}
          buttonStyle={css.addTask}
          sendButtonText={this.props.content.page.tasks.addTask.name}
          showModal={true}
          projectId={this.state.projectSettings.project.id}
          onHide={this.addTask}/>
      )
    }
  }

  renderList(){
    let projects = this.props.project.list;
    return (
      <div className={css.projects}>
        {this.props.project.pending&&this.props.project.list.length==0? <Spinner/> : null}

        <Scrollbars ref="scrollbars"
                    onUpdate={this.handleScrollUpdate}
                    style={{ width: '100%', height: '100%' }}>
        {
          projects.map( (project) =>
            this.renderProject(project)
          )
        }
        </Scrollbars>

        <div
          ref="shadowTop"
          className={css.shadowTopStyle}/>
        <div
          ref="shadowBottom"
          className={css.shadowBottomStyle}/>
      </div>
    )
  }

  render() {

    if (this.props.archived){   //if the projectList was called from archive
      return this.renderList();

    }

    let content = this.props.content.page.project;
    return(
      <div className={css.base}>
        <div className={css.projectTitle}>
          <h1 className={css.title}>{content.title}</h1>
          <AddProject
            content={content}
            buttonText={content.addProject}
            buttonStyle={css.addTask}
            sendButtonText={content.createProject}
            update={false}
            iconStyle={css.addIcon}
            sendProject={this.props.sendProject}
            deleteProject={this.props.deleteProject}/>
        </div>

        {this.renderDeleteModal()}      {/*modal for delete*/}
        {this.renderEditProject()}      {/*modal for update*/}
        {this.renderAddTask()}      {/*modal for adding a new task*/}
        {this.renderList()}


      </div>
    );
  }
}

export default ProjectList
