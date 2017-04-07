import React, { Component } from 'react';
import css from './style.scss';
import moment from 'moment';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import Modal from 'react-bootstrap/lib/Modal'
import TaskItem from 'modules/Tasks/components/TaskList/TaskItem'
import AddProject from './AddProject'
import AddTask from 'modules/Tasks/containers/AddTaskContainer'
import reactDom from 'react-dom';

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
    this.deleteProject = this.deleteProject.bind(this);
    this.addTask = this.addTask.bind(this);

    this.state = {
      updateProject: false,
      deleteProject: false,
      addTask: false,
      selectedProjects: [],
      projectSettings:{
        show: false
      }
    }
  }
  componentWillMount(){
    this.props.getTaskList();
  }

  changeDateFilter(task){
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
          users={this.props.user.list}
          getUsersByFilter={this.props.getUsersByFilter}
          shareTask={this.props.shareTask}/>
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
    let tasks = this.props.task.list.filter((task) => task.ProjectId == project.id && task.status == "pending");
    if (this.state.selectedProjects.indexOf(project.id) < 0 && this.props.project.selected != project){
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
                    sendProject={this.props.sendProject}
                    deleteProject={this.props.deleteProject}/>
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

  render() {
    //let tasks = this.props.task.list.filter(this.changeDateFilter);
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
        {this.renderAddTask()}      {/*modal for adding a new task*/}

        <div className={css.projects}>
          {
            projects.map( (project) =>
              this.renderProject(project)
            )
          }
        </div>
        {this.props.project.pending? <Spinner/> : null}

      </div>
    );
  }
}

export default ProjectList
