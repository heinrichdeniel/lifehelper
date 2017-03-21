import React, { Component } from 'react';
import css from './style.scss';
import moment from 'moment';
import Button from 'components/Button';
import Modal from 'react-bootstrap/lib/Modal'
import TaskItem from 'modules/Tasks/components/TaskList/TaskItem'
import AddProject from './AddProject'
import reactDom from 'react-dom';

class ProjectList extends Component {
  constructor(props){
    super(props);

    this.applyDateFilter = this.applyDateFilter.bind(this);
    this.renderProject = this.renderProject.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.showProjectSettings = this.showProjectSettings.bind(this);
    this.hideProjectSettings = this.hideProjectSettings.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.editProject = this.editProject.bind(this);
    this.showHideDeleteModal = this.showHideDeleteModal.bind(this);
    this.renderDeleteModal = this.renderDeleteModal.bind(this);
    this.deleteProject = this.deleteProject.bind(this);

    this.state = {
      updateProject: false,
      deleteProject: false,
      selectedProjects: [],
      projectSettings:{
        show: false
      }
    }
  }
  componentWillMount(){
    this.props.getTaskList();
  }

  applyDateFilter(task){
    let date = moment(task.date);
    return (date.isBetween(this.props.dateFrom,this.props.dateTo,'days', '[]'));
  }

  editProject(e){
    e.stopPropagation();
    this.setState({
      ...this.state,
      updateProject: true,
      deleteProject: false,
      error: false
    })
  }

  showHideDeleteModal(e){
    if (e){
      e.stopPropagation();
    }
    this.setState({
      ...this.state,
      updateProject: false,
      deleteProject: !this.state.deleteProject
    })
  }

  deleteProject(){
    this.props.deleteProject(this.state.projectSettings.project.id);     //sending request to the api
    this.setState({
      ...this.state,
      deleteProject: false
    })
  }

  renderTask(task){
    if (task && !task.deleted){         //if the task was not deleted
      return <TaskItem key={task.id} task={task} dateFormat={this.props.user.dateFormat} timeFormat={this.props.user.timeFormat}/>
    }
    return  null;
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
    this.setState({
      ...this.state,
      projectSettings: {
        show: true,
        project: project
      }
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

  handleDocumentClick() {      //if the user clicked somewhere need to close the dropdown
    if (!reactDom.findDOMNode(this.refs['settings']).contains(event.target)) {
      this.hideProjectSettings();
    }
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
            <p className={css.warning}> <i className="fa fa-exclamation" aria-hidden="true"/>
              {content.warning}</p>
            <Button type="button" onClick={this.deleteProject} text={content.delete} style={css.confirm}/>
            <Button type="button" onClick={this.showHideDeleteModal} text={content.cancel} style={css.cancel}/>
          </div>
        </Modal>
      )
    }
  }

  renderProject(project){     //if the project was selected showing the tasks else only the header
    let tasks = this.props.task.list.filter((task) => task.ProjectId == project.id && !task.deleted);
    if (this.state.selectedProjects.indexOf(project.id) < 0 ){
      return (
        <div key={project.id} onClick={this.selectProject.bind(this,project.id)} className={css.project}>
          <h3>
            {project.name}
            <span> ({tasks.length}) </span>
            <i className="fa fa-arrow-down" aria-hidden="true"/>
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
            {project.name}
            <span> ({tasks.length})</span>
            <i className="fa fa-arrow-up" aria-hidden="true"/>
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
                    sendProject={this.props.sendProject}
                    deleteProject={this.props.deleteProject}/>
      );
    }
  }

  render() {
    //let tasks = this.props.task.list.filter(this.applyDateFilter);
    let projects = this.props.project.list;
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
        <div className={css.projects}>
          {
            projects.map( (project) =>
              this.renderProject(project)
            )
          }
        </div>
      </div>
    );
  }
}

export default ProjectList
