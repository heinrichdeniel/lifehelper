import React, { Component } from 'react';
import css from './style.scss';
import moment from 'moment';
import Button from 'components/Button';
import Modal from 'react-bootstrap/lib/Modal'
import TaskItem from 'modules/Tasks/components/TaskList/TaskItem'
import AddProject from './AddProject'

class ProjectList extends Component {
  constructor(props){
    super(props);

    this.applyDateFilter = this.applyDateFilter.bind(this);
    this.renderProject = this.renderProject.bind(this);
    this.renderTask = this.renderTask.bind(this);
   /* this.renderTitle = this.renderTitle.bind(this);
    this.editProject = this.editProject.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.changeModalState = this.changeModalState.bind(this);
    this.changeName = this.changeName.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.renderDeleteModal = this.renderDeleteModal.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
*/
    this.state = {
      updateProject: false,
      deleteProject: false,
      selectedProject: ""
    }
  }
  componentWillMount(){
    this.props.getTaskList();
  }

  /*
  componentWillReceiveProps(){
    this.setState({
      updateProject: false,
      deleteProject: false,
      error: false
    })
  }
*/
  applyDateFilter(task){
    let date = moment(task.date);
    return (date.isBetween(this.props.dateFrom,this.props.dateTo,'days', '[]'));
  }
  /*

  editProject(){
    this.setState({
      updateProject: true,
      deleteProject: false,
      project: this.props.project.selected,
      error: false
    })
  }

  closeEdit(){
    this.setState({
      updateProject: false,
      deleteProject: false,
      error: false
    })
  }

  changeModalState(){
    this.setState({
      updateProject: false,
      deleteProject: !this.state.deleteProject
    })
  }

  updateProject(){
    if (this.state.project.name.length < 3 || this.state.project.name.length > 15) {
      return this.setState({error: 'The name must contain at least 3, maximum 15 character!'})
    }
    this.props.createProject(this.state.project);     //sending request to the api
    this.setState({
      ...this.state,
      updateProject: false,
      error: false
    });
  }

  deleteProject(){
    this.props.deleteProject(this.props.project.selected.id);     //sending request to the api
    this.setState({
      ...this.state,
      deleteProject: false
    })
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
          buttonText=" Add task"
          buttonStyle={css.addTask}
          sendButtonText={content.tasks.addTask.name}
          update={false}
          iconStyle={css.addIcon}>
        </AddTask>
      </div>
    );
     else if (!this.state.updateProject){           //if a project was selected then an input will be displayed to be able for modifying
     return (
     <div className={css.projectTitle}>
     <h1>{selectedProject.name}</h1>
     <div className={css.buttons}>
     <i onClick={this.editProject} data-tip={content.project.editProject} className="fa fa-pencil" aria-hidden="true"/>
     <i onClick={this.changeModalState} data-tip={content.project.deleteProject} className="fa fa-trash" aria-hidden="true"/>
     </div>
     <ReactTooltip />

     </div>
     )
     }
     else{                 //if the user want to update the project
     return (
     <div className={css.projectTitle}>
     <Input type="text" placeholder={content.project.name} style={css.input} value={this.state.project.name} onChange={this.changeName} minLength={3} maxLength={15} />
     {this.state.error ? <ErrorBox error={this.state.error}/> : null}
     <Button type="button" onClick={this.updateProject} text={content.project.updateProject} style={css.update}/>
     <Button type="button" onClick={this.closeEdit} text={content.project.cancel} style={css.cancel}/>
     </div>
     )
     }

  }
*/
  renderTask(task){
    console.log(task)
    let selectedProject = this.state.selectedProject;
    if (task && !task.deleted){         //if the task was not deleted
      if (selectedProject == task.ProjectId){ //if a project filter was selected then the task project must be the same
        return <TaskItem key={task.id} task={task} dateFormat={this.props.user.dateFormat} timeFormat={this.props.user.timeFormat}/>
      }
    }
    return  null;
  }
/*
  renderDeleteModal(){
    let content = this.props.content.page.project.delete;
    if (this.state.deleteProject){
      return (
        <Modal show={this.state.deleteProject} dialogClassName={css.deleteModal} onHide={this.changeModalState}>
          <div className={css.container}>
            <i className={`fa fa-close ${css.close}`} onClick={this.changeModalState} />
            <h1>{this.props.project.selected.name}</h1>
            <p> {content.question}</p>
            <p className={css.warning}> <i className="fa fa-exclamation" aria-hidden="true"/>
              {content.warning}</p>
            <Button type="button" onClick={this.deleteProject} text={content.delete} style={css.confirm}/>
            <Button type="button" onClick={this.changeModalState} text={content.cancel} style={css.cancel}/>
          </div>
        </Modal>
      )
    }
  }*/

  selectProject(id){
    let selectedProject = (this.state.selectedProject != id) ? id : null;
    this.setState({
      ...this.state,
      selectedProject: selectedProject
    });
  }

  renderProject(project){
    if (this.state.selectedProject != project.id){     //if the project was not selected
      return (
        <div key={project.id} onClick={this.selectProject.bind(this,project.id)} className={css.project}>
          <h3>{project.name}<i className="fa fa-arrow-down" aria-hidden="true"/></h3>
        </div>
      )
    }
    else{
      let tasks = this.props.task.list.filter((task) => task.ProjectId == project.id);
      return (
        <div key={project.id} onClick={this.selectProject.bind(this,project.id)} className={css.project +" "+css.activeProject}>
          <h3>{project.name}<i className="fa fa-arrow-up" aria-hidden="true"/></h3>
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

  render() {
    //let tasks = this.props.task.list.filter(this.applyDateFilter);
    let projects = this.props.project.list;
    let content = this.props.content.page.project;
    return(
      <div className={css.base}>
        {/*this.renderDeleteModal()*/}
        <div className={css.projectTitle}>
          <h1 className={css.title}>{content.title}</h1>
          <AddProject
            content={content}
            buttonText={content.addProject}
            buttonStyle={css.addTask}
            sendButtonText={content.createProject}
            update={false}
            iconStyle={css.addIcon}>
          </AddProject>
        </div>
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
